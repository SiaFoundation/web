# hostd

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
