# @siafoundation/renterd-types

## 0.18.0

### Minor Changes

- 55e41a9: Added system database backup APIs.

### Patch Changes

- Updated dependencies [a8e7956]
  - @siafoundation/react-core@8.2.0

## 0.17.5

### Patch Changes

- Updated dependencies [bd61c9e]
  - @siafoundation/types@0.13.0
  - @siafoundation/react-core@8.0.0

## 0.17.4

### Patch Changes

- e399659: Updated dependencies.
- Updated dependencies [ac3b587]
- Updated dependencies [e399659]
  - @siafoundation/react-core@7.0.0
  - @siafoundation/types@0.12.2

## 0.17.3

### Patch Changes

- 388a7f38: The library is now published in both ESM and CJS.
- Updated dependencies [388a7f38]
  - @siafoundation/react-core@6.0.1
  - @siafoundation/types@0.12.1

## 0.17.2

### Patch Changes

- Updated dependencies [3571359f]
- Updated dependencies [b57aee94]
- Updated dependencies [3571359f]
  - @siafoundation/types@0.12.0
  - @siafoundation/react-core@6.0.0

## 0.17.1

### Patch Changes

- Updated dependencies [ca620883]
- Updated dependencies [8a0a34c0]
- Updated dependencies [8a0a34c0]
- Updated dependencies [8a0a34c0]
- Updated dependencies [4f1fb6eb]
  - @siafoundation/types@0.11.0
  - @siafoundation/react-core@5.0.0

## 0.17.0

### Minor Changes

- 17d53d9b: Added v2Settings and v2SiamuxAddresses to Host.

### Patch Changes

- Updated dependencies [07bcec5e]
- Updated dependencies [2138d300]
- Updated dependencies [eb4b6a1f]
  - @siafoundation/react-core@4.0.0
  - @siafoundation/types@0.10.0

## 0.16.1

### Patch Changes

- Updated dependencies [cad48e35]
- Updated dependencies [ce20d281]
  - @siafoundation/types@0.9.0
  - @siafoundation/react-core@3.0.0

## 0.16.0

### Minor Changes

- a9f2cede: Added contract formation API.
- a9f2cede: Updated payloads for contract lock and release APIs.
- a9f2cede: Added new fields to Contract type.

### Patch Changes

- Updated dependencies [a8e77c6c]
- Updated dependencies [0bdf8534]
- Updated dependencies [70e57bf6]
- Updated dependencies [70e57bf6]
  - @siafoundation/types@0.8.1
  - @siafoundation/react-core@2.1.0

## 0.15.1

### Patch Changes

- Updated dependencies [ef647e54]
  - @siafoundation/types@0.8.0
  - @siafoundation/react-core@2.0.0

## 0.15.0

### Minor Changes

- 1434b2e8: Added the auth API.

### Patch Changes

- Updated dependencies [55524cb3]
- Updated dependencies [55524cb3]
  - @siafoundation/react-core@1.7.0

## 0.14.1

### Patch Changes

- b7e5ea12: Host and contract responses are now Nullable rather than Maybe, since empty responses return null.
- Updated dependencies [b7e5ea12]
  - @siafoundation/react-core@1.6.0

## 0.14.0

### Minor Changes

- c7ac7678: The object response has been updated in v2.

## 0.13.0

### Minor Changes

- afc1830a: Removed the allow redundant IPs setting.
- 7a7b0408: The host scanning API was moved from the worker to the bus. Closes https://github.com/SiaFoundation/renterd/issues/1644
- 6737374b: The configured boolean was removed from AutopilotState.
- 36b55f89: Moved HostSettings and HostPriceTable to core types.
- b8dd101b: Remove contract set list and update APIs.
- 5b7d6ae7: Add enabled flag to autopilot config type.
- cd4789d7: The contract total cost value is now called initial renter funds.
- 5b7d6ae7: Removed autopilots API.
- b8dd101b: Remove set from the autopilot config API.
- b8dd101b: Remove default contract set from config settings API.
- 5e7fedb9: Allowance was removed from autopilot contracts config API.
- 74f1f28f: The host checks field is now just HostAutopilotChecks.
- b8dd101b: Remove contractSets from contracts list API.
- b8dd101b: Add overall contract count metrics API.
- b8dd101b: Remove contractset param from worker multipart upload part API.
- 6c9adb00: The alerts data field is now full typed.
- b8dd101b: Remove the contract set contract churn metrics API.
- 5078fc02: The gouging settings no longer include hostBlockHeightLeeway or migrationSurchargeMultiplier.
- 74f1f28f: Autopilot config routes moved to the bus.
- 74f1f28f: Removed the autopilotID parameter from the hosts API.
- b8dd101b: Remove the contract set contract count metrics API.
- 5e7fedb9: The autopilots key was removed from the pinned settings API.

### Patch Changes

- dfde6e1c: Fixed missing fields and structure of bus and autopilot state types.
- Updated dependencies [36b55f89]
  - @siafoundation/types@0.7.0

## 0.12.0

### Minor Changes

- ae5aeec9: Added consensus network API.

## 0.11.0

### Minor Changes

- 9277382b: The alerts API limit and skip params are now optional.

### Patch Changes

- Updated dependencies [56974bbf]
- Updated dependencies [56974bbf]
- Updated dependencies [56974bbf]
  - @siafoundation/react-core@1.5.0

## 0.10.0

### Minor Changes

- ee6e18ce: All query parameters are now lowercased for API consistency.

## 0.9.0

### Minor Changes

- 5bfdb01e: The single object and list APIs routes have been updated.
- 7a333ffd: Updated to the new objects remove API.
- 7a333ffd: Adjusted the name of the objects rename API.

## 0.8.0

### Minor Changes

- 32363a16: Removed deprecated object search and object directory APIs.
- 64d82fc3: Removed deprecated wallet transactions and pending transactions APIs.
- 32363a16: Updated the multipart upload APIs with the new payloads.
- 978b70aa: Added the bus list autopilots API.
- ac703a94: Removed deprecated setting APIs.
- ac703a94: Added new strong settings APIs.
- 978b70aa: Added new combined hosts API.
- 0721586a: The list objects API now includes a slabEncryptionKey parameter.
- 64d82fc3: Added wallet events and pending events APIs.
- 64d82fc3: Removed deprecated wallet discard, fund, sign, and outputs APIs.
- ac703a94: The bus state API now includes daemon configured explorer.
- 0721586a: The list objects API bucket parameter is now optional, and bucket is returned in in the object metadata.
- 978b70aa: Removed deprecated search hosts and autopilot hosts APIs.

## 0.7.0

### Minor Changes

- a8c22bbe: The account reset drift API was moved from bus to worker. Closes https://github.com/SiaFoundation/web/issues/704
- a7ff93e9: Min recent scan failures is now max consecutive scan failures. Relates to https://github.com/SiaFoundation/renterd/pull/1482
- 49cd9db1: Remove deprecated hosts API. Relates to https://github.com/SiaFoundation/renterd/pull/1484
- 81d374f4: Added the wallet send API.

### Patch Changes

- 81d374f4: Fixed the route for the recommended fee API.
- Updated dependencies [5f34c9a6]
- Updated dependencies [8be86046]
- Updated dependencies [5f34c9a6]
  - @siafoundation/react-core@1.4.0

## 0.6.1

### Patch Changes

- Updated dependencies [04b45f7d]
  - @siafoundation/types@0.6.0

## 0.6.0

### Minor Changes

- 186e17a6: Max RPC price is no longer pinnable.

## 0.5.0

### Minor Changes

- 09871542: Updated the pricepinning configuration structure to support multiple autopilots. Closes https://github.com/SiaFoundation/renterd/issues/1448

## 0.4.0

### Minor Changes

- bffe101c: Add price pinning configuration API.
- ce89b99a: Added support for the new network naming scheme and the anagami testnet.

### Patch Changes

- Updated dependencies [a6c956ea]
- Updated dependencies [a64f40cc]
- Updated dependencies [a6c956ea]
  - @siafoundation/react-core@1.3.0
  - @siafoundation/types@0.5.0

## 0.3.0

### Minor Changes

- 802e45c0: Added the contracts prunable API.
- 802e45c0: Added the contract size API.

### Patch Changes

- Updated dependencies [24b47560]
  - @siafoundation/types@0.4.0

## 0.2.2

### Patch Changes

- Updated dependencies [fff7febd]
  - @siafoundation/types@0.3.0

## 0.2.1

### Patch Changes

- ae0e29b8: Fixed an issue where objectUpload only supported the browser File data type. Closes https://github.com/SiaFoundation/web/issues/591

## 0.2.0

### Minor Changes

- 3a983801: Added support for autopilot config evaluation.

## 0.1.0

### Minor Changes

- d2180c11: Introduced new library for renterd types.
