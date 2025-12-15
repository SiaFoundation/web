# walletd

## 0.35.0

### Minor Changes

- f13a9c0: The rescan start time is now in the users locale, and validated. Closes https://github.com/SiaFoundation/walletd/issues/223
- a8e7956: Updated Next in response to https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components.
- a782f67: Updated Next to 16.0.10.
- d2b19ce: Adjusting filters, sorting, or pagination controls now resets the scroll position. Closes https://github.com/SiaFoundation/hostd/issues/591 Closes https://github.com/SiaFoundation/hostd/issues/206
- f13a9c0: The rescan status control now shows if there is an error.

### Patch Changes

- 9dbaa0e: Updated react-hook-form to compiler memoization compatible watch API.
- Updated dependencies [9dbaa0e]
- Updated dependencies [57ab9a3]
- Updated dependencies [4b86f66]
- Updated dependencies [a8e7956]
- Updated dependencies [bf2e73c]
- Updated dependencies [1a0b645]
- Updated dependencies [5ffc044]
- Updated dependencies [5ffc044]
- Updated dependencies [bf49561]
- Updated dependencies [1a0b645]
- Updated dependencies [d2b19ce]
  - @siafoundation/design-system@11.3.0
  - @siafoundation/sdk@0.5.0
  - @siafoundation/react-core@8.2.0

## 0.34.5

### Patch Changes

- Updated dependencies [8cbecde]
- Updated dependencies [8459baf]
  - @siafoundation/design-system@11.0.0

## 0.34.4

### Patch Changes

- Updated dependencies [e58460d]
- Updated dependencies [89f2d87]
- Updated dependencies [716520e]
- Updated dependencies [716520e]
- Updated dependencies [e58460d]
  - @siafoundation/react-icons@0.5.0
  - @siafoundation/design-system@10.5.0

## 0.34.3

### Patch Changes

- Updated dependencies [476f23f]
- Updated dependencies [174f989]
  - @siafoundation/react-core@8.1.0
  - @siafoundation/react-icons@0.4.0
  - @siafoundation/design-system@10.4.1

## 0.34.2

### Patch Changes

- Updated dependencies [e95ebb6]
- Updated dependencies [bd61c9e]
- Updated dependencies [3c2e5cd]
- Updated dependencies [7654811]
- Updated dependencies [8cb68af]
  - @siafoundation/design-system@10.2.0
  - @siafoundation/types@0.13.0
  - @siafoundation/units@3.7.0
  - @siafoundation/react-core@8.0.0
  - @siafoundation/sdk@0.4.4
  - @siafoundation/walletd-types@0.7.4
  - @siafoundation/walletd-react@4.5.5

## 0.34.1

### Patch Changes

- 12c578b: Move the auth and connectivity route to /wallets so that consensus and syncer routes can be made public without affecting the UI.
- Updated dependencies [ac3b587]
- Updated dependencies [e399659]
  - @siafoundation/design-system@10.0.0
  - @siafoundation/react-core@7.0.0
  - @siafoundation/fonts@0.5.2
  - @siafoundation/react-icons@0.3.2
  - @siafoundation/sdk@0.4.3
  - @siafoundation/types@0.12.2
  - @siafoundation/units@3.5.2
  - @siafoundation/walletd-react@4.5.4
  - @siafoundation/walletd-types@0.7.3

## 0.34.0

### Minor Changes

- 80965f4: Toast notifications now stack in a way that uses less space.

### Patch Changes

- Updated dependencies [80965f4]
  - @siafoundation/design-system@9.2.0

## 0.33.1

### Patch Changes

- 98a6bd4: Removed unncessary imports with tsconfig react-jsx.
- Updated dependencies [98a6bd4]
  - @siafoundation/design-system@9.1.1

## 0.33.0

### Minor Changes

- c6b1a04d: Wallets added to walletd externally are now displayed as watch-only wallets in the user interface.

### Patch Changes

- c6b1a04d: Adding addresses now works with externally added wallets. Closes https://github.com/SiaFoundation/walletd/issues/258
- c2065783: Fixed an issue with sorting by column.

## 0.32.0

### Minor Changes

- 1ee5d796: Ledger wallets now support blind signing. Blind signing is temporarily required until Ledger supports V2 transactions.
- 35a0e399: Seed wallets now v2 sign with each key once instead of every input.

### Patch Changes

- 8f22435a: Ledger wallets can now send v2 transactions.
- 201b9a38: Fixed an issue where toast notifications would appear behind dialogs.
- 1ee5d796: Fixed an issue where the user would need to reconnect ledger device for multiple transactions.

## 0.31.0

### Minor Changes

- 3571359f: Added support for the contract refresh event type. Closes https://github.com/SiaFoundation/hostd/issues/759

### Patch Changes

- 16b6692a: Updated the app manifest file name to match spec.
- b57aee94: Fixed an issue where the testnet warning banner said 'testnet' twice. Closes https://github.com/SiaFoundation/walletd/issues/323
- 16b6692a: Fixed an issue where the app manifest would sometimes 401 when behind a proxy.

## 0.30.0

### Minor Changes

- 98595836: The logo icons have been updated.

## 0.29.3

### Patch Changes

- 4a7323f0: The wallet send features now use hardfork heights from the consensus network data instead of hardcoded heights.

## 0.29.2

### Patch Changes

- cad48e35: Fixed an issue where a v2ContractResolution event in the wallet would crash the app. Closes https://github.com/SiaFoundation/hostd/issues/629

## 0.29.1

### Patch Changes

- a8e77c6c: Fixed V2 signing for wallets that do not have siafund outputs.

## 0.29.0

### Minor Changes

- d73f9c3a: The send dialogs now indicate the network and transaction version details.

## 0.28.0

### Minor Changes

- 1c6e8c1a: Seed wallets now support and automatically switch to sending V2 transactions once the consensus height hits the V2 hardfork allow height. Closes https://github.com/SiaFoundation/walletd/issues/216 Closes https://github.com/SiaFoundation/walletd/issues/186
- 54a4eabe: Displayed entity values which are often truncated can now be copied to clipboard by double-clicking directly on the visible characters.
- 819c0664: V1 signing now uses the address spendPolicy.
- 93b2e77d: Send mode only sends the amount of siacoin or siafunds specified in the active mode.
- 819c0664: Added V2 signing method.
- 54a4eabe: Wallet addresses can now be copied to clipboard by clicking on the QR code in the address dialog.
- 453b5418: Ledger wallets will now disable sending transactions and display a warning once the hardfork require height is reached. The message explains that sending funds with ledger is not yet available but coming soon.
- 819c0664: Generating addresses now stores the spendPolicy in the dedicated field rather than unlockConditions in the metadata.

## 0.27.0

### Minor Changes

- b7e5ea12: Data tables now show an empty state when viewing a page greater than the first page with no data.

### Patch Changes

- b7e5ea12: Fixed a bug where the transaction list would show pending transactions when viewing pages other than the first page.

## 0.26.0

### Minor Changes

- c909ad28: Multi-select now supports single select, toggle select, and range selection interactions, with click, ctrl-click, and shift-click.

## 0.25.0

### Minor Changes

- 5e7fedb9: The wallet balance is now refreshed at least every 15 seconds.

## 0.24.0

### Minor Changes

- fe888991: Invalid and not found routes now redirect to the home page.

### Patch Changes

- 03221146: Updated the seed wallet address generation process to strip the address prefix, which matches the recent API change. Closes https://github.com/SiaFoundation/walletd/issues/190

## 0.23.2

### Patch Changes

- e9995c5d: The page layout is now persisted between page transitions.

## 0.23.1

### Patch Changes

- 4cf6c8ea: Fixed an issue where the app would try to fetch from an invalid URL when first initializing.

## 0.23.0

### Minor Changes

- a64f40cc: Transaction types have been refined to include new v2 derived transaction types.
- a64f40cc: Event and transaction utility methods have been moved to the units library.

## 0.22.3

### Patch Changes

- 24b47560: Fixed an issue where calculating the siacoin value for a transaction without relevant siacoin inputs would cause an error. Closes https://github.com/SiaFoundation/walletd/issues/150

## 0.22.2

### Patch Changes

- 627355b7: Fixed an issue where scrollbars could not be grabbed by moving mouse to the edge of the screen. Closes https://github.com/SiaFoundation/hostd/issues/423 Fixed by https://github.com/kocoten1992

## 0.22.1

### Patch Changes

- 4806f299: Fixed a few inaccuracies in the event data types. Closes https://github.com/SiaFoundation/walletd/issues/141

## 0.22.0

### Minor Changes

- fff7febd: Wallet events have been updated to use the new types and data format. Closes https://github.com/SiaFoundation/walletd/issues/134

## 0.21.0

### Minor Changes

- 0a0bab05: The connect to peer dialog now supports IPv6 addresses. Closes https://github.com/SiaFoundation/web/issues/624

### Patch Changes

- e43d0d4e: Unconfirmed transactions rows now show their siacoin amount and fees. Closes https://github.com/SiaFoundation/walletd/issues/123

## 0.20.0

### Minor Changes

- 0e393885: Updated wallet events to include maturityHeight and renamed val to data. Closes https://github.com/SiaFoundation/walletd/issues/114
- 0e393885: The events list now shows the maturity height, transactions that have not reached this height are shown as locked. Closes https://github.com/SiaFoundation/walletd/issues/115

## 0.19.1

### Patch Changes

- 856b738a: Fixed an issue where the daemon would panic trying to read the embedded UI files on Windows. Closes https://github.com/SiaFoundation/web/issues/599

## 0.19.0

### Minor Changes

- 23168c6e: Address generation and addition dialogs now have an option to rescan from a specified height. Closes https://github.com/SiaFoundation/walletd/issues/96
- 61de825d: The profile details now include uptime and version. Closes https://github.com/SiaFoundation/walletd/issues/97
- 75d794c4: Added a receive button in addition to the addresses button to make send/receive options more clear. Closes https://github.com/SiaFoundation/walletd/issues/88
- 23168c6e: There is now a dedicated rescan dialog that can be opened from the wallet list and wallet context menus. Closes https://github.com/SiaFoundation/walletd/issues/96
- 23168c6e: Rescan progress and status including errors is now shown in a sticky status bar. Closes https://github.com/SiaFoundation/walletd/issues/96

## 0.18.0

### Minor Changes

- 1f5d3436: Toast notifications can now be dismissed. Closes https://github.com/SiaFoundation/web/issues/542
- e2b8f950: The UI now uses the new daemon endpoints and changes. Closes https://github.com/SiaFoundation/walletd/issues/73
- 8bdf8ee2: Full unlockConditions are now saved in address metadata.
- 8bdf8ee2: Seeds are now hashed and cached as mnemonic rather than entropy.
- 8bdf8ee2: walletd now uses the SDK for wallet and address generation, transaction signing, and all other Sia operations. Closes https://github.com/SiaFoundation/walletd/issues/73
- 1053c506: Context menus now all use a caret icon.

## 0.17.0

### Minor Changes

- 4506593d: All app data will now refresh more frequently.

## 0.16.0

### Minor Changes

- 0fc1c36c: Fixed an issue with the copy to clipboard feature.

## 0.15.5

### Patch Changes

- e24c8935: esm support

## 0.15.0

### Minor Changes

- 23f4fb47: Copyable entity values now have a context menu with support for opening Siascan pages.

## 0.14.0

### Minor Changes

- f3b50183: The send siacoin and siafund features now support specifying custom change and claim addresses.
- ccf9e177: Ledger wallets now support sending siafunds.
- ccf9e177: Seed wallets now support sending siafunds.
- ccf9e177: Event balances are now calculated with only relevant transaction components.
- ccf9e177: The ledger generate addresses dialog now shows a close action if no new addresses have been generated.

## 0.13.0

### Minor Changes

- b72ef30f: Currency display can now be configured to siacoin, fiat, or both along with a preference for when only one can be displayed.
- 5308806e: App preferences no longer list unused GPU setting.

## 0.12.0

### Minor Changes

- 170c1e3b: Wallet do now shows siafund balances when greater than 0.

## 0.11.0

### Minor Changes

- 0135354f: Wallet seeds now get cached after an address is successfully generated.
- 0135354f: Ledger and seed wallets should now use the correct fee when sending transactions with or without the include fee option.
- 46e8450b: walletd now supports Ledger-based wallets.
- 46e8450b: Ledger wallets now support generating a specific address or a range of addresses via Ledger device.
- af5b1890: Outputs are now properly released when a transaction fails during signing or broadcast.
- 45714e2d: The GPU setting now displays the correct device support text.
- d75e7e26: Fixed an issue with the syncing status staying at 99%.
- 46e8450b: Addresses can now be deleted from the context menu.
- 0135354f: Both ledger and seed wallets now save public keys in address metadata, this is especially important to streamline Ledger signing.
- 46e8450b: Support for connecting Ledger devices over USB, HID or Bluetooth depending on browser support.

## 0.10.0

### Minor Changes

- 8da56663: The connectivity and login check no longer depends on consensus APIs which in some rare cases can be unresponsive.

## 0.9.0

### Minor Changes

- 2242911d: The app now warns the user if it is running on the testnet with a prominent banner.
- 16038776: Table headers now freeze in view when the table scrolls.
- 2242911d: Fixed an issue where walletd would indefinitely report as "syncing" - the synced state is now based on the most recent block's timestamp being within the last 2 hours.
- 2242911d: The contrast was improved on the syncing progress text in the daemon profile.

## 0.8.0

### Minor Changes

- e74d48cc: Currency options now include AUD.
- e74d48cc: The wallet list now has a colum that shows the lock status. If the wallet is unlocked, the tooltip also shows the remaining time.
- e74d48cc: The wallet list now has a siacoin balance column.
- e74d48cc: Wallet dropdown now includes unlock, edit, and delete operations.
- e74d48cc: Wallet auto-locking can be enabled or disabled from the App Preferences menu - the feature is enabled by default. The locking inactivity period can also be configured.
- e74d48cc: Seed-based wallets can now be unlocked for a period of time. Each wallet will lock after a period of inactivity or if the app is closed.
- e74d48cc: The Settings dialog is now called App preferences.
- e74d48cc: Operations that require a seed, such as sending siacoin or generated addresses now use cached seed values when a wallet is already unlocked.
- e74d48cc: The app now includes an auto-lock feature that can be enabled or disabled from the App Preferences menu. The locking inactivity period can also be configured.

## 0.7.0

### Minor Changes

- aa50389b: The login screen now has an option to show the custom API field.
- aa50389b: The login screen timeout for an unresponsive daemon is now 10 seconds.

## 0.6.0

### Minor Changes

- f5bb6f00: Initial alpha release with support for seed-based and watch-only wallets.

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
