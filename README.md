# Tab Auto Grouper

A Chromium extension that automatically groups tabs by where they were opened from, inspired by the Dia browser.

## Behavior

- Opening a link in a new tab groups it with the tab it came from. The group is named after the source site (e.g. `github.com`).
- If the source tab is already in a group, the new tab joins that group.
- New tabs (Cmd/Ctrl+T), pinned tabs, and tabs opened into another window are left alone.
- When a group created by the extension drops to a single tab, the group is removed. Groups you create yourself are never touched.

## Install

Works in Chrome and Chromium-based browsers (e.g. Helium, Brave, Edge).

1. Clone this repo.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the repo folder.

After editing the code, click the reload icon on the extension's card.

## Permissions

| Permission  | Why                                                        |
| ----------- | ---------------------------------------------------------- |
| `tabs`      | Read tab URLs to name groups and skip non-web pages        |
| `tabGroups` | Create and rename tab groups                               |
| `storage`   | Remember which groups the extension created (session only) |

## Known limitations

- Links that open as `about:blank` before navigating are not grouped.
- After a browser restart, restored groups are no longer recognized as extension-created, so they won't auto-dissolve.
