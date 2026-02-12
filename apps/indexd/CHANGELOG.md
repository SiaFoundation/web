# indexd

## 0.14.0

### Minor Changes

- ce5a66e: Added quota management page and updated connect key forms to select quotas.

### Patch Changes

- Updated dependencies [9567a4e]
  - @siafoundation/indexd-react@0.8.0
  - @siafoundation/indexd-types@0.12.0

## 0.13.0

### Minor Changes

- bb97ec0: The sync welcome message in the node profile is now based on a more accurate sync status and only shown during the first full sync.

### Patch Changes

- Updated dependencies [28b27ce]
- Updated dependencies [da46c3e]
  - @siafoundation/units@3.9.0
  - @siafoundation/indexd-react@0.7.0
  - @siafoundation/indexd-types@0.11.0

## 0.12.0

### Minor Changes

- a8e7956: Updated Next in response to https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components.
- a782f67: Updated Next to 16.0.10.
- d2b19ce: Adjusting filters, sorting, or pagination controls now resets the scroll position. Closes https://github.com/SiaFoundation/hostd/issues/591 Closes https://github.com/SiaFoundation/hostd/issues/206

### Patch Changes

- 9dbaa0e: Updated react-hook-form to compiler memoization compatible watch API.
- 3eeb7a1: Fixed an issue where the onboarding wizard would show for a split second on initial load even if onboarding was complete. Closes https://github.com/SiaFoundation/hostd/issues/660
- Updated dependencies [9dbaa0e]
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
  - @siafoundation/react-core@8.2.0

## 0.11.0

### Minor Changes

- 2242e5d: All data table columns can now be resized using a handle at the right side of each heading.
- c14e70c: Use native Host location data.
- e8a4b12: Removed contracts list host location column and multi-contract host map.
- 3ef1a06: Added a dialog to specify reasons to block hosts.
- 15f073b: The contract and host tables now have a variety of column sorting options and support for applying multiple at once. Closes https://github.com/SiaFoundation/indexd/issues/570
- a213105: Less important table columns have been removed and all fields are now shown in each side panel. Closes https://github.com/SiaFoundation/indexd/issues/498 Closes https://github.com/SiaFoundation/indexd/issues/606
- e8a4b12: Added host country and flag to single contract side panel.
- 26c718f: Accounts can now be filtered by connect key. Closes https://github.com/SiaFoundation/indexd/issues/607
- 033b447: The hosts table now defaults to showing usable hosts unless the not usable filter is explicitly applied.
- 26c718f: Accounts can now be filtered by connect key from the connect key side panel.

### Patch Changes

- addece5: The data table empty states are now overlayed and centered regardless of horizontal scroll position.
- e5d391f: The client-side min/max validation on connect key pinned data was removed. Closes https://github.com/SiaFoundation/indexd/issues/643
- Updated dependencies [addece5]
- Updated dependencies [26c718f]
- Updated dependencies [8701eee]
- Updated dependencies [2242e5d]
- Updated dependencies [a213105]
- Updated dependencies [15f073b]
- Updated dependencies [825ea2e]
- Updated dependencies [a213105]
- Updated dependencies [ec8973f]
- Updated dependencies [26c718f]
- Updated dependencies [15f073b]
  - @siafoundation/design-system@11.2.0
  - @siafoundation/indexd-types@0.10.0
  - @siafoundation/units@3.8.0
  - @siafoundation/indexd-react@0.6.1
  - @siafoundation/react-core@8.1.1

## 0.10.1

### Patch Changes

- 7c5c88e: Fixed rounding and precision of y-axis values on the wallet balance evolution graph.
- Updated dependencies [7c5c88e]
  - @siafoundation/design-system@11.1.1

## 0.10.0

### Minor Changes

- 543df1d: Added contract and account metrics to data panels.
- 543df1d: Added contract stats to metrics page.

### Patch Changes

- 619dfcc: Fix contract capacity and data size column values. Closes https://github.com/SiaFoundation/indexd/issues/486
- Updated dependencies [543df1d]
- Updated dependencies [543df1d]
- Updated dependencies [373d852]
  - @siafoundation/indexd-react@0.6.0
  - @siafoundation/indexd-types@0.9.0
  - @siafoundation/design-system@11.1.0

## 0.9.0

### Minor Changes

- 8cbecde: The host and contract explorers now have in input menu for adding filters.
- 094ac33: The metrics page now includes more sector and account stats.
- 8d67d8e: The account and alert detail panel data loading has been refined. Closes https://github.com/SiaFoundation/indexd/issues/390 Closes https://github.com/SiaFoundation/indexd/issues/394

### Patch Changes

- Updated dependencies [8cbecde]
- Updated dependencies [094ac33]
- Updated dependencies [8459baf]
- Updated dependencies [8d67d8e]
  - @siafoundation/design-system@11.0.0
  - @siafoundation/indexd-react@0.5.0
  - @siafoundation/indexd-types@0.8.0

## 0.8.0

### Minor Changes

- 1467fd8: The contracts host map now shows colored pins based on good state.
- 3dc8e12: Added loading and empty states to all panels and tables.
- 19650c8: Connect key metadata can now be updated from the details panel.

### Patch Changes

- 6b1bfb8: Fixed an issue where the enable contracts toggle would not respond right away.
- 6b1bfb8: Move the enable contracts toggle to the configuration page context menu.
- Updated dependencies [3dc8e12]
- Updated dependencies [19650c8]
- Updated dependencies [19650c8]
- Updated dependencies [20d54b9]
  - @siafoundation/design-system@10.6.0
  - @siafoundation/indexd-react@0.4.0
  - @siafoundation/indexd-types@0.7.0

## 0.7.0

### Minor Changes

- 89f2d87: Added dataset actions to DataTable header.
- 89f2d87: Adjusted data explorer layout sizing, padding, and action icons.
- 86c8e35: Renamed sectors metrics to slabs.
- 716520e: The detail panel headers now have a copy value action.
- e58460d: Each data explorer now has its own tab icon in the sidenav.

### Patch Changes

- Updated dependencies [e58460d]
- Updated dependencies [89f2d87]
- Updated dependencies [716520e]
- Updated dependencies [716520e]
- Updated dependencies [86c8e35]
- Updated dependencies [e58460d]
  - @siafoundation/react-icons@0.5.0
  - @siafoundation/design-system@10.5.0
  - @siafoundation/indexd-types@0.6.0
  - @siafoundation/indexd-react@0.3.2

## 0.6.0

### Minor Changes

- d2d4a81: Added max pinned data to connect key detail panel.
- d2d4a81: Added account fields: service account, max pinned data.

### Patch Changes

- Updated dependencies [d2d4a81]
- Updated dependencies [3fc9176]
  - @siafoundation/indexd-types@0.5.0
  - @siafoundation/design-system@10.4.2
  - @siafoundation/indexd-react@0.3.1

## 0.5.0

### Minor Changes

- 174f989: There is now a metrics page with the number of sectors stat.
- c43a8d0: Alerts can be dismissed from the detail panel.
- f13c5af: Connect keys can now be deleted from the detail panel.
- c43a8d0: The data explorer now includes alerts.
- f13c5af: The data explorer now includes connect keys.
- 6a85009: New connect keys can now be created.
- 3b0183d: The app now uses the daemon configured explorer for exchange rates, metrics, and geolocation.

### Patch Changes

- Updated dependencies [3b0183d]
- Updated dependencies [174f989]
- Updated dependencies [476f23f]
- Updated dependencies [feb07e3]
- Updated dependencies [174f989]
- Updated dependencies [baa83d1]
  - @siafoundation/indexd-types@0.4.0
  - @siafoundation/indexd-react@0.3.0
  - @siafoundation/react-core@8.1.0
  - @siafoundation/react-icons@0.4.0
  - @siafoundation/design-system@10.4.1

## 0.4.0

### Minor Changes

- e7fa79d: The data explorer tables now have more space between columns.

### Patch Changes

- 4308fa2: The min collateral inputs now show the /TB/month label.
- Updated dependencies [4982f21]
- Updated dependencies [e7fa79d]
  - @siafoundation/indexd-react@0.2.0
  - @siafoundation/indexd-types@0.3.0
  - @siafoundation/design-system@10.4.0

## 0.3.0

### Minor Changes

- 889ebc4: Accounts can now be deleted.
- e91b293: The table and panel in the data explorer are now resizable.
- ac7017c: The host and contract detail panels now fetch their own data.
- e5dd1db: The data explorer now uses server-side filtering and pagination.
- 1b89958: Update min collateral units. Closes https://github.com/SiaFoundation/indexd/issues/310
- dee7386: The data explorer now has an Accounts mode.

### Patch Changes

- Updated dependencies [e5dd1db]
- Updated dependencies [ac7017c]
  - @siafoundation/design-system@10.3.0

## 0.2.0

### Minor Changes

- 8cb68af: Data explorer columns now expand when more space is available.
- bd61c9e: Updated the protocol version type to include both formats and added a helper function.
- f0cf9bc: The data explorer table rendering performance has been improved.
- 3c2e5cd: The host explorer now supports blocking and unblocking selected hosts.
- 3c2e5cd: Improved alignment and styling in the data explorer.
- 8cb68af: Full IDs and public keys are now displayed in the data explorer cells.
- 3c2e5cd: The host explorer usable and blocked columns now support filtering.
- 3c2e5cd: The data tables now support selecting rows.

### Patch Changes

- Updated dependencies [e95ebb6]
- Updated dependencies [bd61c9e]
- Updated dependencies [3c2e5cd]
- Updated dependencies [7654811]
- Updated dependencies [8cb68af]
  - @siafoundation/design-system@10.2.0
  - @siafoundation/indexd-types@0.2.0
  - @siafoundation/types@0.13.0
  - @siafoundation/units@3.7.0
  - @siafoundation/indexd-react@0.1.2
  - @siafoundation/react-core@8.0.0

## 0.1.0

### Minor Changes

- 4a76bb7: The app now has a contract explorer with contract and related host metadata.
- fb5af96: The location column now supports filtering by country.
- fb5af96: The host explorer table can now be sorted by any column.
- 24e032b: The app now has a host explorer with host metadata, usability, blocklist, pricing, and geolocation features.

### Patch Changes

- Updated dependencies [0217a18]
- Updated dependencies [0217a18]
- Updated dependencies [0217a18]
- Updated dependencies [07514b1]
- Updated dependencies [0217a18]
- Updated dependencies [0217a18]
- Updated dependencies [0217a18]
- Updated dependencies [0217a18]
  - @siafoundation/design-system@10.1.0
  - @siafoundation/units@3.6.0
  - @siafoundation/indexd-react@0.1.1

## 0.0.1

### Patch Changes

- be6bb94: Initialize indexd app with layout, menus, settings, auth, and core features.
- Updated dependencies [ac3b587]
- Updated dependencies [e399659]
- Updated dependencies [ab9214e]
  - @siafoundation/design-system@10.0.0
  - @siafoundation/react-core@7.0.0
  - @siafoundation/fonts@0.5.2
  - @siafoundation/indexd-react@0.1.0
  - @siafoundation/indexd-types@0.1.0
  - @siafoundation/react-icons@0.3.2
  - @siafoundation/types@0.12.2
  - @siafoundation/units@3.5.2
