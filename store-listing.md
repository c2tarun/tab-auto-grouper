# Chrome Web Store listing

Copy-paste values for the Developer Dashboard. Upload: `scripts/package.sh` → `tab-auto-grouper-<version>.zip`.

## Store listing tab

**Description**

```
Keep your tabs organized without thinking about it.

Tab Auto Grouper puts every link you open in a new tab into a group with the tab it came from. Groups are named after the source site (for example "github.com"), so research sessions, docs rabbit holes, and shopping comparisons stay together automatically.

How it works
• Open a link in a new tab → it joins a group with the tab that opened it.
• If the source tab is already in a group, the new tab joins that group.
• New blank tabs, pinned tabs, and tabs opened in another window are left alone.
• When a group the extension created shrinks to a single tab, the group is removed. Groups you create yourself are never touched.

Privacy
• No data collection, no analytics, no network requests.
• Everything runs locally in your browser.

No setup, no popup, no settings. Install it and keep browsing.
```

**Category:** Productivity → Tools (or Workflow & Planning)
**Language:** English

**Graphics**
- Store icon: `icons/128.png`
- Screenshot (required, 1280×800 or 640×400): a browser window showing tab groups named by site
- Small promo tile (440×280): icon + "Tab Auto Grouper"

## Privacy tab

**Single purpose**

```
Automatically groups a newly opened tab with the tab that opened it.
```

**Permission justifications**

| Permission  | Justification |
| ----------- | ------------- |
| `tabs`      | Reads the opener tab ID and URL of newly created tabs to decide which group they belong to and to name the group after the source site. Non-web pages (chrome://, about:) are skipped. |
| `tabGroups` | Creates, names, and removes tab groups for tabs opened from another tab. |
| `storage`   | Uses chrome.storage.session to remember which groups the extension created, so it only removes its own groups and never touches groups the user made. Nothing is persisted to disk or synced. |

**Remote code:** No, I am not using remote code.

**Data usage:** tick none of the data types. Tick all three certifications:
- I do not sell or transfer user data to third parties, outside of the approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

**Privacy policy URL:** not required (no user data collected).

## Distribution tab

- Payments: Free
- Visibility: Public
- Regions: All regions
