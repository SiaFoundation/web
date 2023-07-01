# hostd

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
