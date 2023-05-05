# renterd

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
