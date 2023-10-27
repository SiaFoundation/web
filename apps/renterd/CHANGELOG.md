# renterd

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
