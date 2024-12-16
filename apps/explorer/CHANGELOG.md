# explorer

## 0.23.0

### Minor Changes

- cb550800: Refactor explorer faucet from formik to react-hook-form.
- c78b0e9a: Use explored for host metrics.

## 0.22.0

### Minor Changes

- f9ba968b: The contracts route now uses explored except for the rates request.
- 5071f9de: Replaced Sia Central with explored API for the host route (minus benchmarks).
- a95d6cc5: Fixed UI display for empty host version or country code string cases.

## 0.21.0

### Minor Changes

- d6e4c8a5: Stripped 'addr' from transaction inputs and output hrefs.
- 61724842: Fixed bug experienced when navigating directly to a block by its height.

## 0.20.0

### Minor Changes

- a4db3e9c: Readded host announcements to transaction route.

## 0.19.0

### Minor Changes

- 20f99f51: The Latest Blocks fetch on the home page now uses explored.
- 028d08f6: The transaction route now uses explored.
- 29580b85: The light and dark ThemeRadio footer component now renders only on the client side.

## 0.18.0

### Minor Changes

- 82b8a619: The explorer now uses explored for block data. Closes https://github.com/SiaFoundation/web/issues/720

## 0.17.0

### Minor Changes

- 3fc5db60: Added base explored API for future Siacentral phase out.

### Patch Changes

- 4e807730: Fixed a bug in the average fiat storage cost calculation.

## 0.16.2

### Patch Changes

- 1ace151d: The faucet feature now points to the correct endpoint.

## 0.16.1

### Patch Changes

- 627355b7: Fixed an issue where scrollbars could not be grabbed by moving mouse to the edge of the screen. Closes https://github.com/SiaFoundation/hostd/issues/423 Fixed by https://github.com/kocoten1992

## 0.16.0

### Minor Changes

- 51f389a2: Block hashes now show both leading and ending characters to improve legibility. Closes https://github.com/SiaFoundation/web/issues/451

## 0.15.0

### Minor Changes

- 8e2d3999: The site now uses the updated Sia Central SDK.

## 0.14.0

### Minor Changes

- 5bafe41e: The explorer now features a host revenue calculator tool.
- 1f5d3436: Toast notifications can now be dismissed. Closes https://github.com/SiaFoundation/web/issues/542

## 0.13.0

### Minor Changes

- 4fa7d882: Update title and description on manifest, og images, and generated metadata.

### Patch Changes

- 4ed40994: Add detailed labels to contract proof outputs explaining what each output is for.

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
