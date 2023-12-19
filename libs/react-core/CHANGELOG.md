# @siafoundation/react-core

## 0.16.4

### Patch Changes

- 4294302f: Adjust packaging.
- Updated dependencies [4294302f]
  - @siafoundation/next@0.0.2

## 0.16.0

### Minor Changes

- d0c8a592: Refactored internal dependencies.

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
- 67d0113: The renterd React API now lives in react-renterd.

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
