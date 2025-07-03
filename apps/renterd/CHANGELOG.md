# renterd

## 0.82.2

### Patch Changes

- e643f787: Fixed an issue where features were using the v1 host netAddress field for v2 hosts, which causes some features to be disabled or not work as expected.

## 0.82.1

### Patch Changes

- 201b9a38: Fixed an issue where toast notifications would appear behind dialogs.

## 0.82.0

### Minor Changes

- 3571359f: Added support for the contract refresh event type. Closes https://github.com/SiaFoundation/hostd/issues/759

### Patch Changes

- 16b6692a: Updated the app manifest file name to match spec.
- f477cfe1: Fixed an issue where contract timelines would start from 0 when the dataset included a rejected contract. Closes https://github.com/SiaFoundation/hostd/issues/717
- 16b6692a: Fixed an issue where the app manifest would sometimes 401 when behind a proxy.

## 0.81.0

### Minor Changes

- 676df05e: Upload statuses now more clearly show when data is being uploaded to the daemon or from the daemon to the network.
- 63912200: The app is now more stable and responsive when uploading files especially on localhost or http/1.1 and Firefox-based browsers.
- 70256e68: The transfers bar now lists all buckets with active uploads.
- 70256e68: The transfers bar now shows the total count across all buckets.

### Patch Changes

- 8a66ed2f: Fixed an issue where files uploaded without a containing directory in Chrome would be uploaded inside a directory named "./".
- 676df05e: The max number of active uploads has been corrected to include both upload states.
- 70256e68: Fixed an issue where the transfers bar active uploads button did not always work.

## 0.80.0

### Minor Changes

- 98595836: The logo icons have been updated.

### Patch Changes

- 64fdb993: Fixed an issue where long alert messages overflow. Fixes https://github.com/SiaFoundation/hostd/issues/725

## 0.79.0

### Minor Changes

- e32e617f: The host explorer now has a version column.
- e32e617f: The host explorer now has columns for v2 settings.
- e32e617f: The host explorer address column now gets populates v2 host addresses.

## 0.78.0

### Minor Changes

- 96a58672: The siascan setting toggle was removed from the cmd+k menu.
- 96a58672: Averages prices in the configuration page are based off v2 settings once the current network passes the allow height.
- 9e603732: File download behaviour is now consistent across all browsers.
- 96a58672: Host geolocation data is now provided by the configured explorer.
- 96a58672: Privacy and security settings quick nav actions were added to the cmd+k menu.
- 96a58672: Averages prices in the configuration page are now provided by the configured explorer.

## 0.77.1

### Patch Changes

- cad48e35: Fixed an issue where a v2ContractResolution event in the wallet would crash the app. Closes https://github.com/SiaFoundation/hostd/issues/629

## 0.77.0

### Minor Changes

- 54a4eabe: Displayed entity values which are often truncated can now be copied to clipboard by double-clicking directly on the visible characters.
- 54a4eabe: Wallet addresses can now be copied to clipboard by clicking on the QR code in the address dialog.

## 0.76.0

### Minor Changes

- a7c3dae9: The default files sort direction is now asc instead of desc.

### Patch Changes

- a7c3dae9: Fixed an issue where files were being sorted by name rather than full path in all files mode.

## 0.75.0

### Minor Changes

- 57ac6255: The total number of files no longer includes uploads in progress.

### Patch Changes

- b3dfd43a: Fixed an issue where sorting was not applied when in "all files" mode.

## 0.74.0

### Minor Changes

- 55524cb3: The application no longer lags when uploading thousands of files.
- 2fb3ae63: The transfers bar no longer includes a download list.
- 2fb3ae63: Files are now downloaded directly in the browser with cookie based auth.
- e3874095: The uploads list now has two views, one for local uploads only and one for all uploads including from other devices.

### Patch Changes

- d8588a19: Fixed an issue where the global files view was not showing full file paths.

## 0.73.0

### Minor Changes

- 7f6c64a9: Alerts with large errors are now collapsed by default and have a control to expand and collapse the full contents.

### Patch Changes

- 56630e16: The copyable file download URLs in the file context menu have been updated to match the new API.
- e1a49ed0: Fixed an issue with the contract churn alert's overall churn percentage.

## 0.72.0

### Minor Changes

- a5a5d09a: The contracts explorer no longer supports filtering by host IP.
- a5a5d09a: The blocklist dialog no longer shows how many active contacts match a suggestion.
- a5a5d09a: The contracts explorer no longer includes a column for host IP.
- b7e5ea12: Data tables now show an empty state when viewing a page greater than the first page with no data.
- a5a5d09a: The contracts multi-select menu no longer supports bulk blocklist actions.

### Patch Changes

- b7e5ea12: Fixed a bug where the transaction list would show pending transactions when viewing pages other than the first page.
- b7e5ea12: Fixed a bug where pagination did now work on the file uploads list.
- b7e5ea12: Fixed a bug where pagination did not work on the file explorer.

## 0.71.0

### Minor Changes

- 5b09ae3a: The host and contracts multi-select menus both now include an option to rescan the selected hosts.

### Patch Changes

- 31f3e4dc: Fixed an issue where selecting the entire page of files would select the parent navigation row.
- c7ac7678: Fixed an issue with the copy file metadata action in the file context menu.

## 0.70.0

### Minor Changes

- b04c20e4: The min account expiry and min price table validity configuration settings are now stored in milliseconds.

### Patch Changes

- 8c47e175: Contracts that have not been renewed from another contract no longer show the empty contract ID in the contract ID table cell.
- 95f51d34: Fixed an issue where the first attempt to download a file would show a bucket not found error.

## 0.69.0

### Minor Changes

- c909ad28: Multi-select now supports single select, toggle select, and range selection interactions, with click, ctrl-click, and shift-click.

## 0.68.0

### Minor Changes

- afc1830a: Removed the allow redundant IPs setting.
- 852ba06f: The contract graphs are now explicitly toggled open with the action button in the navbar.
- b8dd101b: Remove contract sets and autopilot set indicator from the contracts list.
- 9d8b9d74: Files and directories can now be selected and moved in bulk to a destination folder via drag and drop or the multi-select actions menu. This works even when selecting files (and entire directories) from across multiple different origin directories.
- 6737374b: Uploading files is no longer disabled if the user has not configured their settings.
- 6737374b: The configuration page navbar now has a switch for enabling or disabling autopilot.
- b8dd101b: Remove the autopilot contract set contracts count metrics graph.
- 6c9adb00: The slab migration failure alert was updated to match the new data format.
- cd4789d7: The contract total cost value is now called initial renter funds.
- 6737374b: The configuration no longer fills Sia Central network averages for max prices during first time configuration.
- 852ba06f: The contracts table now supports multi-select.
- c3778e08: The hosts multi-select menu now supports bulk adding and removing to both the allowlist and blocklists.
- b8dd101b: Remove the autopilot contract set from configuration.
- c3778e08: - The hosts table now supports multi-select.
- e41da146: The contracts graphs no longer include a count metric.
- b8dd101b: Remove contract set contracts filters.
- 6c9adb00: The slab migration failure alert was updated to include a file health indicator.
- 6737374b: The file explorer warnings now include a warning for when autopilot is disabled, the warning relating to configuration status was removed.
- 4eba392b: The contracts multi-select menu now supports bulk deletion.
- 6c9adb00: The set change alert was replaced with a churn alert that features a similar breakdown of contract changes with details such as reason and size.
- 6737374b: The onboarding bar no longer shows depending on the status of configuration but the first step still suggests configuring settings and enabling autopilot.
- 0b9994c7: The contracts multi-select menu now supports bulk adding and removing to both the allowlist and blocklists.
- b8dd101b: Remove expiring (out of set) concept from the prunable data features.
- 5e7fedb9: The allowance fitting and price fitting features were removed.
- 5e7fedb9: The configuration page has a new spending estimate widget that includes an option to rebalance prices within the current estimate.
- c3778e08: The host map must now be explicitly toggled open with the action button in the navbar.
- 6737374b: If the autopilot is disabling a warning will appear on the bottom dock. The widget includes a switch for re-enabling the autopilot.
- 5078fc02: The gouging settings no longer include hostBlockHeightLeeway or migrationSurchargeMultiplier.
- b8dd101b: Remove contract set mismatch warnings.
- b8dd101b: Add usability column showing good for renewal or bad states to the contracts list.
- dfde6e1c: The app was refactored to assume there is a singular autopilot and its API always exists, even if it is disabled.
- b8dd101b: Remove the default contract set from configuration.
- b8dd101b: Remove the configuration feature for syncing the default contract set with changes to the autopilot set.
- 5e7fedb9: The allowance concept was removed.

## 0.67.0

### Minor Changes

- fe888991: Invalid and not found routes now redirect to the home page.

## 0.66.0

### Minor Changes

- 17b29cf3: Navigating into a directory in the file explorer is now by clicking on the directory name rather than anywhere on the row.
- 17b29cf3: The directory-based file explorer now supports multiselect across any files and directories.
- 6c7e3681: The key management table now supports multiselect and bulk deletion.
- 17b29cf3: The "all files" file explorer now supports multiselect across any files.
- 17b29cf3: The "all files" file explorer multiselect menu now supports bulk deletion of selected files.
- 6c7e3681: The onboarding wizard now animates in and out.
- ed264a0d: The transfers bar now animates in and out.
- 09142864: The keys table now has pagination controls.
- 17b29cf3: The directory-based file explorer multiselect menu now supports bulk deletion of selected files and directories.

### Patch Changes

- b68271a1: Fixed an issue where the app was sending invalid autopilot evaluation requests before all the required data was entered by the user.
- e9995c5d: The page layout is now persisted between page transitions.

## 0.65.0

### Minor Changes

- 9277382b: There is now an option to generate a metadata debug report for bug reporting purposes. It can be accessed from the sidenav and cmd+k menu. Closes https://github.com/SiaFoundation/renterd/issues/1119 Closes https://github.com/SiaFoundation/renterd/issues/1279
- 9277382b: The cmd+k menu / command palette dialog now announces itself via assistive technology.

### Patch Changes

- 1d1452d8: Fixed an issue where configured settings would show as blank when the Sia Central API (used for network averages) was down. Closes https://github.com/SiaFoundation/renterd/issues/1601
- 4cf6c8ea: Fixed an issue with the uploads list loading and empty states.
- 4cf6c8ea: Added explicit aria descriptions to some primary dialogs.

## 0.64.0

### Minor Changes

- 2a1d787d: Max RPC price and max contract price now show a suggestion instead of a network average.

### Patch Changes

- 2a1d787d: Fixed a bug where the network average prices would show as 0 in the configuration fields. Closes https://github.com/SiaFoundation/renterd/issues/1565

## 0.63.0

### Minor Changes

- 7a333ffd: The bucket list now has an empty state.
- 7a333ffd: The cmdk menu now has an two separate files search options, one for across all buckets and one for the current bucket.
- 7a333ffd: It is now possible to delete a bucket named 'default'.
- 7a333ffd: The file search feature can now search across all buckets.
- 7a333ffd: The command menu now opens via Ctrl+K on Linux and Windows.

## 0.62.0

### Minor Changes

- 64d82fc3: The transactions list now includes more details such as specific transaction types and maturity height for locked siacoin.
- 32363a16: The files directory and global mode explorers now use the new list objects API.
- 978b70aa: The hosts explorer now uses the new combined hosts API.
- ac703a94: The configuration feature now internally uses the new strong settings APIs.
- ac703a94: The configuration feature no longer includes the enable pinning or forex endpoint options under price pinning.
- ac703a94: Contracts can now be filtered and sorted by deletions and sector roots spending.
- ac703a94: The app now uses the daemon configured explorer for exchange rates.
- ac703a94: The keys feature now internally uses the new S3 settings API format.
- feca9f36: The configuration now internally uses the updated gouging base units.

### Patch Changes

- 978b70aa: Fixed a bug optimistically updating last scan information when initiating a host scan.
- 1c94a604: Fixed an issue where the fit allowance suggestions were showing as NaN because all required fields were not filled.

## 0.61.0

### Minor Changes

- 02c02fe7: The send siacoin feature now validates the entered address.
- 81d374f4: The send siacoin feature now calculates the fee using the daemon's recommended fee per byte and a standard transaction size.
- a7ff93e9: Min recent scan failures is now max consecutive scan failures. Relates to https://github.com/SiaFoundation/renterd/pull/1482
- 5f34c9a6: Migrated all exchange rate usage from Sia Central to Siascan.
- dd1b4036: The recommendations now say "no recommendations" instead of 0. Closes https://github.com/SiaFoundation/desktop/issues/90

## 0.60.1

### Patch Changes

- 9e6640a3: Fixed an issue where network averages shown on pinned field tips did not follow the currency display preference.

## 0.60.0

### Minor Changes

- 186e17a6: Max RPC price is no longer pinnable.
- 186e17a6: Fixed an issue where the UI would set extremely small pinned max price values because it set values in per byte instead of TB.

## 0.59.0

### Minor Changes

- 09871542: Fixed an issue where the pricepinning response was crashing the app. Closes https://github.com/SiaFoundation/renterd/issues/1448

## 0.58.0

### Minor Changes

- eabad8c5: The allowance configuration now includes "Set max prices to fit current allowance" and "Set allowance to fit current max prices" actions as well as a status indicating whether or not the current prices fit the current allowance.
- eabad8c5: The max RPC price field now shows a network average tip.
- eabad8c5: Allowance, max storage price, max upload price, max download price, and max RPC price fields now support price pinning. The user can choose to pin any or all of those values to a fiat currency value.
- eabad8c5: The allowance fitting features now work with pinned prices or a mix of pinned and unpinned prices.
- eabad8c5: The configuration system recommendations now support evaluating and setting pinned fields.
- eabad8c5: Each max pricing field that is factored into the allowance now has (when available) both a recommendation for matching with more hosts and an option to fit the current allowance. These are available in both non-pinned siacoin and pinned fiat modes.
- ce89b99a: Added support for the new network naming scheme and the anagami testnet.
- 4bb128df: The file explorer now shows new directories right away when uploading nested files.
- eabad8c5: All tips and recommendations are now displayed according to the app preferences currency setting.
- eabad8c5: The configuration has a new section for enabling pinning, selecting the currency, setting the exchange rate endpoint, and the threshold.

## 0.57.0

### Minor Changes

- 3fdf6655: The contracts table can now be sorted on prunable size.
- 3fdf6655: The file stats no longer show reclaimable space. Closes https://github.com/SiaFoundation/renterd/issues/1247
- 3fdf6655: The contracts table now allows the user to check the prunable and expiring data size for a specific contract, across all contracts, or a filtered set of contracts. Prunable means data that the autopilot sector pruning feature would prune, expiring means prunable data outside of autopilot contracts that will likely eventually expire. Closes https://github.com/SiaFoundation/renterd/issues/1247
- 3fdf6655: The contracts contract set column tags now more clearly show whether a set is the autopilot set, default set, or both.
- 3fdf6655: All contract table financial columns now show a sum total across filtered contracts in the summary row.

## 0.56.1

### Patch Changes

- 627355b7: Fixed an issue where scrollbars could not be grabbed by moving mouse to the edge of the screen. Closes https://github.com/SiaFoundation/hostd/issues/423 Fixed by https://github.com/kocoten1992

## 0.56.0

### Minor Changes

- 9b01557d: The configuration no longer offers an option to auto-calculate the allowance.
- 9b01557d: The configuration now has an option to automatically calculate prices from the user-specified allowance. The prices are calculated to spend around the allowance while keeping upload, download, and storage prices proportionally fixed while also allocating based on estimated usage in each category. The max prices also include headroom so that variations in contract prices average out while avoiding host churn. Closes https://github.com/SiaFoundation/renterd/issues/1303
- 9b01557d: The estimates in the stats bar are now based directly off the configured allowance.

## 0.55.0

### Minor Changes

- bdbc4d58: The slab migration failed alert now shows health and an object IDs list that includes the file context menu for each object. Closes https://github.com/SiaFoundation/renterd/issues/1322

## 0.54.1

### Patch Changes

- b13c3b51: Fixed an issue where renaming a file would throw an error.
- b13c3b51: Fixed an issue where the empty directory state was showing an empty bucket message.

## 0.54.0

### Minor Changes

- 5611d44a: Allowance now has a field-specific option to auto-calculate its value. Closes https://github.com/SiaFoundation/web/issues/628
- 5611d44a: The configuration page now has a view menu in the action bar that is consistent with all other feature pages.
- 5611d44a: Basic configuration mode no longer sets certain fields in the background. Closes https://github.com/SiaFoundation/web/issues/628

### Patch Changes

- 5611d44a: Fixed an issue where first-time configuration would not show the optimal recommendations.
- 5611d44a: Fixed a bug where the churn alert would display NaN for the percentage when the total size was zero.
- e7fd8107: Fixed an issue where selecting a bucket context menu option would also navigate into the bucket. Closes https://github.com/SiaFoundation/renterd/issues/1277
- 5611d44a: Fixed an issue where toggling between basic and advanced modes would sometimes not revalidate all configuration fields.
- 866641b4: Fixed an issue where the transaction information would not show in the dialog. Closes https://github.com/SiaFoundation/hostd/issues/402
- e7fd8107: Fixed an issue that broke some dialogs including the bucket policy and bucket delete dialogs. Closes https://github.com/SiaFoundation/renterd/issues/1277

## 0.53.0

### Minor Changes

- 0a0bab05: The host blocklist dialog now supports adding IPv6 addresses.
- 0a0bab05: The connect to peer dialog now supports IPv6 addresses. Closes https://github.com/SiaFoundation/web/issues/624

## 0.52.1

### Patch Changes

- c89d2e55: Fixed an issue where the recommendations bar was overlapping notifications.
- c89d2e55: Fixed an issue where clearing some configuration fields would crash the app due to how recommendations were being calculated.
- c89d2e55: The configuration recommendations now instruct the user to first fill all fields. Closes https://github.com/SiaFoundation/renterd/issues/1214

## 0.52.0

### Minor Changes

- 49ff7435: The configuration page now recommends specific changes to settings to match with more hosts. Closes https://github.com/SiaFoundation/renterd/issues/1137
- 49ff7435: Configuration settings that the user has not modified will be kept in sync with remote values that change. Closes https://github.com/SiaFoundation/hostd/issues/286

### Patch Changes

- 49ff7435: Fixed a bug where hovering over the max storage or upload price tooltips would crash the app.

## 0.51.2

### Patch Changes

- 703761a2: Fixed an issue where file health slab keys were showing up as repeated and incorrect. Closes https://github.com/SiaFoundation/web/issues/596

## 0.51.1

### Patch Changes

- 856b738a: Fixed an issue where the daemon would panic trying to read the embedded UI files on Windows. Closes https://github.com/SiaFoundation/web/issues/599

## 0.51.0

### Minor Changes

- 424636ad: The configuration now includes the min protocol version option, the value defaults to 1.6.0 when using simple configuration mode. Closes https://github.com/SiaFoundation/renterd/issues/1141 Closes https://github.com/SiaFoundation/web/issues/573

## 0.50.0

### Minor Changes

- 1f5d3436: Toast notifications can now be dismissed. Closes https://github.com/SiaFoundation/web/issues/542
- 1053c506: Account alerts now feature an accounts context menu with the option to reset account drift. Closes https://github.com/SiaFoundation/web/issues/524
- 1053c506: Context menus now all use a caret icon.
- 1053c506: The contract set change alert data fields are now displayed as one field that shows additions and removals for each contract in one timeline.
- afc6f047: The lost sector alert now shows the number of lost sectors. Closes https://github.com/SiaFoundation/renterd/issues/1080
- 3a1b3d4f: Removed the min max collateral configuration setting. Closes https://github.com/SiaFoundation/renterd/issues/1079
- 1053c506: Alert table row cell content is now aligned to the top of each row.

### Patch Changes

- 9fdea398: Fixed an issue where the max RPC price configuration would round decimal values to 0. Closes https://github.com/SiaFoundation/renterd/issues/1050
- 1053c506: Fixed an issue where the alerts list would trigger an excessive number of API calls to fetch contract and host metadata.
- 58a4d3e8: Fixed a typo in the alerts empty state. Closes https://github.com/SiaFoundation/web/issues/567
- c5e00b05: The configuration panel is now centered on larger screens. Closes https://github.com/SiaFoundation/web/issues/543

## 0.49.0

### Minor Changes

- 5477362e: Directory and global file explorers now show upload progress inline.
- 5477362e: Uploads now support aborting the entire visible page of active uploads.

### Patch Changes

- 5477362e: Fixed a slow memory leak that became especially apparent during long running large uploads, memory usage is now minimal and stable over time.

## 0.48.0

### Minor Changes

- 033b2f26: Uploads will now error and abort if responses are missing etags.

### Patch Changes

- ca00b44b: Fixed an issue navigating back to the active explorer mode from the uploads list.
- 72237e68: Fixed an issue where the alert data fields showed the wrong dates.
- 72237e68: Fixed an issue where the alert columns were not initially showing.

## 0.47.0

### Minor Changes

- 5994c4e0: File uploads now use multipart uploads. Closes https://github.com/SiaFoundation/renterd/issues/975
- d20d0637: The browser now warns the user if they have active uploads and try to close the tab.
- 805f32e0: All graphs now remember any chart configuration that the user has selected.
- 9deee11e: Buckets now have a third view for viewing all active uploads, both local and from other sessions.
- 5994c4e0: File uploads now have a max concurrency and get queued.
- dddc110a: Alerts now support pagination. Closes https://github.com/SiaFoundation/renterd/issues/1001 Closes https://github.com/SiaFoundation/renterd/issues/862
- 9deee11e: Remote file uploads can now be aborted from the uploads explorer. Closes https://github.com/SiaFoundation/web/issues/429
- 2d6a9c77: Storage and upload price settings no longer default to or have the option to include redundancy. The price with the configured redundancy is now always shown below.
- 9deee11e: The transfers bar now only lists downloads and shows two buttons with one navigating to the new uploads list.
- dddc110a: Alerts now support the accumulated churn alert. Closes https://github.com/SiaFoundation/renterd/issues/1005
- dddc110a: Alerts now have a dedicated tab with a larger area for display and navigation.

### Patch Changes

- 984ed75a: Fixed an issue where hovering over the file health information would crash the app. Closes https://github.com/SiaFoundation/renterd/issues/997

## 0.46.0

### Minor Changes

- 035f90e9: The host context menu now has an option to reset the lost sector count.
- c98f1941: The node profile details now include uptime.
- 1afac605: File explorer navigation actions now retain the active explorer mode.
- 4506593d: All app data will now refresh more frequently.
- 1afac605: The selected file explorer mode is now persisted between sessions.

### Patch Changes

- 1afac605: The file breadcrumb nav now shows the root as "Buckets".
- bbbe56a8: The contract timeline labels have been darkened to increase contrast and readability.
- 1afac605: The explorer mode switcher button is now disabled when viewing buckets. Closes https://github.com/SiaFoundation/renterd/issues/973

## 0.45.0

### Minor Changes

- 43029e2e: Uploading nested directories now preserves structure rather than flattening files into current directory.
- a4099d4b: Files can now be sorted by size. Closes https://github.com/SiaFoundation/renterd/issues/860
- e253b3e6: Files can now be moved by dragging into or out of directories. Closes https://github.com/SiaFoundation/renterd/issues/418
- 021568d1: The file explorer now has a global mode that shows a flat list of files from across all directories in a bucket.
- 021568d1: The file health indicator now show the percentage inline.
- e3a5929e: Files and directories can now be renamed via the context menu. Closes https://github.com/SiaFoundation/renterd/issues/418
- 021568d1: The file explorer global mode now allows you to sort across all files in a bucket.

## 0.44.0

### Minor Changes

- 55c5f9c9: The file stats now only show health once there is more than 0 bytes of file data.

## 0.43.0

### Minor Changes

- 891abb0e: S3 authentication keypairs can now be created and managed directly from the UI. Closes https://github.com/SiaFoundation/web/issues/430

## 0.42.0

### Minor Changes

- f5b44630: The total file count now includes in-progress uploads.
- 7635e79d: Fixed an issue displaying the contract sets column data on the contracts explorer.
- d2161c5e: The renterd file count stats tooltip description is now more accurate.
- fa1297bf: The configuration page now has menu options to download or copy an image of the current configuration for easier sharing.
- e470c163: Fixed an issue where siacoin and numeric input values would jump to an incorrect value.
- cc7b1500: Contracts can now be filtered by contract set.

## 0.41.0

### Minor Changes

- 0fc1c36c: Fixed an issue with the copy to clipboard feature.

## 0.40.0

### Minor Changes

- 2aff994b: Remove the wallet defrag threshold setting.

## 0.39.0

### Minor Changes

- 1a8caef5: The contracts table now has a contract sets column that shows all the sets each contract is in.
- e24c8935: The reported average redundancy factor now takes into account multipart uploads.

### Patch Changes

- e24c8935: esm support

## 0.37.0

### Minor Changes

- 0d805084: The wallet balance shown on the wallet page is now spendable plus unconfirmed.
- 00a3ce62: The contract funding and spending graph now shows a data point for brand new contracts.
- f2145a38: The default suggested pricing for new users is now based on Sia Central averages.
- 74553598: Fixed an issue where currency was displayed with too many decimals.

## 0.36.0

### Minor Changes

- 32b2efd4: The host gouging breakdown has been updated to the new versionless format.

## 0.35.0

### Minor Changes

- 55e1a99f: Fixed an issue with the host interaction values showing as 0s on the host explorer.
- 23f4fb47: Copyable entity values now have a context menu with support for opening Siascan pages.
- 49648b5d: The advanced configuration now includes a prune sector roots setting.
- 42dc75f9: Contracts now have a details view that shows a graph of the contract's daily funding and spending.
- a64a77a9: The host context menu now has options for copying public key or address to clipboard.
- 49648b5d: The wallet page now shows the balance evolution again, using the new wallet metrics API.
- a5c6618b: The contracts feature now includes a graph of aggregate funding and spending across all active contracts.
- a5c6618b: The contracts feature now includes a contract count graph for the autopilot contract set.
- a4d9df51: The onboarding wizard no longer shows on the login page.
- c32dcae5: Fixed an issue with the file health popover and updated it to display more accurate information.
- ef4fcabc: The redundancy tooltip now correctly describes the ratio as total shards / min shards.
- bfa6b96b: Fixed an issue where number fields would not properly handle user input starting with a decimal separator.
- 4eb48496: Fixed an issue with the prune sector roots setting validation.
- 64ca2b2b: The alerts dialog now has an "all" filter.

## 0.34.0

### Minor Changes

- 57339114: The file stats overall health now uses the min health reported by the object stats endpoint.
- 63aef996: Wallet transactions are now paginated.
- 56aece36: Files can now be sorted by name and health, ascending or descending.
- 40419ce8: File uploads are now disabled if the blockchain is not fully synced.
- eae7d2f7: File warnings are now a simple warning icon next to the stats and are explained in a popover.
- eae7d2f7: Selecting a file search result now navigates to the directory and applies a file name filter.
- eae7d2f7: The bucket empty state now has a button for navigating back to the buckets list.
- eae7d2f7: Files in the current directory can now be filtered.

### Patch Changes

- f57ac167: Fixed an issue where the filtered contract count was being used in the onboarding checks.

## 0.33.0

### Minor Changes

- 5958be26: The configuration now has zen-specific suggested/default values for number of contract hosts and shard values.
- 69a696ca: The bucket context menu now allows you to edit the bucket policy and toggle the read access between public and private.
- f0403c7e: The simple configuration mode now shows download and upload estimates and pricing.
- b72ef30f: Currency display can now be configured to siacoin, fiat, or both along with a preference for when only one can be displayed.
- d34b0a4f: Fixed an issue with file search where selecting a file would navigate to the path without the bucket.
- 1af82db8: The configuration now includes a setting for a migration surcharge multiplier which allows you to set a factor for increasing the max download price when trying to repair critically low health sectors.
- f0403c7e: The contract count shown in onboarding will update more quickly as it now includes pending contracts.
- f3e8cfe9: The contracts table now includes a column for state that shows: pending, active, complete, or failed.
- 141a7e44: The contract list now updates after a contract is deleted.

## 0.32.0

### Minor Changes

- e04a35c7: Wallet now instructs new users to fund their wallet when there are no transactions yet.
- c8ae5aeb: Hosts last scan column now properly displays unscanned values rather than a very large time ago value.
- 16b7df4c: The wallet balance tooltip now shows spendable confirmed and unconfirmed values.
- 6fc53f46: The maxDowntimeHours setting default value is now 336.
- 6fc53f46: Added support for the minRecentScanFailures autopilot hosts setting.
- 35ff2dec: Siacoin and number input placeholders now match the suggested value.
- 6fc53f46: Extremely small siacoin values will now show as hastings by default rather than 0SC.
- e04a35c7: Fixed an issue where the wallet balance graph would not show the first data point.
- db21136e: The autopilot loop is now triggered after settings are successfully updated.
- a2db3b21: Files are now paginated.
- 6fc53f46: Refined the warnings in the files feature navbar and file explorer empty states.
- 9a065e66: Onboarding fund wallet step now requires >0 SC instead of a full allowance.
- e04a35c7: Wallet balance evolution graph is now hidden until at least 1 data point is available.
- 4462f129: The hosts table now has a last announcement column instead of the known since column.

## 0.31.0

### Minor Changes

- 2a2ef002: Alerts are now more concise and show an actionable hint when available.
- 49d7b540: Fixed an issue where the allowance does not get set the first time saving settings in simple mode.

## 0.30.0

### Minor Changes

- 21972d75: Configuration values such as download and upload utilization are now per month instead of period.
- 21972d75: The configuration now has an advanced mode that allows the user to view and change all settings.
- 21972d75: The configuration is now much simpler by default, only requiring storage amount and price to be set during onboarding.
- e7387383: Fixed an issue with the upload packing switch and updated the explanation.
- 43f14e70: Fixed an issue where file and directory names could not contain the # symbol.
- 21972d75: The configuration page now shows the changed status on fields if the user has made a change but the server values were since updated.
- 21972d75: The default simple configuration automatically sets any unset advanced options to typical defaults. Settings with existing values are not changed.
- 829d91df: Fixed an issue where fiat input fields values were not displaying properly.
- c4aafc65: Data tables now refresh themselves without user interaction or refocusing the app, even more frequently if a long running operation is in progress.
- 21972d75: The autopilot settings have been merged into a single configuration page.
- 1b9e8f6d: Fixed an issue where URLs for file paths with periods would 404.
- fc3e1d46: Fixed an issue with the hosts public key filter.
- 21972d75: The spending estimates now show per TB and total per month.
- 21972d75: New users will now see an onboarding wizard that prompts the user to complete the necessary setup steps - it also shows the status and progress of each.

## 0.29.0

### Minor Changes

- ea22ca7c: Initiated an already active upload or download now shows an error.
- e3a3b65a: Alerts can now be filtered and dismissed by type.
- 569d94c3: The not enough active contracts warning no longer flickers.
- 569d94c3: The files feature now supports buckets.
- ea22ca7c: File uploads and downloads can now be canceled from the transfers bar.
- e3a3b65a: The alert dialog now has a fixed height, so it stays in the same position when an alert is dismissed.
- ea22ca7c: Fixed an issue with file transfer progress reporting.
- e3a3b65a: Fixed an issue with the alert dismiss button overflowing.

## 0.28.0

### Minor Changes

- 0da88700: Alerts now display a context menu for contract ID values.
- 45714e2d: The GPU setting now displays the correct device support text.
- 0da88700: Alerts can now be dismissed, all or one by one.

## 0.27.0

### Minor Changes

- bcc14852: File upload and directory creation are now disabled until enough contracts are formed.
- 8b69b770: The failed to migrate slab alert now lists the associated objects/files.
- c3d93283: The host explorer now has an interactive map. Filtered hosts can be selected via the list or map, and hosts on the map are colored based on whether renterd is actively contracting with the host. For hosts with active contracts the size of the hosts on the map is based on renterd's used storage, for hosts without active contracts the size is based on the hosts remaining storage.
- bcc14852: New users are now more clearly instructed to configure autopilot and to wait for enough contracts before files can be uploaded.
- 1ed477f0: Node profile information now includes the build version.
- 8da56663: The connectivity and login check no longer depends on consensus APIs which in some rare cases can be unresponsive.
- 73e7297e: Alerts now show contract additions and removals, formatted address, balance, and more.
- d0ebd8a6: Health percentage values are now clamped to a range of 0-100%.
- 0ba92814: File health tooltip now includes redundancy info and supports partial slabs.

## 0.26.0

### Minor Changes

- abdb8613: The host explorer now works before autopilot is configured, the table shows the autopilot columns with empty values and tooltips explaining that autopilot is not configured.
- b7d17609: Upload packing can now be enabled from the configuration tab.
- c899a07b: The file stats do not show redundancy factor or health until there is at least 1 byte of data.
- abdb8613: Fixed a crash issue when loading the hosts explorer.
- 6ce5f426: Wallet balance is now more accurately calculated as spendable + unconfirmed.

## 0.25.0

### Minor Changes

- ce199e51: All dropdown menus now have higher contrast text.
- 2242911d: The app now warns the user if it is running on the testnet with a prominent banner.
- ce199e51: Contracts can now be deleted from the contract context menu.
- 534d3944: The files health feature has been refined to be more accurate and clear and now includes a global health value in the stats bar.
- 8cd442b4: Host explorer empty states are now more clear.
- ce199e51: Hosts can now be filtered by public key.
- 16038776: Table headers now freeze in view when the table scrolls.
- ce199e51: The contract context menu now includes a variety of copy to clipboard options.
- 182de3af: Fixed an issue with automatically updating the default contract set when configuring autopilot before setting the default contract set.
- 534d3944: Entire directories can now be deleted from the directory context menu.
- 534d3944: The files explorer no longer makes a metadata request for every file in the list.
- d4144a2b: The transaction pool list has been removed.
- c62ae09c: Wallet now warns the user if the wallet is scanning and shows the percent progress.
- 534d3944: File health is now based on the new health values returned by the API.
- 2242911d: The contrast was improved on the syncing progress text in the daemon profile.
- ce199e51: renterd now has alerts. Alerts can be accessed from the new alerts icon in the sidenav.
- 4289306a: Improved the file data size statistic and the detailed breakdown in its tooltip.
- 4289306a: Fixed an issue where the file health and slab health breakdown was incorrectly reporting everything as 0.
- ce199e51: Context menus now show the entity type and identifier for clarity.

## 0.24.0

### Minor Changes

- e74d48cc: Currency options now include AUD.
- 7bd49b6d: Contract timeline now always shows contract duration dates, on user interaction the specific labels will activate.
- b33ecb82: Max storage and upload price settings now have an "including redundancy" option.
- e74d48cc: The Settings dialog is now called App preferences.
- e74d48cc: The default contract set description was updated to be more accurate - it does not apply to default migrations.
- e74d48cc: The app now includes an auto-lock feature that can be enabled or disabled from the App Preferences menu. The locking inactivity period can also be configured.
- 7bd49b6d: Contract timeline dates are now localized.
- 7bd49b6d: Paginators now properly show loading state when fetching a new page or previous results when revalidating a cached page.
- 7bd49b6d: Inactive sortable table columns now show a subtle caret to signify that they are sortable.

## 0.23.0

### Minor Changes

- be705b97: The files feature now prompts the user to configure the default contract set and autopilot before uploading.
- be705b97: The autopilot settings feature now has an option to automatically sync the default contract set with changes to the autopilot contract set - this is enabled by default.
- be705b97: The configuration settings now inlude a default contract set.
- aa50389b: The login screen now has an option to show the custom API field.
- be705b97: The files feature shows a warning if autopilot is enabled and the contract set does not match the default.
- aa50389b: The login screen timeout for an unresponsive daemon is now 10 seconds.

## 0.22.0

### Minor Changes

- 14554de8: Fixed an issue with the allowlist, removing public keys now works as expected.
- 00c43ed3: The wallet now sends the correct amount when fee is included in amount.

## 0.21.0

### Minor Changes

- dc23d8c0: The autopilot config no longer defaults, it now must be configured by the user.
- 234a40a8: The autopilot status endpoint has been removed.

## 0.20.0

### Minor Changes

- 40d856d6: The contracts table now includes a data size column.
- dfc1129c: Fixed an issue where opening the file search feature would crash the UI.

## 0.19.0

### Minor Changes

- 54b1b445: Wallet send flow now properly discards transaction if an error occurs during signing or broadcasting.
- 04c8cd01: Files stats now show a breakdown of file size with and without redundancy and also with repairs.
- 8c2a95da: The hosts explorer now supports filtering by usable and unusable.

## 0.18.0

### Minor Changes

- 06e7e1c5: Numbers are now displayed and entered in localized format.
- 000db6a6: Currency options now include CAD, AUS, RUB, and CNY.
- 06e7e1c5: Dates and times are now displayed in a localized format.
- 33cd3b54: The wallet now shows a balance evolution graph.
- 33cd3b54: The transaction details dialog title is now based on the specific type.

## 0.17.0

### Minor Changes

- 44d74f3: The copy authenticated URL toast is now properly formatted.

## 0.16.0

### Minor Changes

- 1a482f2: Contract timelines and other features based on block height now use estimated block height for current height until synced.
- 6d8bde8: The delete file confirmation now uses a red button.
- 1a482f2: Core features are now immediately accessible without waiting for blockchain sync to complete.
- 1a482f2: Hovering over the Sia logo now triggers a popover that shows daemon info and sync status.

## 0.15.0

### Minor Changes

- c7d2288: Deleting a file now requires confirmation.
- fef9e82: Configuration tabs now include more specific validation errors and feedback.
- 017c754: Configuration now shows average network prices based off Sia Central data.
- eef3a74: The contracts feature has been updated to use the new endpoint.

## 0.14.0

### Minor Changes

- cb359ad: The files stats bar now displays the total number and size of files.
- cb359ad: The AppNavbar now has two levels, one for global controls and one for filters and stats.
- cb359ad: The autopilot configuration now includes host settings for "redundant IPs" and "max downtime", and a wallet setting for "defrag threshold".
- 4719bc1: The hosts explorer table now shows that price table columns are associated with RHPv3 and host settings RHPv2.
- cb359ad: All data values are now TBs rather than TiBs.
- fa57fe6: The hosts explorer now explains that autopilot must be configured before using the hosts explorer.
- cb359ad: Corrected a styling issue for custom toast notification such as in the copy authenticated URL files feature.
- b6faf57: Transaction types are properly displayed again.
- cb359ad: The autopilot configuration now shows a monthly spending estimate for the configured storage in the stats bar.
- 4719bc1: The "copy authenticated URL" feature now properly includes the host when on localhost:port.

## 0.13.0

### Minor Changes

- ad4f096: The files explorer now shows the total size of directories.
- 879ee13: The file menu now provides "Copy URL", and "Copy authenticated URL" functions.
- 879ee13: The files copy metadata option is now disabled in the data is unavailable or fetching.
- 879ee13: The wallet sparklines have been temporarily hidden until we have support for all inflow/outflow events such as returned allowance.
- ad4f096: The files feature now supports UTF-8 directory and file names.

## 0.12.0

### Minor Changes

- d746281: The sync screen now shows the correct network block height when using the Zen testnet.
- d746281: The unlock form now times out after 5s and shows a new 'Error, daemon did not respond' error - this occurs when the wallet is re-indexing.
- 5059a85: The hosts explorer column state icons are now more clear, some columns now use a gray negative or non-initialized state.
- d746281: The network block height is now estimated. renterd no longer uses SiaStats for anything so the 3rd party data privacy toggle has also been removed.

## 0.10.0

### Minor Changes

- 13a9882: The autopilot target price default value calculation has been corrected.
- 13a9882: Siacoin inputs are now easier to use, especially when entering and editing decimal values.
- 842ffbe: The txpool and wallet transaction lists now show the specific type of transaction.
- 842ffbe: Fixed a bug in the send siacoin transaction flow.
- 72ab6fe: Host and contract explorer view menus now allow toggling column visibility by group.
- 72ab6fe: The host explorer view menu now allows toggling column visibility by group.
- 30493f4: Autopilot estimates are now accurately labeled with TiB units.
- 8510fc8: renterd now has proper page titles.
- 2a0a714: The host menu now provides an option to trigger a manual rescan.
- 30493f4: Autopilot and config features now show any input errors.
- 72ab6fe: Host and contract tables now show 50 items per page.
- 242937b: The renterd sidenav no longer flickers when changing tabs.
- 13a9882: The autopilot and configuration features now have an option to reset all changes.
- 13a9882: The gouging max storage price setting is now entered as a value per TiB per month, and properly stored a value per byte per block.
- 72ab6fe: The host explorer table now includes columns for the host price table and host settings.
- 3abd60c: Autopilot feature is now enabled properly.

## 0.8.0

### Minor Changes

- 0d09171: Fixed an issue where the browser were route infinitely on the sync screen.
- d2a06af: The config settings code has been updated to use the new JSON format.
- 0d09171: File downloads now show their progress in the transfers bar along side uploads.
- 0d09171: Deleting a file now refreshes the current working directory.

## 0.7.0

### Minor Changes

- c069789: Apps now build Go release on GitHub push tag event.

## 0.6.0

### Minor Changes

- 5959f7c: All app paths were slightly incorrect, they are now go.sia.tech/web/\*.

## 0.5.0

### Minor Changes

- 6296e23: All app Go modules are now under the go.sia.tech domain.

## 0.4.0

### Minor Changes

- ceb56a8: The configuration settings now include host block height leeway.
- 6300a71: renterd now has a syncing flow that shows blockchain sync progress and allows the user to manually connect more peers and manage settings.
- 895270e: The Files breadcrumb nav now scrolls to show the working directory when necessary.
- ceb56a8: Host explorer now includes a block status column and the hover tooltip explains how each list contributed to being blocked or not.
- e51b4d3: Apps now have embed specific build flags, embedded apps do not show a server field at login.
- ceb56a8: The host explorer now supports filtering hosts by block status and address.
- fec2c6d: The global command menu now has empty states.
- a882c48: Contract spending is now displayed as a negative value.
- 60e52c7: The file health indicator now shows a breakdown of shards per slab on hover.
- 2e5dec6: Data loading and filtering states have been refined across all features.
- d12a8b7: The file explorer now lists parent directory for traversing up a level.
- ceb56a8: The host explorer now features quick filters and actions for each host row.
- 2b73731: Contracts, hosts, and files tables now include an error state.
- 8e2713c: Files now show their current health based on how many data shards have active contracts.
- 43aba6d: The contracts explorer now supports filtering by address and public key.
- fec2c6d: renterd now supports searching for files, access the feature from the Files actions menu or through the global command menu.
- 2e5dec6: The files explorer now supports navigation, directory creation, file deletion, and more.
- 2e5dec6: File paths are now linkable and reflected in the app URL.
- ceb56a8: The blocklist manager now suggests adding well-known spam addresses to blocklist and shows whether renterd has any active contracts with hosts matching these addresses.
- ea616f1: The hosts feature now shows autopilot score and score breakdown columns.
- 9fe33cb: The gouging config now includes min max collateral.
- 2e5dec6: The files feature now has a view configuration menu.
- 82832d9: The apps are now built into Go modules exposing static assets as an embed.FS.
- ea616f1: The hosts feature now shows whether autopilot considers the host usable based on the scoring criteria. If the host is unusable, the reasons are listed.
- 27c4248: Fixed an issue where siacoin config values were being sent as decimal strings.
- 81a5af6: Host, contract, and file explorer action menus are now all accessed via an icon on the far left of each row.
- ea616f1: The hosts feature now allows filtering to hosts with active contracts.
- ceb56a8: renterd now supports allowlist and blocklist management, accessible from the global command menu or the hosts page.
- ea616f1: All autopilot features are now disabled and hidden if renterd is running with autopilot disabled.

## 0.3.0

### Minor Changes

- 1175e04: The contracts filtering options are now accessible through the global cmd+k menu.
- 6c6c058: The contracts page now shows a timeline visualization for active contracts.
- 6c6c058: The Files page now shows an onboarding/empty state when there are no files.
- 6c6c058: The contracts page now shows and supports pagination and filtering active contracts by expiry date.
- 1175e04: Contracts are now filterable by renewal date.
- 6c6c058: The Hosts page now supports pagination and shows host info, scan, interaction, and uptime information.
- ff1bbef: The configuration page now includes the max storage price gouging setting.
- 6c6c058: The Autopilot settings were updated with the lastest options including contract set.

## 0.2.0

### Minor Changes

- 87c4496: Wallet now shows pending transactions.
- 3b1db65: renterd now has an upload manager that shows status and progress of each upload.
- 3b1db65: The renterd app now supports logging in to remote servers.
- 0ef09f8: `renterd` now features an advanced configuration menu for gouging and redundancy settings.
- 0ef09f8: All forms now show settings that have been changed in green, and a summary count of changes next to the save action.
- 3e2ef47: `renterd` now has a command palette for finding and interacting with any feature. The command palette can be launched with the ⌘+K hotkey.

## 0.1.0

### Minor Changes

- 35e3da8: Design system and general styling migrated to tailwind.

### Patch Changes

- d5caede: Adjust renterd to interact with bus, spike on the hosts feature.
