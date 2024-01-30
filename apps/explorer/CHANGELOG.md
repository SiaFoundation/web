# explorer

## 0.12.0

### Minor Changes

- efc40ebb: Fixed an error where looking up a host was showing an error page for unscanned hosts.

## 0.11.0

### Minor Changes

- 0fc1c36c: Fixed an issue with the copy to clipboard feature.

## 0.10.4

### Patch Changes

- e24c8935: esm support

## 0.10.0

### Minor Changes

- 23f4fb47: Copyable entity values now have a context menu with support for opening Siascan pages.
- 2c80becf: The faucet validation now allows up to 50,000 SC.

## 0.9.0

### Minor Changes

- 723803a7: Fixed an issue loading the host page for hosts that are not benchmarked yet.
- c54455f8: Siafunds now properly show on the address totals.
- 3c5f490b: Fixed an issue where transaction values were incorrect on the address page transaction list.

## 0.8.0

### Minor Changes

- ccf0bdcb: The siascan search feature is now case insenstive.
- 5cffb9ff: Fixed an issue where some links were routing to incorrect pages like /block/:id.
- 601a9b02: Outputs on the transaction view now display and link to their associated address.

## 0.7.0

### Minor Changes

- de6572aa: Fiat currency is now configurable.
- 89ea9e7d: Contract details now include expiration, proof, proof deadline, and payout block heights and timestamps.
- 5b950036: All explorer pages now show details in their open graph preview images.
- 89ea9e7d: The foundation's public explorer is now siascan.com.
- b62ef91e: Host settings are now displayed in human friendly units.
- 5b950036: Contracts now show a visual timeline and status.
- 5ff331fe: Add fathom analytics to explorers.
- dd3ea428: Top hosts list now shows price and speed details.
- 91102c09: The explorer now shows average prices on the home page.
- 988375b9: Fixed an issue where the zen search bar was not searching via the zen API.
- 5b950036: The explorer no longer depends on Navigator.
- 5b950036: The explorer has been revamped and now supports searching for and viewing hosts.

## 0.6.0

### Minor Changes

- d514dba0: In cases where the navigator returns incomplete/corrupt contract data, the explorer now displays an error message instead of crashing.

## 0.5.0

### Minor Changes

- d0ebd8a6: Fixed a z-index issue and styling in the nav dropdown menu.
- d0ebd8a6: The site should no longer flicker when loading the page in dark mode.

## 0.4.0

### Minor Changes

- 21e7a98c: Transaction and contract pages now successfully load as expected.

## 0.3.0

### Minor Changes

- 30493f4: The synced and consensus block heights are now displayed correctly and include a tooltip.

## 0.2.0

### Minor Changes

- a7bfe11: The explorer homepage now features host and storage metrics.
- 1397784: The Explorer now supports switching between networks, this was added to provide explorer functionality to the Zen Testnet.
- ff5abd5: Fixed an issue where the block page title was displaying non-numeric block IDs as NaN.
- ccc7ab2: In testnet mode, the explorer now features a faucet for requesting Siacoin.

## 0.1.0

### Minor Changes

- 35e3da8: Design system and general styling migrated to tailwind.
