# @siafoundation/react-core

## 4.0.1

### Patch Changes

- Updated dependencies [03a50151]
  - @siafoundation/request@0.3.0

## 4.0.0

### Minor Changes

- 07bcec5e: Exchange rate and other external data hooks now live in the design-system.
- 2138d300: AppSettings no longer has a siaCentral settings.

### Patch Changes

- Updated dependencies [eb4b6a1f]
  - @siafoundation/types@0.10.0

## 3.0.0

### Patch Changes

- Updated dependencies [cad48e35]
- Updated dependencies [ce20d281]
  - @siafoundation/types@0.9.0
  - @siafoundation/units@3.3.4

## 2.1.0

### Minor Changes

- 0bdf8534: Added optional API parameter for exchange rates.
- 70e57bf6: User currency preference now sets a cookie.
- 70e57bf6: User currency preference stored in local storage can now initialize and server-render with an optional fallback data value.

### Patch Changes

- Updated dependencies [a8e77c6c]
  - @siafoundation/types@0.8.1
  - @siafoundation/units@3.3.3

## 2.0.0

### Patch Changes

- Updated dependencies [ef647e54]
  - @siafoundation/types@0.8.0
  - @siafoundation/units@3.3.2

## 1.8.0

### Minor Changes

- 0d7fdf2e: Updated the list of currencies to those supported by explored.

### Patch Changes

- @siafoundation/units@3.3.1

## 1.7.0

### Minor Changes

- 55524cb3: Added useThrottledStateMap.
- 55524cb3: Added `throttle`, often useful for mutation callbacks.

## 1.6.0

### Minor Changes

- b7e5ea12: Added maybeFromNullishArrayResponse for casting null empty array responses to [].

## 1.5.0

### Minor Changes

- 56974bbf: Migrated all settings interaction to the more specific requestSettings.
- 56974bbf: Hooks keys are now a two element array that includes the request method. This fixes an issue where hooks using the same route on different methods could conflict. The mutation matcher still uses the route string without any method information.
- 56974bbf: Removed the unused standalone option.

## 1.4.0

### Minor Changes

- 5f34c9a6: Added support for detecting and exposing daemon explorer via AppSettings. Closes https://github.com/SiaFoundation/web/issues/690
- 8be86046: Exchange rate hooks were moved from design-system to react-core.
- 5f34c9a6: Refactored AppSettings into a RequestSettings and an ExternalData provider, the providers can be used directly or via a composite AppSettings provider for backwards compatibility.

### Patch Changes

- Updated dependencies [5c0df06e]
- Updated dependencies [8be86046]
- Updated dependencies [d5dc0f86]
  - @siafoundation/units@3.2.0

## 1.3.0

### Minor Changes

- a6c956ea: App setting allowCustomApi is now more accurately named loginWithCustomApi.
- a6c956ea: The network block height calculation methods have been moved to the units
  package.

## 1.2.1

### Patch Changes

- Updated dependencies [3a983801]
  - @siafoundation/request@0.2.0

## 1.2.0

### Minor Changes

- 1b1952e5: Libraries now follow new naming scheme.
- 0d7249a4: Peer dependencies now limited to react and next.

### Patch Changes

- Updated dependencies [b3a08031]
  - @siafoundation/request@0.1.0

## 1.1.0

### Minor Changes

- 40e402ad: Hook request functions now return headers.

## 1.0.3

### Patch Changes

- b3e12c99: The package has been updated to use Next 14.
- Updated dependencies [b3e12c99]
  - @siafoundation/next@0.1.3

## 1.0.2

### Patch Changes

- Reconfigure rollup.
- Updated dependencies
  - @siafoundation/next@0.1.2

## 1.0.1

### Patch Changes

- Preserve modules and directives.
- Updated dependencies
  - @siafoundation/next@0.1.1

## 1.0.0

### Minor Changes

- d8528c8e: Package build and bundling has been updated.

### Patch Changes

- Updated dependencies [d8528c8e]
  - @siafoundation/next@0.1.0

## 0.16.11

### Patch Changes

- e24c8935: esm support
- Updated dependencies [e24c8935]
  - @siafoundation/next@0.0.6

## 0.15.0

### Minor Changes

- 21972d75: Request hooks now have a standalone option that allows them to revalidate under a unique key.

## 0.14.0

### Minor Changes

- c3d93283: Added useTryUntil.
- c3d93283: Add useSiaCentralHosts.

## 0.13.0

### Minor Changes

- 8cd442b4: Added a global swr mutate function.

## 0.12.0

### Minor Changes

- e74d48cc: Currency options now include AUD.

## 0.11.0

### Minor Changes

- 000db6a6: Currency options now include CAD, AUS, RUB, and CNY.
- 1a75c14b: Added usePatch request APIs.

## 0.10.0

### Minor Changes

- fef9e82: usePut and useDelete now include default data transform in after mutators.

## 0.9.0

### Minor Changes

- fa57fe6: All swr hooks now properly bubble up detailed error messages.
- fa57fe6: The mutation after callback now has a default cache data update function.
- 4585fb0: Added usePutSwr.

## 0.8.0

### Minor Changes

- 30493f4: useSettingUpdate now automatically revalidates any corresponding useSetting hooks.
- 2a0a714: The revalidation dependencies have been refactored into a more extensible after function.
- 2a0a714: Add generic workflow tracking provider.
- 67d0113: The renterd React API now lives in renterd-react.

## 0.7.0

### Minor Changes

- d2a06af: Remove useSettingsUpdate because PUT /settings has been removed.

## 0.6.0

### Minor Changes

- ceb56a8: Add usePostSwr post-based swr hook, align naming convention.
- ceb56a8: Add useHostsSearch, useHostsBlocklist, useHostsAllowlist, useHostsBlocklistUpdate, useHostsAllowlistUpdate API hooks.
- fec2c6d: Add useAutopilotHostsSearch and useObjectSearch renterd hooks.

## 0.5.0

### Minor Changes

- 6c6c058: AppSettings now has a password protected hooks mode.
- ff1bbef: Add useSettingsUpdate hook for PUT /settings.

## 0.4.0

### Minor Changes

- 3b1db65: Request hooks have been overhauled, they now support configuring parameters such as base API at call time, implementation, and via app settings.
- 77220ad: Added react hooks for interacting with renterd bus and autopilot APIs.
- a7bfe11: The core library now includes a React hook for the Sia Central metrics API.
- f96683e: useGetExternal functionality was merged into useGet.
