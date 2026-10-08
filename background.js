const NO_GROUP = chrome.tabGroups.TAB_GROUP_ID_NONE;
const MANAGED_KEY = "managedGroupIds";

// Serialize all work so bursts of tab events never race on groups or storage.
let queue = Promise.resolve();
function enqueue(task) {
  queue = queue.then(task).catch(console.error);
}

chrome.tabs.onCreated.addListener((tab) => enqueue(() => groupWithOpener(tab.id)));
chrome.tabs.onRemoved.addListener((_tabId, { isWindowClosing }) => {
  if (!isWindowClosing) enqueue(dissolveSingleTabGroups);
});
chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if ("groupId" in changeInfo) enqueue(dissolveSingleTabGroups);
});
chrome.tabs.onDetached.addListener(() => enqueue(dissolveSingleTabGroups));

async function groupWithOpener(tabId) {
  const tab = await getTab(tabId);
  if (!tab || tab.openerTabId === undefined || tab.pinned) return;
  if (tab.groupId !== NO_GROUP || !isWebPage(tab)) return;

  const opener = await getTab(tab.openerTabId);
  if (!opener || opener.pinned || opener.windowId !== tab.windowId) return;

  if (opener.groupId !== NO_GROUP) {
    await chrome.tabs.group({ groupId: opener.groupId, tabIds: tab.id });
    return;
  }

  const groupId = await chrome.tabs.group({ tabIds: [opener.id, tab.id] });
  await chrome.tabGroups.update(groupId, { title: groupTitle(opener) });
  await setManagedGroupIds([...(await getManagedGroupIds()), groupId]);
}

// Also forgets managed groups that no longer exist (zero tabs).
async function dissolveSingleTabGroups() {
  const stillManaged = [];
  for (const groupId of await getManagedGroupIds()) {
    const tabs = await chrome.tabs.query({ groupId });
    if (tabs.length > 1) {
      stillManaged.push(groupId);
    } else if (tabs.length === 1) {
      // Ungrouping fails while the user drags a tab; keep the group so a later event retries.
      await chrome.tabs.ungroup(tabs[0].id).catch(() => stillManaged.push(groupId));
    }
  }
  await setManagedGroupIds(stillManaged);
}

// Session storage survives service-worker restarts; group IDs don't survive browser restarts anyway.
async function getManagedGroupIds() {
  const { [MANAGED_KEY]: ids = [] } = await chrome.storage.session.get(MANAGED_KEY);
  return ids;
}

function setManagedGroupIds(ids) {
  return chrome.storage.session.set({ [MANAGED_KEY]: ids });
}

function getTab(tabId) {
  return chrome.tabs.get(tabId).catch(() => null);
}

// Cmd+T sets openerTabId to the active tab, so skip browser pages like the new tab page.
function isWebPage(tab) {
  return /^(https?|file):/.test(tab.pendingUrl || tab.url || "");
}

function groupTitle(tab) {
  try {
    return new URL(tab.url || tab.pendingUrl).hostname.replace(/^www\./, "");
  } catch {
    return tab.title ?? "";
  }
}
