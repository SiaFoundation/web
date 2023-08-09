# walletd

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
