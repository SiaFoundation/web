# walletd

## 0.15.2

### Patch Changes

- lodash esm.

## 0.15.1

### Patch Changes

- lodash es.

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
