# @siafoundation/react-core

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
