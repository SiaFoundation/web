# Changelog

## 1.0.9

### Patch Changes

- esm lodash support.
- Updated dependencies
  - @siafoundation/next@0.0.5
  - @siafoundation/react-core@0.16.8
  - @siafoundation/react-icons@0.1.5
  - @siafoundation/react-sia-central@1.0.5
  - @siafoundation/types@0.0.6
  - @siafoundation/units@1.0.5

## 1.0.8

### Patch Changes

- lodash esm.
- Updated dependencies
  - @siafoundation/next@0.0.4
  - @siafoundation/react-core@0.16.7
  - @siafoundation/react-icons@0.1.4
  - @siafoundation/react-sia-central@1.0.4
  - @siafoundation/types@0.0.5
  - @siafoundation/units@1.0.4

## 1.0.7

### Patch Changes

- lodash es.
- Updated dependencies
  - @siafoundation/next@0.0.3
  - @siafoundation/react-core@0.16.6
  - @siafoundation/react-icons@0.1.3
  - @siafoundation/react-sia-central@1.0.3
  - @siafoundation/types@0.0.4
  - @siafoundation/units@1.0.3

## 1.0.6

### Patch Changes

- detect-gpu esm support.
- Updated dependencies
  - @siafoundation/react-core@0.16.5

## 1.0.5

### Patch Changes

- Import tailwind colors as .js.

## 1.0.4

### Patch Changes

- 4294302f: Adjust packaging.
- Updated dependencies [4294302f]
  - @siafoundation/next@0.0.2
  - @siafoundation/react-core@0.16.4
  - @siafoundation/react-icons@0.1.2
  - @siafoundation/react-sia-central@1.0.2
  - @siafoundation/types@0.0.3
  - @siafoundation/units@1.0.2

## 1.0.0

### Minor Changes

- a4964540: Refactor hooks used in server synced configuration features.
- d0c8a592: Refactored internal dependencies.

### Patch Changes

- Updated dependencies [d0c8a592]
  - @siafoundation/react-core@0.16.0
  - @siafoundation/react-sia-central@1.0.0
  - @siafoundation/units@1.0.0

## 0.63.0

### Minor Changes

- 00a3ce62: ChartXY no longer adds padding point for barstack and bargroup.
- f2145a38: Added useServerSyncedForm.

## 0.62.1

### Patch Changes

- Updated dependencies [e211222d]
  - @siafoundation/units@0.2.0

## 0.62.0

### Minor Changes

- bfa6b96b: Fixed an issue where number fields would not properly handle user input starting with a decimal separator.
- 64ca2b2b: The alerts dialog now has an "all" filter.

## 0.61.0

### Minor Changes

- f74dc260: EntityList props refactored.

## 0.60.0

### Minor Changes

- 2003a885: The ChartXY API has been refactored.

## 0.59.0

### Minor Changes

- 35ff2dec: Siacoin and number input placeholders now match the suggested value.
- 6fc53f46: Extremely small siacoin values will now show as hastings by default rather than 0SC.

## 0.58.1

### Patch Changes

- Updated dependencies [1c376d0e]
  - @siafoundation/react-icons@0.1.0
  - @siafoundation/sia-js@0.11.0
  - @siafoundation/react-sia-central@0.0.3

## 0.58.0

### Minor Changes

- 829d91df: Fixed an issue where fiat input fields values were not displaying properly.

### Patch Changes

- Updated dependencies [21972d75]
  - @siafoundation/react-core@0.15.0
  - @siafoundation/react-sia-central@0.0.2

## 0.57.0

### Minor Changes

- 46e8450b: Added FieldLabel and FieldError for custom groups.

## 0.56.0

### Minor Changes

- d0ebd8a6: Migrated theming to next-themes.
- c3d93283: Table now supports an active row with colored border.
- c3d93283: AppAuthedLayout now has a scroll prop.
- c3d93283: Fixed border issues with table.
- c3d93283: Add box-shadow based border classes.

## 0.55.0

### Minor Changes

- ce199e51: All dropdown menus now have higher contrast text.
- ce199e51: Added new ValueMenu component for displaying truncated text with a menu button.
- 16038776: Table headers now freeze in view when the table scrolls.

## 0.54.0

### Minor Changes

- 7bd49b6d: Contract timeline now always shows contract duration dates, on user interaction the specific labels will activate.
- e74d48cc: The Settings dialog is now called App preferences.
- 660de5a7: Dates are now properly localized based on the user's system.
- 3bf6bbaf: Graph chart type config is now restricted based on the initial chart type.
- 7bd49b6d: Contract timeline dates are now localized.
- b33ecb82: Refactor and updates to field based form component API.
- 7bd49b6d: Paginators now properly show loading state when fetching a new page or previous results when revalidating a cached page.
- 7bd49b6d: Inactive sortable table columns now show a subtle caret to signify that they are sortable.

## 0.53.0

### Minor Changes

- be705b97: Toasts now accept a ReactNode but are still renterd inside Text.

## 0.52.0

### Minor Changes

- 4fc8643f: PaginatorUnknownTotal now shows none instead of range if page is empty.
- b1692517: Renamed ConfigurationPanel secret type to password.
- b1692517: Fixed a cursor position issue with Text and TextArea form fields.
- b1692517: Form and ConfigFields now accept a ReactNode actions to display next to the label.

## 0.51.0

### Minor Changes

- 2e1e6662: Fixed an issue where flat lines were not showing up on graphs.

## 0.50.0

### Minor Changes

- 198df6a6: Sorting fields no longer have to be table columns.
- 33cd3b54: BalanceEvolution now has chartType and allowConfiguration props.
- 06e7e1c5: NumberField and SiacoinField now intl/localize formatting.

## 0.49.0

### Minor Changes

- 6d8bde8: Fixed an issue where closing a dialog would trigger the embedded form's onSubmit.
- 21b582c: PaginatorKnownTotal skip to last page control now sets the correct offset.
- 6d8bde8: Toasts now properly display and space their icons.

## 0.48.0

### Minor Changes

- c7d2288: Add wrapEllipsis prop to Text.
- d1561e0: Modified how the EntityList displays the unconfirmed transaction status.
- fef9e82: SiacoinField inputs now pass updated values immediately on change.
- b9b5484: Link and LinkButton set rel to noopener when target is \_blank.
- fef9e82: Configuration field components are now fully config driven and based on react-hook-form.
- ec02c30: Configuration and form system now has Field components.
- c7d2288: Refine toast text overflow and wrap behaviour.
- c7d2288: Added a generic ConfirmDialog.
- fef9e82: SiacoinField now does not revalidate exchange rates on focus.
- fef9e82: Naming of time utility functions has been cleaned up.

## 0.47.0

### Minor Changes

- cb359ad: The AppNavbar now has two levels, one for global controls and one for filters and stats.
- b6faf57: ChartXY now supports more fine grained key and category ordering options.
- 4719bc1: FormField now includes a decimalLimit for the number type.
- 4585fb0: Added ConfigurationSelect.
- fa57fe6: Refactor and rename WalletSparkline to WalletBalanceEvolution.
- 4585fb0: PanelMenuSection and PanelMenuSetting moved from renterd to system.
- fa57fe6: Add Select Option component with background and text colors.
- cb359ad: Add ConfigurationSwitch, useSiacoinFiat, and vertical Separator variant.
- cb359ad: Corrected a styling issue for custom toast notification such as in the copy authenticated URL files feature.
- 4585fb0: ConfigurationSiacoin now supports custom units such as SC/TB.
- 4585fb0: Fixed decimal handling NumberField, extracted a new BaseNumberField.
- 4719bc1: Added functions for converting between sectors and different byte/binary units.

## 0.46.0

### Minor Changes

- 7b0a75c: Button now has a text color override prop.
- 879ee13: Charts now supports grouping stats by category, such as hostd earned and potential revenue.
- 7b0a75c: ChartXY now shows the tooltip for zero values.
- 879ee13: Menu item disabled states have been improved.
- 7b0a75c: ChartXY now supports custom data labels.
- 7b0a75c: Select now supports a custom icon.
- 879ee13: The toast API has been extended to support generic React components.
- 879ee13: Charts now have loading states.
- 879ee13: Toasts now use proper default styling when used in apps.

## 0.45.0

### Minor Changes

- d136e4f: Fix focus outline clipping issue when hovering adjacent control.
- d746281: FormSubmitButton now shows animated dots when loading.
- d746281: The unlock form now times out after 5s and shows a new 'Error, daemon did not respond' error - this occurs when the wallet is re-indexing.
- d136e4f: Add tip to LinkButton.

## 0.44.0

### Minor Changes

- 30493f4: All configuration fields are now directly form driven.
- 13a9882: Siacoin inputs are now easier to use, especially when entering and editing decimal values.
- 72ab6fe: Streamlined Table API, separated out cell context data, non-stateful column definitions.
- 30493f4: Fixed an issue with form submit button disabled states.
- 13a9882: Consolidated bytes/TiB conversion functions.

## 0.43.0

### Minor Changes

- 0d09171: Fixed an issue where the browser were route infinitely on the sync screen.

## 0.42.0

### Minor Changes

- b5881e6: Add useClientFilters, useServerFilters, useFormChanged, useClientFilteredDataset, useDatasetEmptyState.
- c0ce109: The contract timeline now shows points for contract revisions and proofs.
- 38c9ef4: Fix a z-index Safari bug that would clip the action dropdown in the AppLayout.
- ceb56a8: Add underline variants to Text.
- 7c911cd: Upgrade visx to latest v2.X.X.
- ceb56a8: Add configurable error display to form components.
- ceb56a8: Add PoolSelected component, rename PoolCombo.
- b165079: Mutate dependencies now support filter matching keys.
- 2e5dec6: The swr data fetching library updated to 2.0.
- f83ea6e: PaginatorUnknownTotal now displays correct last page values.
- 3f1b38f: The Table components column sizing has been improved.
- 7c911cd: Add option to manually configure data rollup mode for getTimeRangeRollup chart data function.
- ceb56a8: Add amber color variant to Button.
- c0ce109: Lock and sync screens now remember and redirect back to the previous page.
- 39326a2: Button now includes embedded tooltip props.

## 0.41.0

### Minor Changes

- 0169246: ContractTimeline now shows the proof window.
- 6c6c058: ContractTimeline component is now aware of both block height and time units.
- 6c6c058: Added PaginatorKnownTotal and PagniatorUnknownTotal.
- 6c6c058: Fixed xxs Text size.
- 6c6c058: Added useClientFilters.
- 1175e04: Button now has active and inactive variants.
- 1175e04: The tailwind theme now supports text fill and shadow fill.
- 6c6c058: Fixed Button svg coloring.
- 6c6c058: Added useTableState.
- 6c6c058: Table component now has configurable empty and loading states.
- 1175e04: Add base MenuItem components.
- 6c6c058: Added a max length of 200 characters to toast messages.
- 6c6c058: Added more block time conversion functions.
- 6c6c058: Added ConfigurationText, ConfigurationTipText.

### Patch Changes

- 1175e04: The TextField autofill coloring is now consistent across browsers.

## 0.40.0

### Minor Changes

- ff5abd5: Moved the ProgressSteps component to the design-system.
- ff5abd5: Adjusted the rounding on Badges, adjusted margins in ValueCopyable.
- f56a9a4: Add SectionHeading, a heading with with automatic anchoring.
- f96683e: Siacoin form inputs now have an option to disable the associated fiat currency input.
- ff5abd5: The tailwind config now supports an animation-delay property.
- 21cc882: Added helpers for converting between blocks and time.

### Patch Changes

- 2959676: Fix issues with the Link component due to new next/link behaviour, and align a discrepancy in LinkButton Safari styling.

## 0.39.0

### Minor Changes

- 35e3da8: Streamline popper and modal component APIs.
- 35e3da8: Design system and general styling migrated to tailwind.

## [0.38.1](https://github.com/SiaFoundation/web/compare/design-system-0.38.0...design-system-0.38.1) (2022-10-25)

### Bug Fixes

- external link icons in sitemap, section gradients ([d6d96c4](https://github.com/SiaFoundation/web/commit/d6d96c46cd2de37eb18972311dd4023147eec437))
- renterd changes, numberfield options, theme radio fix, asset cleanup ([fa94e07](https://github.com/SiaFoundation/web/commit/fa94e0741e0c365f6adef3b8987186f36725e067))
- update copy, add icons ([876c392](https://github.com/SiaFoundation/web/commit/876c39208d8f4f3cfadbcb23441d73cd5cde9ee5))

# [0.38.0](https://github.com/SiaFoundation/web/compare/design-system-0.37.0...design-system-0.38.0) (2022-10-20)

### Features

- high rez assets, update sia central naming, design tweaks ([4ad9e13](https://github.com/SiaFoundation/web/commit/4ad9e13ba3e889136972c7704764239b5c5c2688))

# [0.37.0](https://github.com/SiaFoundation/web/compare/design-system-0.36.0...design-system-0.37.0) (2022-10-18)

### Features

- spike on renterd page ([c5b720a](https://github.com/SiaFoundation/web/commit/c5b720a257eacc5ba149ca5bdea359f59630eee2))

# [0.36.0](https://github.com/SiaFoundation/web/compare/design-system-0.35.0...design-system-0.36.0) (2022-10-13)

### Bug Fixes

- address feedback and bugs, add new blogs ([12db7fd](https://github.com/SiaFoundation/web/commit/12db7fdd44358ba1aac67d96c8ea8392e7cdc3b6))
- border contrast, grants copy ([7431e10](https://github.com/SiaFoundation/web/commit/7431e103d32c85abf7731774ab456aa25ffacbe6))
- ios safari font size glitch, site menu scroll top, update radix breaking changes ([244f412](https://github.com/SiaFoundation/web/commit/244f4120d671b8f771a0c9e60cfb5168d70653e8))
- letter width, site borders ([4481fe2](https://github.com/SiaFoundation/web/commit/4481fe2e911109490e6ba19ce75eeeb982cd082d))
- missing icon in content item ([a8015d6](https://github.com/SiaFoundation/web/commit/a8015d6e61b07d7090ac752c91a46dc11195e7b7))
- site layout safari mobile z-index ([a416565](https://github.com/SiaFoundation/web/commit/a416565d0ae256b9b2ac50b0ae5a89b7e747ad85))
- site menu add delay scroll top ([4d01d5d](https://github.com/SiaFoundation/web/commit/4d01d5d9d17a33d8305113ebdd0eebb62f1da790))
- site menu dialog portal, pulltop reset ([530e886](https://github.com/SiaFoundation/web/commit/530e88647d194994f47b2f75d5f1214f0d458a00))
- site menu scroll top, visual tweaks ([30adfd1](https://github.com/SiaFoundation/web/commit/30adfd165793ffa8d36ae2e270f5198208b649c8))

### Features

- add grant committee ([a3e32e7](https://github.com/SiaFoundation/web/commit/a3e32e730f900d4f61eaa33efc503ce6241c0a49))
- dynamic website content ([052d81c](https://github.com/SiaFoundation/web/commit/052d81c77df79d998be043c7c713078a0d77410c))
- extract content path utils to env, add rss to asset server and nginx ([99dd3c1](https://github.com/SiaFoundation/web/commit/99dd3c160c39e0cad0c50d33a88caaa983ae791b))
- refine pull to letter ([44d9e37](https://github.com/SiaFoundation/web/commit/44d9e370b22a6d1002424746bf03a29abe1749d6))
- refine website and scale information, updates to grants program content ([c618f80](https://github.com/SiaFoundation/web/commit/c618f80ae3e7ecebb64bf1388703ad763481b828))

# [0.35.0](https://github.com/SiaFoundation/web/compare/design-system-0.34.0...design-system-0.35.0) (2022-09-29)

### Features

- grants page, dim animated panels, scale paragraphs ([8e0ab87](https://github.com/SiaFoundation/web/commit/8e0ab879edb71b8c9c7f3e40220e391ece1d4540))

# [0.34.0](https://github.com/SiaFoundation/web/compare/design-system-0.33.0...design-system-0.34.0) (2022-09-29)

### Features

- renter wallet, update renterd hooks ([219476f](https://github.com/SiaFoundation/web/commit/219476fe780ecf3da54f5684046176128ab8d6b2))
- renterd app, extract shared components ([0b3c9f3](https://github.com/SiaFoundation/web/commit/0b3c9f3e77803d0a2520ee6c5b8e08f4d4f12934))
- renterd file explorer, contracts, hosts, config ([ba5126a](https://github.com/SiaFoundation/web/commit/ba5126a4d2615bfd2a0ab338830c3d252477b2ec))
- send siacoin ([551d37c](https://github.com/SiaFoundation/web/commit/551d37cb785731e55949b43a389bda1c318a4580))

# [0.33.0](https://github.com/SiaFoundation/web/compare/design-system-0.32.0...design-system-0.33.0) (2022-09-07)

### Bug Fixes

- incorrect icon import ([ad85601](https://github.com/SiaFoundation/web/commit/ad856015d34522f6477e3052b8b3b1f10705f3c7))

### Features

- add numberfield with currency support, improve form components, build out storage dialogs ([7fa5d67](https://github.com/SiaFoundation/web/commit/7fa5d677586a886f7e22c901b4094253f982a0e0))
- build out contracts feature ([17ed1e5](https://github.com/SiaFoundation/web/commit/17ed1e56271df0ac14f6f247e84da65f4bcbc94b))
- dynamic chart tooltip date label, hostd dashboard date controlgroup ([9a15f02](https://github.com/SiaFoundation/web/commit/9a15f02fcdfccd15e0e5c529f4a86b0d55c72b1b))
- filter system and layout changes, contract filters ([08f919a](https://github.com/SiaFoundation/web/commit/08f919a492c47797d862eab5985e7cbbf3e913b0))
- hostd configuration, currency inputs, settings and privacy dialog, siacentral hooks ([0cc8bcc](https://github.com/SiaFoundation/web/commit/0cc8bcc2ab4057e7dbdc80aa3f06c06dfb0bd907))
- merge menu and settings, single address wallet, ip and hostname support ([bc1507a](https://github.com/SiaFoundation/web/commit/bc1507a4f10bc4d8b26b3152d264400c5d8d796f))
- migrate to radix gray ([d75d04f](https://github.com/SiaFoundation/web/commit/d75d04f0d32e7077c54fc1ad14d44ec6028ce71b))
- move grays to slate ([8c4d89e](https://github.com/SiaFoundation/web/commit/8c4d89e8f9466bc310d8c292c4956ea2ddef2ee1))
- safari support, datum card scroll, rename SwitchMulti, siacentral disabled support ([ac45299](https://github.com/SiaFoundation/web/commit/ac4529911960698c552edbc40c603f6872cb0525))
- wallet send feature, move balance to ChartXY, tweaks to system components ([f64e729](https://github.com/SiaFoundation/web/commit/f64e729d77c99d32dd2118ecb6bbdc4cb9bef832))

# [0.32.0](https://github.com/SiaFoundation/web/compare/design-system-0.31.1...design-system-0.32.0) (2022-08-09)

### Features

- hostd spike ([09f3fb2](https://github.com/SiaFoundation/web/commit/09f3fb2f9d7193d5a137d8a252c0a6566f15e2cb))

## [0.31.1](https://github.com/SiaFoundation/web/compare/design-system-0.31.0...design-system-0.31.1) (2022-07-18)

### Bug Fixes

- minor bugs ([a0c89ac](https://github.com/SiaFoundation/web/commit/a0c89aca0b11c0cd2d3b9577ac5741064c0162be))

# [0.31.0](https://github.com/SiaFoundation/web/compare/design-system-0.30.3...design-system-0.31.0) (2022-07-15)

### Features

- extract data components, spike siad ([a6f7159](https://github.com/SiaFoundation/web/commit/a6f71593796ed763486e2556104ea71598f0e208))
- extract explorer components ([f9a66f4](https://github.com/SiaFoundation/web/commit/f9a66f431d6e3cf38b65c8d5b23fe8b48b7576c5))
- spike on siad, align on bignumber ([da05988](https://github.com/SiaFoundation/web/commit/da0598867dcf56006ed912d21486a9ab6da4ab47))

## [0.30.3](https://github.com/SiaFoundation/web/compare/design-system-0.30.2...design-system-0.30.3) (2022-07-06)

## [0.30.2](https://github.com/SiaFoundation/web/compare/design-system-0.30.1...design-system-0.30.2) (2022-06-30)

### Bug Fixes

- site metadata ([9882bf8](https://github.com/SiaFoundation/web/commit/9882bf803f761944b9171175776df1676c1e1da1))

## [0.30.1](https://github.com/SiaFoundation/web/compare/design-system-0.30.0...design-system-0.30.1) (2022-06-30)

### Bug Fixes

- container 4 max width ([1ab3606](https://github.com/SiaFoundation/web/commit/1ab360676a0079ad3dd5c8145fea2a62fec6f75a))

# [0.30.0](https://github.com/SiaFoundation/web/compare/design-system-0.29.0...design-system-0.30.0) (2022-06-29)

### Features

- add metadata and link previews ([644862c](https://github.com/SiaFoundation/web/commit/644862ce0f86a9784577e3d42a8499da1f43a695))

# [0.29.0](https://github.com/SiaFoundation/web/compare/design-system-0.28.2...design-system-0.29.0) (2022-06-29)

### Features

- news feed ([95e433e](https://github.com/SiaFoundation/web/commit/95e433eca2c8f5144aeade3fb4a4468784aa1b15))

## [0.28.2](https://github.com/SiaFoundation/web/compare/design-system-0.28.1...design-system-0.28.2) (2022-06-28)

### Bug Fixes

- update dns config ([4adfde9](https://github.com/SiaFoundation/web/commit/4adfde9b14c18cdb79d8dc3597767930376de023))

## [0.28.1](https://github.com/SiaFoundation/web/compare/design-system-0.28.0...design-system-0.28.1) (2022-06-24)

### Bug Fixes

- column layout, disable spellcheck searchbar, responsive layouts, add to deploy ([227ea03](https://github.com/SiaFoundation/web/commit/227ea034fba40a89c004fc38f57120c2ae482c81))

# [0.28.0](https://github.com/SiaFoundation/web/compare/design-system-0.27.2...design-system-0.28.0) (2022-06-23)

### Features

- add embarcadero article, add career links ([c2c406e](https://github.com/SiaFoundation/web/commit/c2c406ee65cc7fb904c536e6223d9e0fdfbcc742))
- spike explorer v1 ([2985d8a](https://github.com/SiaFoundation/web/commit/2985d8abddce552a4f86e6f9a91b86096d815722))

## [0.27.2](https://github.com/SiaFoundation/web/compare/design-system-0.27.1...design-system-0.27.2) (2022-06-01)

## [0.27.1](https://github.com/SiaFoundation/web/compare/design-system-0.27.0...design-system-0.27.1) (2022-06-01)

# [0.27.0](https://github.com/SiaFoundation/web/compare/design-system-0.26.1...design-system-0.27.0) (2022-06-01)

### Features

- accordion variants ([1acf738](https://github.com/SiaFoundation/web/commit/1acf738db96b375f1a7ad557fc471374d334e7f7))

## [0.26.1](https://github.com/SiaFoundation/web/compare/design-system-0.26.0...design-system-0.26.1) (2022-05-26)

### Bug Fixes

- dialog onsubmit type ([f9e809c](https://github.com/SiaFoundation/web/commit/f9e809cf2d534977c73079143b86dab135f50d12))

# [0.26.0](https://github.com/SiaFoundation/web/compare/design-system-0.25.0...design-system-0.26.0) (2022-05-25)

### Bug Fixes

- dialog height change ([7cd0717](https://github.com/SiaFoundation/web/commit/7cd0717cf3e99f1e782725a0e238d3a4c9893580))

### Features

- combobox props ([2162a81](https://github.com/SiaFoundation/web/commit/2162a81c12e8fc73e8217419190d19e02cfa15e5))

# [0.25.0](https://github.com/SiaFoundation/web/compare/design-system-0.24.1...design-system-0.25.0) (2022-05-24)

### Bug Fixes

- build errors ([f9ba1bb](https://github.com/SiaFoundation/web/commit/f9ba1bb0d3fcc553502430bb4087cf66284a0eb7))
- contentproject line height ([c2cc32a](https://github.com/SiaFoundation/web/commit/c2cc32a52aab1e29cc1013ba220b0ed1a902924e))

### Features

- add external links to sitemenu ([f256083](https://github.com/SiaFoundation/web/commit/f256083238314a9b4e3bbfc31b495e3953afeac7))

## [0.24.1](https://github.com/SiaFoundation/web/compare/design-system-0.24.0...design-system-0.24.1) (2022-05-24)

### Bug Fixes

- comment ([6d1837b](https://github.com/SiaFoundation/web/commit/6d1837b99aaf3a65ede163407afa4529105ac375))

# [0.24.0](https://github.com/SiaFoundation/web/compare/design-system-0.23.0...design-system-0.24.0) (2022-05-23)

### Bug Fixes

- add comment ([96db370](https://github.com/SiaFoundation/web/commit/96db370c4ef92d252b33a5f0713583177ca1a0f3))
- appbackdrop motion prop, defaults off ([95aac39](https://github.com/SiaFoundation/web/commit/95aac39ceda13d177dce447a5a0877da51fe1f13))
- override scroll area table ([6a8eb88](https://github.com/SiaFoundation/web/commit/6a8eb88e97b3ae18161ed0e222e2e3ddcdbc2b80))
- remove unused code ([3079160](https://github.com/SiaFoundation/web/commit/30791602d7c7c220be7e9bd90c440d084866197c))
- remove unused menu components ([764fef1](https://github.com/SiaFoundation/web/commit/764fef16a3e38ec2ed07bfc9261b97941c693f6e))
- removed radius from scrollarea ([3ca4e09](https://github.com/SiaFoundation/web/commit/3ca4e09b3c6de71bac7d954bb2df4d6aa7e9881b))

### Features

- add combobox, update theme radio ([c2eeacb](https://github.com/SiaFoundation/web/commit/c2eeacb72b70807a4f76fd78808f5d8a434bd239))
- add web banner ([db076fa](https://github.com/SiaFoundation/web/commit/db076fa857117157f2baa1b579d576f70a920443))
- update dialog components ([889724e](https://github.com/SiaFoundation/web/commit/889724e47ad4ce97b834e9bd7937b033cb36b9f6))
- update react router link naming ([a7a5c29](https://github.com/SiaFoundation/web/commit/a7a5c29da28fe0999d12f26af2d749c02259a9b6))

# [0.24.0](https://github.com/SiaFoundation/web/compare/design-system-0.23.0...design-system-0.24.0) (2022-05-23)

### Bug Fixes

- add comment ([96db370](https://github.com/SiaFoundation/web/commit/96db370c4ef92d252b33a5f0713583177ca1a0f3))
- appbackdrop motion prop, defaults off ([95aac39](https://github.com/SiaFoundation/web/commit/95aac39ceda13d177dce447a5a0877da51fe1f13))
- override scroll area table ([6a8eb88](https://github.com/SiaFoundation/web/commit/6a8eb88e97b3ae18161ed0e222e2e3ddcdbc2b80))
- remove unused menu components ([764fef1](https://github.com/SiaFoundation/web/commit/764fef16a3e38ec2ed07bfc9261b97941c693f6e))
- removed radius from scrollarea ([3ca4e09](https://github.com/SiaFoundation/web/commit/3ca4e09b3c6de71bac7d954bb2df4d6aa7e9881b))

### Features

- add combobox, update theme radio ([c2eeacb](https://github.com/SiaFoundation/web/commit/c2eeacb72b70807a4f76fd78808f5d8a434bd239))
- add web banner ([db076fa](https://github.com/SiaFoundation/web/commit/db076fa857117157f2baa1b579d576f70a920443))
- update dialog components ([889724e](https://github.com/SiaFoundation/web/commit/889724e47ad4ce97b834e9bd7937b033cb36b9f6))
- update react router link naming ([a7a5c29](https://github.com/SiaFoundation/web/commit/a7a5c29da28fe0999d12f26af2d749c02259a9b6))

# [0.24.0](https://github.com/SiaFoundation/web/compare/design-system-0.23.0...design-system-0.24.0) (2022-05-20)

### Bug Fixes

- add comment ([96db370](https://github.com/SiaFoundation/web/commit/96db370c4ef92d252b33a5f0713583177ca1a0f3))
- appbackdrop motion prop, defaults off ([95aac39](https://github.com/SiaFoundation/web/commit/95aac39ceda13d177dce447a5a0877da51fe1f13))
- override scroll area table ([6a8eb88](https://github.com/SiaFoundation/web/commit/6a8eb88e97b3ae18161ed0e222e2e3ddcdbc2b80))
- remove unused menu components ([764fef1](https://github.com/SiaFoundation/web/commit/764fef16a3e38ec2ed07bfc9261b97941c693f6e))

### Features

- add combobox, update theme radio ([c2eeacb](https://github.com/SiaFoundation/web/commit/c2eeacb72b70807a4f76fd78808f5d8a434bd239))
- add web banner ([db076fa](https://github.com/SiaFoundation/web/commit/db076fa857117157f2baa1b579d576f70a920443))
- update react router link naming ([a7a5c29](https://github.com/SiaFoundation/web/commit/a7a5c29da28fe0999d12f26af2d749c02259a9b6))

# [0.24.0](https://github.com/SiaFoundation/web/compare/design-system-0.23.0...design-system-0.24.0) (2022-05-20)

### Bug Fixes

- override scroll area table ([6a8eb88](https://github.com/SiaFoundation/web/commit/6a8eb88e97b3ae18161ed0e222e2e3ddcdbc2b80))
- remove unused menu components ([764fef1](https://github.com/SiaFoundation/web/commit/764fef16a3e38ec2ed07bfc9261b97941c693f6e))

### Features

- add combobox, update theme radio ([c2eeacb](https://github.com/SiaFoundation/web/commit/c2eeacb72b70807a4f76fd78808f5d8a434bd239))
- add web banner ([db076fa](https://github.com/SiaFoundation/web/commit/db076fa857117157f2baa1b579d576f70a920443))
- update react router link naming ([a7a5c29](https://github.com/SiaFoundation/web/commit/a7a5c29da28fe0999d12f26af2d749c02259a9b6))

# [0.23.0](https://github.com/SiaFoundation/web/compare/design-system-0.22.3...design-system-0.23.0) (2022-05-10)

### Features

- add banners ([62f86be](https://github.com/SiaFoundation/web/commit/62f86be5e150734ed5fd15d8df9f08c0adc752d9))

## [0.22.3](https://github.com/SiaFoundation/web/compare/design-system-0.22.2...design-system-0.22.3) (2022-05-10)

### Bug Fixes

- log names, redirects ([13532ca](https://github.com/SiaFoundation/web/commit/13532cae6c862cd03231ed705cae7a6fdda840cf))

## [0.22.2](https://github.com/SiaFoundation/web/compare/design-system-0.22.1...design-system-0.22.2) (2022-05-10)

### Bug Fixes

- add public assets ([47b8555](https://github.com/SiaFoundation/web/commit/47b8555171c4486e9a8f984f0006e373ff1677d4))
- update server redirects ([304036c](https://github.com/SiaFoundation/web/commit/304036c69bd0b5158a46903e7731465a46e9f2fe))

## [0.22.1](https://github.com/SiaFoundation/web/compare/design-system-0.22.0...design-system-0.22.1) (2022-05-07)

### Bug Fixes

- system theme filters ([2f3ee14](https://github.com/SiaFoundation/web/commit/2f3ee1418edb5a4946c3e0744a903fcb7797eef0))

# [0.22.0](https://github.com/SiaFoundation/web/compare/design-system-0.21.1...design-system-0.22.0) (2022-05-06)

### Bug Fixes

- mobile scroll transitioning ([5182b2b](https://github.com/SiaFoundation/web/commit/5182b2b97c25dfa87116f313dc705b6534354a6b))

### Features

- radix scroll area ([ca4bd62](https://github.com/SiaFoundation/web/commit/ca4bd6262d46bdaad86a0fdcab59ab8c4131c9b0))

## [0.21.1](https://github.com/SiaFoundation/web/compare/design-system-0.21.0...design-system-0.21.1) (2022-05-06)

# [0.21.0](https://github.com/SiaFoundation/web/compare/design-system-0.20.0...design-system-0.21.0) (2022-05-05)

### Features

- sitemenu closes after any link click, link accepts onclick ([1b4481c](https://github.com/SiaFoundation/web/commit/1b4481c077915bd2a306d8e4a59d812b8ae16986))

# [0.20.0](https://github.com/SiaFoundation/web/compare/design-system-0.19.8...design-system-0.20.0) (2022-04-26)

### Bug Fixes

- add simple logo svg ([6503376](https://github.com/SiaFoundation/web/commit/65033765888872c44287265b168acff7cfe44ef1))
- layout transitions only for letter, site renders with no js ([703bacb](https://github.com/SiaFoundation/web/commit/703bacb76693e724b8b2f6dc45a54928d9b56b39))

### Features

- pull to top, streamline focus mode ([eb75917](https://github.com/SiaFoundation/web/commit/eb75917a945fc8d58159783b36279be96a0df3bf))

## [0.19.8](https://github.com/SiaFoundation/web/compare/design-system-0.19.7...design-system-0.19.8) (2022-04-21)

### Bug Fixes

- revert transition change ([fc3e36f](https://github.com/SiaFoundation/web/commit/fc3e36f6a38ca8d71d9a3e564595722753e23ea9))

## [0.19.7](https://github.com/SiaFoundation/web/compare/design-system-0.19.6...design-system-0.19.7) (2022-04-21)

### Bug Fixes

- remove page load transition, load on js disabled ([c458f0f](https://github.com/SiaFoundation/web/commit/c458f0f172d8eb39fdf862eb0373d7044a5a1feb))

## [0.19.6](https://github.com/SiaFoundation/web/compare/design-system-0.19.5...design-system-0.19.6) (2022-04-21)

### Bug Fixes

- no lazy loading above fold ([be081a5](https://github.com/SiaFoundation/web/commit/be081a5e59dbae4960a60b3852e17a0aac61031f))

## [0.19.5](https://github.com/SiaFoundation/web/compare/design-system-0.19.4...design-system-0.19.5) (2022-04-21)

### Bug Fixes

- lazy load all images ([e1875de](https://github.com/SiaFoundation/web/commit/e1875de0571dfc60ff184b01cf3f83af05782299))

## [0.19.4](https://github.com/SiaFoundation/web/compare/design-system-0.19.3...design-system-0.19.4) (2022-04-21)

### Bug Fixes

- lazy load background on mobile ([0d0c54b](https://github.com/SiaFoundation/web/commit/0d0c54bb86d1ec305a3df4f6e0b4994e04dc9b8f))

## [0.19.3](https://github.com/SiaFoundation/web/compare/design-system-0.19.2...design-system-0.19.3) (2022-04-20)

### Bug Fixes

- non next background images ([a681bf5](https://github.com/SiaFoundation/web/commit/a681bf5599e77391ec7d155ad8ced7cb7f3255fc))
- smaller texture files, only provide 1 format ([f937faa](https://github.com/SiaFoundation/web/commit/f937faae29976ef9f5065eea7e55366b9bd40e4c))

## [0.19.2](https://github.com/SiaFoundation/web/compare/design-system-0.19.1...design-system-0.19.2) (2022-04-18)

### Bug Fixes

- site layout initial render transition ([fe5b557](https://github.com/SiaFoundation/web/commit/fe5b55726a90ad8439bd784076de733ef9ffd8f0))

## [0.19.1](https://github.com/SiaFoundation/web/compare/design-system-0.19.0...design-system-0.19.1) (2022-04-14)

### Bug Fixes

- ssr global styles and fonts ([890787f](https://github.com/SiaFoundation/web/commit/890787ffa444eeed1ed5605c912853d884272ef0))

# [0.19.0](https://github.com/SiaFoundation/web/compare/design-system-0.18.2...design-system-0.19.0) (2022-04-12)

### Features

- support => docs.sia.tech ([b21141a](https://github.com/SiaFoundation/web/commit/b21141a57eedd43f42ab35d5efa397f072ee9e6e))

## [0.18.2](https://github.com/SiaFoundation/web/compare/design-system-0.18.1...design-system-0.18.2) (2022-04-08)

### Bug Fixes

- make app bar transparent ([cf12540](https://github.com/SiaFoundation/web/commit/cf12540d860872c6df21f67e9c71dfa5d6f58c3c))

## [0.18.1](https://github.com/SiaFoundation/web/compare/design-system-0.18.0...design-system-0.18.1) (2022-04-08)

### Bug Fixes

- include navbar in animation ordering ([4d2f297](https://github.com/SiaFoundation/web/commit/4d2f297c00312742baacb54210e3ff927eeb4313))

# [0.18.0](https://github.com/SiaFoundation/web/compare/design-system-0.17.0...design-system-0.18.0) (2022-04-08)

### Features

- dynamic width ([647ba9c](https://github.com/SiaFoundation/web/commit/647ba9c23617edee2c01099699eed73804651676))
- spike on mixed approach to landing letter ([b21c8b6](https://github.com/SiaFoundation/web/commit/b21c8b656f9605d00f73de2f06fee8df3cd432a3))

# [0.17.0](https://github.com/SiaFoundation/web/compare/design-system-0.16.0...design-system-0.17.0) (2022-04-06)

### Features

- animate reveal landing letter, background color for images ([d7b8f09](https://github.com/SiaFoundation/web/commit/d7b8f09cd4ff8936d0f2e1aa484ea32693b93d4f))

# [0.16.0](https://github.com/SiaFoundation/web/compare/design-system-0.15.0...design-system-0.16.0) (2022-04-06)

### Features

- move background image color filter into image data ([6efff00](https://github.com/SiaFoundation/web/commit/6efff00dbe6c35d6796dbda1e371b973e774eb52))

# [0.15.0](https://github.com/SiaFoundation/web/compare/design-system-0.14.0...design-system-0.15.0) (2022-04-05)

### Features

- add open graph and meta tags ([4dacce1](https://github.com/SiaFoundation/web/commit/4dacce1402d123e8b1378056bb029518a316efea))

# [0.14.0](https://github.com/SiaFoundation/web/compare/design-system-0.13.1...design-system-0.14.0) (2022-03-30)

### Bug Fixes

- button site variant, size on landing ([9dca048](https://github.com/SiaFoundation/web/commit/9dca048266bb94fc799bcc75405fdd6c0488887a))

### Features

- landing page, focused site layout ([716e4b0](https://github.com/SiaFoundation/web/commit/716e4b00d649fc1ca02f3bc40132dfd3af328e5b))

## [0.13.1](https://github.com/SiaFoundation/web/compare/design-system-0.13.0...design-system-0.13.1) (2022-03-30)

### Bug Fixes

- local backdrop plays on ios ([28c0294](https://github.com/SiaFoundation/web/commit/28c0294aa714cebfef6d7e38c2a01612b67ea312))

# [0.13.0](https://github.com/SiaFoundation/web/compare/design-system-0.12.0...design-system-0.13.0) (2022-03-30)

### Bug Fixes

- local backdrop video formats ([b547911](https://github.com/SiaFoundation/web/commit/b547911340a9f927b9345298c0bbafd80bad48c8))

### Features

- add team photos ([99f7bdd](https://github.com/SiaFoundation/web/commit/99f7bdd05f341c89231c5f6c94450e76fe1b02c7))

# [0.12.0](https://github.com/SiaFoundation/web/compare/design-system-0.11.8...design-system-0.12.0) (2022-03-29)

### Bug Fixes

- lint and errors ([d8dcc23](https://github.com/SiaFoundation/web/commit/d8dcc23c246774020f7f2aeddb3ff6d70d14d069))

### Features

- refactor design system variants/sizes, adjust site components ([88d5ebf](https://github.com/SiaFoundation/web/commit/88d5ebf5e9f9281dfe77b0cb2bfc84383372a61c))

## [0.11.8](https://github.com/SiaFoundation/web/compare/design-system-0.11.7...design-system-0.11.8) (2022-03-28)

### Bug Fixes

- code padding within text ([c1fcbe1](https://github.com/SiaFoundation/web/commit/c1fcbe1bcb66c3683f5de4902acf9aec30957ec5))

## [0.11.7](https://github.com/SiaFoundation/web/compare/design-system-0.11.6...design-system-0.11.7) (2022-03-28)

### Bug Fixes

- progress bar grays, text field total ghost read only outline ([07b3a55](https://github.com/SiaFoundation/web/commit/07b3a55b825e23eb295bf0aabda367923f1fc5a6))

## [0.11.6](https://github.com/SiaFoundation/web/compare/design-system-0.11.5...design-system-0.11.6) (2022-03-27)

### Bug Fixes

- adjust dropzone color ([46e94e0](https://github.com/SiaFoundation/web/commit/46e94e0e989150ab79555918c08e3167a924bbb5))
- remove site layout image hover ([eadfae6](https://github.com/SiaFoundation/web/commit/eadfae6415261ee93ee6bc53683b73b2c3552121))

## [0.11.5](https://github.com/SiaFoundation/web/compare/design-system-0.11.4...design-system-0.11.5) (2022-03-25)

### Bug Fixes

- site tweaks, button fix ([a2df25c](https://github.com/SiaFoundation/web/commit/a2df25cc91422eef5d2d37cc2d292c04d009458b))

## [0.11.4](https://github.com/SiaFoundation/web/compare/design-system-0.11.3...design-system-0.11.4) (2022-03-25)

### Bug Fixes

- button text wrap, container size, 18 font size ([239d2c2](https://github.com/SiaFoundation/web/commit/239d2c221bbb431b49be50a2e4fb69d8c70e5f29))

## [0.11.3](https://github.com/SiaFoundation/web/compare/design-system-0.11.2...design-system-0.11.3) (2022-03-25)

### Bug Fixes

- read only textfield outline, popover offset ([db6cd80](https://github.com/SiaFoundation/web/commit/db6cd80195445f8f2b7ff0b0c0ff4412ff59f8d2))

## [0.11.2](https://github.com/SiaFoundation/web/compare/design-system-0.11.1...design-system-0.11.2) (2022-03-25)

### Bug Fixes

- add variant to separator, justify theme menu ([437f63a](https://github.com/SiaFoundation/web/commit/437f63a00246834dbe7eb6e43083532f5d2c30c4))

## [0.11.1](https://github.com/SiaFoundation/web/compare/design-system-0.11.0...design-system-0.11.1) (2022-03-25)

### Bug Fixes

- padding theme menu ([2eed999](https://github.com/SiaFoundation/web/commit/2eed99976cd14e6cadf0b037b8abbeb5f7ff0f7e))

# [0.11.0](https://github.com/SiaFoundation/web/compare/design-system-0.10.0...design-system-0.11.0) (2022-03-25)

### Bug Fixes

- adjust separator variants ([35c597c](https://github.com/SiaFoundation/web/commit/35c597ceae3fa5dadf13ca9ecea65e9c68115962))
- menu cursor, progress height and color ([f2dd9fc](https://github.com/SiaFoundation/web/commit/f2dd9fc91ae7fad9517f8baef2d9bdf1d4eb39f7))
- refactor site specific styles, abstract site menu ([0015d78](https://github.com/SiaFoundation/web/commit/0015d7895b9b4af2ae5b6c5d430c71b48d94d937))

### Features

- add button 3, fix theme radio colors ([96093df](https://github.com/SiaFoundation/web/commit/96093df773070ddcaa27d9f4543a87f48bcd397d))

# [0.10.0](https://github.com/SiaFoundation/web/compare/design-system-0.9.1...design-system-0.10.0) (2022-03-22)

### Bug Fixes

- add size to simple logo ([646d02f](https://github.com/SiaFoundation/web/commit/646d02f605687d3432c88d28a1c67b62636d1f1a))
- tune borders and dialogs ([f008947](https://github.com/SiaFoundation/web/commit/f008947ddb89514720d5b76321ad43487e331e92))
- tweak borders, embarcadero fixes ([35d61a6](https://github.com/SiaFoundation/web/commit/35d61a6f9a92438b5f2e2e8b5105dad63ad83f9e))

### Features

- add panel radii ([55da3a5](https://github.com/SiaFoundation/web/commit/55da3a5c924507baae4e480b570cfd08662b917c))

## [0.9.1](https://github.com/SiaFoundation/web/compare/design-system-0.9.0...design-system-0.9.1) (2022-03-21)

### Bug Fixes

- content project logo sizing, site menu text sizing ([58d3295](https://github.com/SiaFoundation/web/commit/58d3295e839e7e74574ea524e6bf6c578d0e6872))
- set fixed width for logos ([8a9f3ff](https://github.com/SiaFoundation/web/commit/8a9f3ff0d16797fd9d3d646cf52db78e515a1eaa))
- set fonts display swap, remove metropolis ([01c6649](https://github.com/SiaFoundation/web/commit/01c66490a904a26851859dec1f1019143ad2fb5b))
- video backdrop start time deterministic, fix image prop warnings ([0791a07](https://github.com/SiaFoundation/web/commit/0791a078971e02511dd91861106be0bfd558a240))

# [0.9.0](https://github.com/SiaFoundation/web/compare/design-system-0.8.0...design-system-0.9.0) (2022-03-21)

### Features

- size logos, small fixes, dark mode, nate photos ([77e9cd8](https://github.com/SiaFoundation/web/commit/77e9cd8732058caa49cd96edbee9b3d7d8078b2e))

# [0.8.0](https://github.com/SiaFoundation/web/compare/design-system-0.7.0...design-system-0.8.0) (2022-03-21)

### Features

- add sized logos, add dithered backgrounds ([21d8771](https://github.com/SiaFoundation/web/commit/21d877138e271b4eef1ea4b8435bce9874a623d7))

# [0.7.0](https://github.com/SiaFoundation/web/compare/design-system-0.6.0...design-system-0.7.0) (2022-03-21)

### Features

- refactor design system vars ([34690b9](https://github.com/SiaFoundation/web/commit/34690b9675391d92b18a87a0d80b49d364e10bd3))

# [0.6.0](https://github.com/SiaFoundation/web/compare/design-system-0.5.4...design-system-0.6.0) (2022-03-17)

### Features

- system and website implementation ([4298e56](https://github.com/SiaFoundation/web/commit/4298e560b14e6749a35148a5b1156ee7e6d39c0e))
- update design system, reorg components ([e54126a](https://github.com/SiaFoundation/web/commit/e54126a6e34525df763329cf1406d07a514181e1))

## [0.5.4](https://github.com/SiaFoundation/web/compare/design-system-0.5.3...design-system-0.5.4) (2022-03-03)

### Bug Fixes

- set button line heights ([8e4224c](https://github.com/SiaFoundation/web/commit/8e4224cf44d29f06d7321075bd7605a576a4daca))

## [0.5.3](https://github.com/SiaFoundation/web/compare/design-system-0.5.2...design-system-0.5.3) (2022-03-03)

### Bug Fixes

- dropdown link items ([f10f3e0](https://github.com/SiaFoundation/web/commit/f10f3e011fa57b8a9f3c937f81029f6a5a156ea1))

## [0.5.2](https://github.com/SiaFoundation/web/compare/design-system-0.5.1...design-system-0.5.2) (2022-03-03)

## [0.5.1](https://github.com/SiaFoundation/web/compare/design-system-0.5.0...design-system-0.5.1) (2022-03-02)

### Bug Fixes

- update codeblock color ([a489b68](https://github.com/SiaFoundation/web/commit/a489b6865939225d463517047ac88b3c14d3c8e7))

# [0.5.0](https://github.com/SiaFoundation/web/compare/design-system-0.4.4...design-system-0.5.0) (2022-03-02)

### Features

- extract accent shadow colors ([4c3e28b](https://github.com/SiaFoundation/web/commit/4c3e28bc381233dd9569a43ec6c2aceae2592b01))

## [0.4.4](https://github.com/SiaFoundation/web/compare/design-system-0.4.3...design-system-0.4.4) (2022-03-02)

## [0.4.3](https://github.com/SiaFoundation/web/compare/design-system-0.4.2...design-system-0.4.3) (2022-03-02)

### Bug Fixes

- title type ReactNode ([d4262da](https://github.com/SiaFoundation/web/commit/d4262dab6e01f15171c3b185ba9f354c0d7d06e9))

## [0.4.2](https://github.com/SiaFoundation/web/compare/design-system-0.4.1...design-system-0.4.2) (2022-03-02)

### Bug Fixes

- upgrade local storage hook and add ssr option ([b46775c](https://github.com/SiaFoundation/web/commit/b46775c1e94b390273d911627fd8da3a1cec3e5f))

## [0.4.1](https://github.com/SiaFoundation/web/compare/design-system-0.4.0...design-system-0.4.1) (2022-03-02)

### Bug Fixes

- export Dropzone ([80d0278](https://github.com/SiaFoundation/web/commit/80d0278e04bc352647b7580563506fc1c47ca3ec))
- inline carbon icon types ([6b0d737](https://github.com/SiaFoundation/web/commit/6b0d737f82993d2b5bbb9ef3e8fd7b54e66b826a))
- move theme menu to carbon icons ([84cb240](https://github.com/SiaFoundation/web/commit/84cb240e6e3ca94d687353a5148e8d0323830b4e))
- move to carbon icon, adjust shadow ([261cec3](https://github.com/SiaFoundation/web/commit/261cec37fa12f39cb20aca7a4d745f9915e7cc65))
- user dropdown only shows theme separator if other content is present ([a62fc70](https://github.com/SiaFoundation/web/commit/a62fc7074e3f9c6b4a8813adf2cd9bf609d7d636))

# [0.4.0](https://github.com/SiaFoundation/web/compare/design-system-0.3.0...design-system-0.4.0) (2022-03-01)

### Bug Fixes

- adjust panel colors ([2a28a4e](https://github.com/SiaFoundation/web/commit/2a28a4e1af90ea7a4e35991889f1f9968688c621))
- panel colors ([42d64e3](https://github.com/SiaFoundation/web/commit/42d64e39ddc901380d1ec86498a5d5be6a12c7f0))

### Features

- add file dropzone component, add separator to user menu theme group ([94583ab](https://github.com/SiaFoundation/web/commit/94583ab5a7086a8cb3457069c058a9e21fd4ff2a))
- export carbon icons with types, deps ([a2b3d0f](https://github.com/SiaFoundation/web/commit/a2b3d0fc11b5564b40af02b29b2116d70d409062))

# [0.3.0](https://github.com/SiaFoundation/web/compare/design-system-0.2.0...design-system-0.3.0) (2022-03-01)

### Features

- generic name for primary and secondary colors ([b73922e](https://github.com/SiaFoundation/web/commit/b73922edd3499c1754cf143675b68297c84a779e))
- plex typography, carbon icons ([cf47264](https://github.com/SiaFoundation/web/commit/cf47264538a9def8ec258e84da82c56a504f6bb1))

# [0.2.0](https://github.com/SiaFoundation/web/compare/design-system-0.1.0...design-system-0.2.0) (2022-02-26)

### Features

- component changes based on website usage ([b9d9876](https://github.com/SiaFoundation/web/commit/b9d98769a3d4e6b92053e3fd7c2042ff58eab6fd))

# [0.1.0](https://github.com/SiaFoundation/web/compare/design-system-0.0.6...design-system-0.1.0) (2022-02-19)

### Bug Fixes

- fix image import ([6be5d3e](https://github.com/SiaFoundation/web/commit/6be5d3edb19a3d3f496504386d56dc534dcee08a))

### Features

- extract SiteLayout, add layout to website ([0bc51a9](https://github.com/SiaFoundation/web/commit/0bc51a9eca74b96bba57792e75a415ad1f3de7dd))
- spike on design direction ([3e58c30](https://github.com/SiaFoundation/web/commit/3e58c308a2ea84482048160cb35d1052586bc2be))

## [0.0.6](https://github.com/SiaFoundation/web/compare/design-system-0.0.5...design-system-0.0.6) (2022-02-16)

### Bug Fixes

- publish public folder ([79d7175](https://github.com/SiaFoundation/web/commit/79d71757da0e31289989d93966a7967a5fe579a2))

## [0.0.5](https://github.com/SiaFoundation/web/compare/design-system-0.0.4...design-system-0.0.5) (2022-02-15)

## [0.0.4](https://github.com/SiaFoundation/web/compare/design-system-0.0.3...design-system-0.0.4) (2022-02-15)

## [0.0.3](https://github.com/SiaFoundation/web/compare/design-system-0.0.2...design-system-0.0.3) (2022-02-15)

## [0.0.2](https://github.com/SiaFoundation/web/compare/design-system-0.0.1...design-system-0.0.2) (2022-02-15)

## 0.0.1 (2022-02-15)
