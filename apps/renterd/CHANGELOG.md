# @siafoundation/renterd

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
