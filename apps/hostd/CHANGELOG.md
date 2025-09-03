# hostd

## 0.66.1

### Patch Changes

- Updated dependencies [e58460d]
- Updated dependencies [89f2d87]
- Updated dependencies [716520e]
- Updated dependencies [716520e]
- Updated dependencies [e58460d]
  - @siafoundation/react-icons@0.5.0
  - @siafoundation/design-system@10.5.0

## 0.66.0

### Minor Changes

- ad8f614: Pinned configuration settings can now be set to zero.
- 3fc9176: Y-axis numeric labels on metrics charts now show 1 decimal place. Closes https://github.com/SiaFoundation/hostd/issues/811

### Patch Changes

- Updated dependencies [3fc9176]
  - @siafoundation/design-system@10.4.2

## 0.65.3

### Patch Changes

- Updated dependencies [476f23f]
- Updated dependencies [174f989]
  - @siafoundation/react-core@8.1.0
  - @siafoundation/react-icons@0.4.0
  - @siafoundation/design-system@10.4.1

## 0.65.2

### Patch Changes

- Updated dependencies [e95ebb6]
- Updated dependencies [bd61c9e]
- Updated dependencies [3c2e5cd]
- Updated dependencies [7654811]
- Updated dependencies [8cb68af]
  - @siafoundation/design-system@10.2.0
  - @siafoundation/types@0.13.0
  - @siafoundation/units@3.7.0
  - @siafoundation/hostd-types@0.10.2
  - @siafoundation/react-core@8.0.0
  - @siafoundation/hostd-react@4.6.9

## 0.65.1

### Patch Changes

- Updated dependencies [ac3b587]
- Updated dependencies [e399659]
  - @siafoundation/design-system@10.0.0
  - @siafoundation/react-core@7.0.0
  - @siafoundation/fonts@0.5.2
  - @siafoundation/hostd-react@4.6.8
  - @siafoundation/hostd-types@0.10.1
  - @siafoundation/react-icons@0.3.2
  - @siafoundation/types@0.12.2
  - @siafoundation/units@3.5.2

## 0.65.0

### Minor Changes

- 80965f4: Toast notifications now stack in a way that uses less space.
- f0c0fb7: Alert data now includes certificate related fields.

### Patch Changes

- Updated dependencies [80965f4]
- Updated dependencies [f0c0fb7]
  - @siafoundation/design-system@9.2.0
  - @siafoundation/hostd-types@0.10.0
  - @siafoundation/hostd-react@4.6.7

## 0.64.2

### Patch Changes

- 98a6bd4: Removed unncessary imports with tsconfig react-jsx.
- Updated dependencies [98a6bd4]
  - @siafoundation/design-system@9.1.1

## 0.64.1

### Patch Changes

- 201b9a38: Fixed an issue where toast notifications would appear behind dialogs.

## 0.64.0

### Minor Changes

- 3571359f: Added support for the contract refresh event type. Closes https://github.com/SiaFoundation/hostd/issues/759

### Patch Changes

- 16b6692a: Updated the app manifest file name to match spec.
- f477cfe1: Fixed an issue where contract timelines would start from 0 when the dataset included a rejected contract. Closes https://github.com/SiaFoundation/hostd/issues/717
- 16b6692a: Fixed an issue where the app manifest would sometimes 401 when behind a proxy.

## 0.63.0

### Minor Changes

- 98595836: The logo icons have been updated.

### Patch Changes

- 64fdb993: Fixed an issue where long alert messages overflow. Fixes https://github.com/SiaFoundation/hostd/issues/725

## 0.62.0

### Minor Changes

- cdf88680: Added versioning data to the alerts table.

## 0.61.0

### Minor Changes

- e617f655: The contract explorer now has distinct v1 and v2 viewing modes.

### Patch Changes

- e617f655: Fixed an issue where the contract explorer did not show the correct total number of contracts.

## 0.60.0

### Minor Changes

- 96a58672: The siascan setting toggle was removed from the cmd+k menu.
- ab80eb67: The announce button has been removed in favor of automatic announcements. Closes https://github.com/SiaFoundation/hostd/issues/605
- 96a58672: Privacy and security settings quick nav actions were added to the cmd+k menu.
- 2976e5ec: The volumes list now has an ID column. Closes https://github.com/SiaFoundation/hostd/issues/635

### Patch Changes

- a33fb963: Fixed the alignment of volume stats in the subnav.

## 0.59.0

### Minor Changes

- b9cb4393: The contracts list now has a version column that displays either v1 or v2.
- b9cb4393: The contracts list now shows both v1 and v2 contracts. Closes https://github.com/SiaFoundation/hostd/issues/623
- b9cb4393: The contracts explorer now supports sorting on all key event heights.

### Patch Changes

- cad48e35: Fixed an issue where a v2ContractResolution event in the wallet would crash the app. Closes https://github.com/SiaFoundation/hostd/issues/629

## 0.58.0

### Minor Changes

- 54a4eabe: Displayed entity values which are often truncated can now be copied to clipboard by double-clicking directly on the visible characters.
- 54a4eabe: Wallet addresses can now be copied to clipboard by clicking on the QR code in the address dialog.

## 0.57.0

### Minor Changes

- 28dbaae4: Alerts can now be accessed via the cmd+k menu.
- 28dbaae4: The hostd alerts feature is now a full page and matches the user experience of renterd alerts.

## 0.56.0

### Minor Changes

- 2a9d1932: The host net address context menu no longer has a view on siascan option. Closes https://github.com/SiaFoundation/hostd/issues/554
- 2a9d1932: The host wallet address context menu now has a view on siascan option.

### Patch Changes

- 7afc02c3: Fixed an issue where the list of alerts was not showing.

## 0.55.0

### Minor Changes

- b7e5ea12: Data tables now show an empty state when viewing a page greater than the first page with no data.

### Patch Changes

- b7e5ea12: Fixed a bug where the transaction list would show pending transactions when viewing pages other than the first page.

## 0.54.0

### Minor Changes

- a9cfe409: The address configuration setting now expects only the hostname without a port. Closes https://github.com/SiaFoundation/hostd/issues/536

## 0.53.1

### Patch Changes

- 8c47e175: Contracts that have not been renewed from or two another contract no longer show the empty contract ID in the contract ID table cell. Closes https://github.com/SiaFoundation/hostd/issues/524

## 0.53.0

### Minor Changes

- c909ad28: Multi-select now supports single select, toggle select, and range selection interactions, with click, ctrl-click, and shift-click.

## 0.52.0

### Minor Changes

- 83aa5a58: The contracts table now supports bulk integrity checks.
- 83aa5a58: The contracts table now support multi-select.

### Patch Changes

- 2f4378d0: Fixed an issue where the metrics graphs were much wider than the screen. Closes https://github.com/SiaFoundation/hostd/issues/500

## 0.51.0

### Minor Changes

- fe888991: Invalid and not found routes now redirect to the home page.

## 0.50.0

### Minor Changes

- 6c7e3681: The onboarding wizard now animates in and out.

### Patch Changes

- e9995c5d: The page layout is now persisted between page transitions.

## 0.49.0

### Minor Changes

- 9277382b: The cmd+k menu / command palette dialog now announces itself via assistive technology.

### Patch Changes

- 4cf6c8ea: Added explicit aria descriptions to some primary dialogs.

## 0.48.0

### Minor Changes

- 7a333ffd: The command menu now opens via Ctrl+K on Linux and Windows.

## 0.47.0

### Minor Changes

- 02c02fe7: The send siacoin feature now validates the entered address.
- 5f34c9a6: The UI now uses the daemon configured explorer for exchange rates.
- 81d374f4: The send siacoin feature now calculates the fee using the daemon's recommended fee per byte and a standard transaction size.
- 5f34c9a6: Migrated all exchange rate usage from Sia Central to Siascan.
- d6eed368: The contracts metrics now show active, rejected, failed, renewed, finalized, and successful.

## 0.46.0

### Minor Changes

- a64f40cc: Sync status is now determined by whether the last block's timestamp is within
  the last 12 hours.
- a64f40cc: The app has been updated to use the new v2 endpoints and data types. Closes https://github.com/SiaFoundation/hostd/issues/440
- a64f40cc: Transaction types have been refined to include new v2 derived transaction types.
- a64f40cc: The wallet balance tip now includes an immature balance.

## 0.45.1

### Patch Changes

- 627355b7: Fixed an issue where scrollbars could not be grabbed by moving mouse to the edge of the screen. Closes https://github.com/SiaFoundation/hostd/issues/423 Fixed by https://github.com/kocoten1992

## 0.45.0

### Minor Changes

- a04ef967: Max collateral no longer has an option to auto-calculate its value, the same value is shown as a suggestion. Closes https://github.com/SiaFoundation/hostd/issues/418
- 1a4a2bd3: The pin max collateral switch is now visible in basic view mode. Closes https://github.com/SiaFoundation/hostd/issues/417

### Patch Changes

- a04ef967: Fixed an issue where suggestions or errors were not showing for some fields.

## 0.44.0

### Minor Changes

- 5611d44a: Max collateral now has a field-specific option to auto-calculate its value. Closes https://github.com/SiaFoundation/web/issues/628
- 5611d44a: The configuration page now has a view menu in the action bar that is consistent with all other feature pages.
- 5611d44a: Basic configuration mode no longer sets certain fields in the background. Closes https://github.com/SiaFoundation/web/issues/628

### Patch Changes

- 6ae66f37: Refined the volume deletion toast message to "Volume is now being permanently deleted". Closes https://github.com/SiaFoundation/hostd/issues/409
- 866641b4: Fixed an issue where the transaction information would not show in the dialog. Closes https://github.com/SiaFoundation/hostd/issues/402

## 0.43.0

### Minor Changes

- 0a0bab05: The connect to peer dialog now supports IPv6 addresses. Closes https://github.com/SiaFoundation/web/issues/624

## 0.42.0

### Minor Changes

- 5760861a: Moved the pinned currency change threshold to advanced mode settings.

## 0.41.0

### Minor Changes

- 78fe2e65: The configuration settings now support price pinning to an external currency. Closes https://github.com/SiaFoundation/hostd/issues/328
- 49ff7435: Configuration settings that the user has not modified will be kept in sync with remote values that change. Closes https://github.com/SiaFoundation/hostd/issues/286

### Patch Changes

- 71cb25c9: Organized hostd types and constants.

## 0.40.2

### Patch Changes

- a9560ff4: Fixed an issue where volume resize and delete dialogs were not loading the volumes data. Closes https://github.com/SiaFoundation/hostd/issues/371

## 0.40.1

### Patch Changes

- 856b738a: Fixed an issue where the daemon would panic trying to read the embedded UI files on Windows. Closes https://github.com/SiaFoundation/web/issues/599

## 0.40.0

### Minor Changes

- 1f5d3436: Toast notifications can now be dismissed. Closes https://github.com/SiaFoundation/web/issues/542
- 1053c506: Context menus now all use a caret icon.

### Patch Changes

- c5e00b05: The configuration panel is now centered on larger screens. Closes https://github.com/SiaFoundation/web/issues/543

## 0.39.0

### Minor Changes

- d4fcadf8: Siacoin metric cards now show the dynamic units with two decimal places. Closes https://github.com/SiaFoundation/hostd/issues/217
- 805f32e0: All graphs now remember any chart configuration that the user has selected.

## 0.38.0

### Minor Changes

- 4506593d: Integrity check alert sector data will now update when there is an ongoing integrity check.
- 4506593d: All app data will now refresh more frequently.
- c98f1941: The node profile details now include uptime. Closes https://github.com/SiaFoundation/hostd/issues/92

### Patch Changes

- fdcfcb6d: The bandwidth settings for egress and ingress now have clearer descriptions.
- bbbe56a8: The contract timeline labels have been darkened to increase contrast and readability.

## 0.37.0

### Minor Changes

- 90813d49: Removed the maximum registry size configuration option.

## 0.36.0

### Minor Changes

- 8f8a17f3: Update the net address placeholder value to show port 9982.

## 0.35.0

### Minor Changes

- 4dbb448d: Fixed an error with "lastAnnouncement" that occurs the first time the configuration is saved.

## 0.34.0

### Minor Changes

- 0aaec351: Fixed an issue where the app would not navigate when the metrics data interval was set to ALL.
- de517fcf: Fixed the free space calculation in the resize volume dialog. Closes https://github.com/SiaFoundation/hostd/issues/241
- 7b03a9f9: Fixed an issue where where the lack of a host announcement would crash the UI. Closes https://github.com/SiaFoundation/hostd/issues/271

### Patch Changes

- 23008657: Fixed an issue where the base RPC and sector access price calculation was off by 10.

## 0.33.0

### Minor Changes

- fa1297bf: The configuration page now has menu options to download or copy an image of the current configuration for easier sharing.
- e470c163: Fixed an issue where siacoin and numeric input values would jump to an incorrect value.
- 7484cbc0: The announce button is now disabled unless the net address does not match the last announcement. Closes https://github.com/SiaFoundation/hostd/issues/248

## 0.32.0

### Minor Changes

- 0fc1c36c: Fixed an issue with the copy to clipboard feature.

## 0.31.4

### Patch Changes

- e24c8935: esm support

## 0.31.0

### Minor Changes

- c65b3667: Metrics intervals for 1Y and ALL are now weekly and monthly.
- d0c8a592: Refactored internal dependencies.

## 0.30.0

### Minor Changes

- cbce1a89: Fix bug where announcement error shows both a success and error toast.
- b84074f3: Data metrics no longer use RHP version specific data.
- 0d805084: The wallet balance shown on the wallet page is now spendable plus unconfirmed.
- 74553598: Fixed an issue where currency was displayed with too many decimals.

## 0.29.0

### Minor Changes

- 23f4fb47: Copyable entity values now have a context menu with support for opening Siascan pages.
- 5592bd90: The onboarding wallet balance check is now satisfied by a confirmed or unconfirmed balance above 0 SC.
- a4d9df51: The onboarding wizard no longer shows on the login page.
- bfa6b96b: Fixed an issue where number fields would not properly handle user input starting with a decimal separator.
- 64ca2b2b: The alerts dialog now has an "all" filter.

## 0.28.0

### Minor Changes

- 1f858150: Revenue metrics no longer show negative potential on the bar graph.
- 1f858150: Metrics no longer include registry related data.
- f74dc260: Wallet transactions are now paginated.
- 1f858150: Earned revenue stat cards are now clearly labeled as earned.

## 0.27.0

### Minor Changes

- 2003a885: The revenue graph is now a bar stack, much more clearly showing earned vs potential revenue.
- 2003a885: The metrics graphs now show a y-axis.
- b72ef30f: Currency display can now be configured to siacoin, fiat, or both along with a preference for when only one can be displayed.
- 5308806e: App preferences no longer list unused GPU setting.

## 0.26.0

### Minor Changes

- e04a35c7: Wallet now instructs new users to fund their wallet when there are no transactions yet.
- 16b7df4c: The wallet balance tooltip now shows spendable confirmed and unconfirmed values.
- 7996532c: The configuration now shows suggestions for pricing, collateral, and other settings.
- 6fc53f46: Extremely small siacoin values will now show as hastings by default rather than 0SC.
- e04a35c7: Wallet balance evolution graph is now hidden until at least 1 data point is available.

## 0.25.0

### Minor Changes

- 7f020f8b: Fixed an issue where the app would error on page load.

## 0.24.0

### Minor Changes

- d01fad01: The configuration now has an advanced mode that allows the user to view and change all settings.
- 5d603561: New users will now see an onboarding wizard that prompts the user to complete the necessary setup steps - it also shows the status and progress of each.
- d01fad01: The configuration page now shows the changed status on fields if the user has made a change but the server values were since updated.
- d01fad01: The command palette now includes navigation to configuration sections.
- 829d91df: Fixed an issue where fiat input fields values were not displaying properly.
- c4aafc65: Data tables now refresh themselves without user interaction or refocusing the app, even more frequently if a long running operation is in progress.
- d01fad01: The configuration is now much simpler by default, only requiring the user to set essential settings.

## 0.23.0

### Minor Changes

- ad8f9b62: The volume status icon now shows in progress operations more clearly.
- ea95ab52: The contracts table now has a column for "remaining renter funds".
- e3a3b65a: Alerts can now be filtered and dismissed by type.
- e3a3b65a: The alert dialog now has a fixed height, so it stays in the same position when an alert is dismissed.
- ad8f9b62: In-progress volume operations can now be canceled from the volume context menu.
- a8f29daf: Bandwidth metrics are no longer broken out by protocol.
- ad8f9b62: Volume operations are now disabled when one is already in progress.
- a8f29daf: The node block height now shows the estimated network height when syncing.
- e3a3b65a: Fixed an issue with the alert dismiss button overflowing.

## 0.22.0

### Minor Changes

- 45714e2d: The GPU setting now displays the correct device support text.

## 0.21.0

### Minor Changes

- 2e77e9cf: Fixed an issue where alert error messages were being cut off. Full error messages are now displayed above all other fields.
- 8da56663: The connectivity and login check no longer depends on consensus APIs which in some rare cases can be unresponsive.

## 0.20.0

### Minor Changes

- 45a2d701: The contracts table now has an egress usage column.

## 0.19.0

### Minor Changes

- ce199e51: All dropdown menus now have higher contrast text.
- 2242911d: The app now warns the user if it is running on the testnet with a prominent banner.
- ce199e51: The logs view has been removed from the node tab.
- cd941e4c: The metrics time range now automatically updates and refreshes the data at a rate equal to the selected data interval.
- 16038776: Table headers now freeze in view when the table scrolls.
- 45577c32: Metrics datum modes (average, latest, total) selected by the user are now remembered.
- c62ae09c: Wallet now warns the user if the wallet is scanning and shows the percent progress.
- 2242911d: The contrast was improved on the syncing progress text in the daemon profile.
- 1901ff6d: Metrics now support a 1 day time range with 5 minute intervals.
- ce199e51: Context menus now show the entity type and identifier for clarity.

## 0.18.0

### Minor Changes

- e74d48cc: Currency options now include AUD.
- 5f6e03fe: Accepting contracts option can be disabled.
- 3bf6bbaf: Metrics now include locked and risked collateral.
- b717b821: Contract data integrity checks can now be triggered from the contract action menu. Status updates are published to the alerts feeds.
- 3bf6bbaf: Bandwidth and operation metric graph colors have been revised for clarity.
- 7bd49b6d: Contract timeline now always shows contract duration dates, on user interaction the specific labels will activate.
- 7bd49b6d: Contracts columns now have a time category.
- c5404928: Fixed a metrics issue where the data time range would stay fixed between page loads until explicitly changed.
- e74d48cc: The Settings dialog is now called App preferences.
- 7bd49b6d: Contract columns now include start date, expiration date, and payout date - start and expiration are sortable.
- 660de5a7: Dates are now properly localized based on the user's system.
- c5404928: Fixed an issue where some metrics graphs and totals were including an incorrect large first datum.
- 775930aa: Storage stat cards no longer include total as an option.
- d91ebc7e: Collateral metric is now based on multiplier and properly shows in stats and on graph.
- e74d48cc: The app now includes an auto-lock feature that can be enabled or disabled from the App Preferences menu. The locking inactivity period can also be configured.
- 7bd49b6d: Contract timeline dates are now localized.
- 7bd49b6d: Paginators now properly show loading state when fetching a new page or previous results when revalidating a cached page.
- 7bd49b6d: Inactive sortable table columns now show a subtle caret to signify that they are sortable.

## 0.17.0

### Minor Changes

- aa50389b: The login screen now has an option to show the custom API field.
- aa50389b: The login screen timeout for an unresponsive daemon is now 10 seconds.

## 0.16.0

### Minor Changes

- 00c43ed3: The wallet now sends the correct amount when fee is included in amount.
- b1692517: Dynamic DNS secret and password settings are now hidden password fields.

## 0.15.0

### Minor Changes

- 09072b7c: Home page storage metric card now shows physical sectors instead of contract sectors.
- 867763b2: hostd now features alerts. Alerts notify the user to important contract and storage events.
- f8723a70: Collateral configuration setting is now a multiple of storage price.
- b4e6d67c: The contracts page now properly instructs the user to configure and announce the host when there are no contracts.
- e76398fb: The host announcement dialog now shows the correct fee amount.

## 0.14.0

### Minor Changes

- 2e1e6662: Fixed an issue where flat lines were not showing up on graphs.
- d9112931: Pricing metrics now show proper values.

## 0.13.0

### Minor Changes

- 06e7e1c5: Numbers are now displayed and entered in localized format.
- 000db6a6: Currency options now include CAD, AUS, RUB, and CNY.
- 06e7e1c5: Dates and times are now displayed in a localized format.
- cad2fa5a: The volume creation dialog now allows selecting the location via text input.
- 46372064: Pricing metrics are now in the same units as their corresponding configuration values.
- 198df6a6: Contracts can now be sorted by expiration height.
- 32f69b4f: The metrics page now remembers selected data time span, interval, and date range.
- ae32be10: The Node overview now features a logs panel that shows the last 100 actions.
- 33cd3b54: The transaction details dialog title is now based on the specific type.
- 198df6a6: Metrics now show the correct interval with start and end date time details.

## 0.12.0

### Minor Changes

- d32ffbe: Directory navigation in the volume creation dialog now works properly when navigating up to the root drive.
- 7900664: Metrics charts now properly show the final data point.
- 2994f8f: New directories can now be created directly from the volume creation dialog directory selection tool.
- 08e616b: Dynamic DNS configuration errors are now displayed in full.
- 7299f00: Price settings are no longer described as "minimum".
- 8bae495: Host announcement transactions now show up labeled as such in the transaction list.

## 0.11.0

### Minor Changes

- 14fd2ef: Volumes view and create now available from the command palette.
- 21b582c: Contract total usage sum now no longer includes risked collateral.
- 1a482f2: Contract timelines and other features based on block height now use estimated block height for current height until synced.
- 1a482f2: Core features are now immediately accessible without waiting for blockchain sync to complete.
- 1a482f2: Hovering over the Sia logo now triggers a popover that shows daemon info and sync status.
- eb0cd0d: The displayed wallet balance is now spendable+unconfirmed.
- 6d8bde8: The volume delete dialog now resets when it is closed.
- 21b582c: Risked collateral is now next to locked collateral in the contracts table.

## 0.10.0

### Minor Changes

- ec02c30: Create and resize volume features now support Windows file paths.
- fef9e82: Dynamic DNS configuration now supports the required provider specific options.
- d1561e0: Wallet send siacoin feature now correctly reports successful transactions.
- 7e096cb: The configuration RHP3 section is now called Accounts.
- e80345c: Contracts explorer payout column values are now accurate.
- ec02c30: The create volume directory selection now reports the correct free space.
- fef9e82: Configuration tabs now include more specific validation errors and feedback.
- d1561e0: Wallet transaction list now shows siacoin value for pending transactions.
- fef9e82: Dynamic DNS now supports cloudflare.
- c7d2288: Broadcasting host announcement now requires confirmation and shows the siacoin transaction cost.
- fef9e82: Configuration no longer includes a window size setting.

## 0.9.0

### Minor Changes

- cb359ad: The AppNavbar now has two levels, one for global controls and one for filters and stats.
- 4585fb0: The Configuration page now has a button for triggering a host announcement.
- 4585fb0: The Configuration page now supports all hostd settings.
- cb359ad: All data values are now TBs rather than TiBs.
- 4719bc1: Storage volumes can now be created, resized, deleted, and toggled between read-only and write modes.
- fa57fe6: Metrics now include storage and registry operations.
- 4585fb0: Configure dynamic DNS with Route 53, No-IP, or Duck DNS right from the UI.
- fa57fe6: The wallet now has a balance evolution graph.
- b6faf57: Transaction types are properly displayed again.
- 4585fb0: The Configuration page now automatically updates and shows whether dynamic DNS is working.
- 4719bc1: The volumes list now shows statuses, size, usage, and counts for successful and failed reads and writes.

## 0.8.0

### Minor Changes

- 7b0a75c: The home dashboard now shows a variety of metrics and allows changing the data time range.
- 879ee13: Charts now supports grouping stats by category, such as hostd earned and potential revenue.
- ddebbb1: The network block height is now estimated. renterd no longer uses SiaStats for anything so the 3rd party data privacy toggle has also been removed.
- ddebbb1: The sync screen now shows the correct network block height when using the Zen testnet.
- 879ee13: Charts now have loading states.
- 879ee13: The wallet sparklines have been temporarily hidden until we have support for all inflow/outflow events such as returned allowance.

## 0.7.0

### Minor Changes

- 12d206f: The contracts explorer now allows filtering on status and contract ID, these are also accessible via the global ⌘K palette.
- d746281: The unlock form now times out after 5s and shows a new 'Error, daemon did not respond' error - this occurs when the wallet is re-indexing.
- 12d206f: The contracts explorer now features columns for a contract timeline, siacoin usage by type, data size, and more.
- 12d206f: The contracts explorer now supports view column configuration and sorting by status and timeline.

## 0.6.0

### Minor Changes

- 842ffbe: The txpool and wallet transaction lists now show the specific type of transaction.

## 0.5.0

### Minor Changes

- c069789: Apps now build Go release on GitHub push tag event.

## 0.4.0

### Minor Changes

- 5959f7c: All app paths were slightly incorrect, they are now go.sia.tech/web/\*.

## 0.3.0

### Minor Changes

- 6296e23: All app Go modules are now under the go.sia.tech domain.

## 0.2.0

### Minor Changes

- e51b4d3: Apps now have embed specific build flags, embedded apps do not show a server field at login.
- 82832d9: The apps are now built into Go modules exposing static assets as an embed.FS.

## 0.1.0

### Minor Changes

- 35e3da8: Design system and general styling migrated to tailwind.
