# @siafoundation/renterd-js

## 0.14.7

### Patch Changes

- e399659: Updated dependencies.
- Updated dependencies [e399659]
  - @siafoundation/renterd-types@0.17.4
  - @siafoundation/request@0.3.2

## 0.14.6

### Patch Changes

- 388a7f38: The library is now published in both ESM and CJS.
- Updated dependencies [388a7f38]
  - @siafoundation/renterd-types@0.17.3
  - @siafoundation/request@0.3.1

## 0.14.5

### Patch Changes

- @siafoundation/renterd-types@0.17.2

## 0.14.4

### Patch Changes

- @siafoundation/renterd-types@0.17.1

## 0.14.3

### Patch Changes

- Updated dependencies [03a50151]
  - @siafoundation/request@0.3.0

## 0.14.2

### Patch Changes

- Updated dependencies [17d53d9b]
  - @siafoundation/renterd-types@0.17.0

## 0.14.1

### Patch Changes

- @siafoundation/renterd-types@0.16.1

## 0.14.0

### Minor Changes

- a9f2cede: Added contract formation API.
- a9f2cede: Updated payloads for contract lock and release APIs.
- a9f2cede: Added new fields to Contract type.

### Patch Changes

- Updated dependencies [a9f2cede]
- Updated dependencies [a9f2cede]
- Updated dependencies [a9f2cede]
  - @siafoundation/renterd-types@0.16.0

## 0.13.1

### Patch Changes

- @siafoundation/renterd-types@0.15.1

## 0.13.0

### Minor Changes

- 1434b2e8: Added the auth API.

### Patch Changes

- Updated dependencies [1434b2e8]
  - @siafoundation/renterd-types@0.15.0

## 0.12.2

### Patch Changes

- Updated dependencies [b7e5ea12]
  - @siafoundation/renterd-types@0.14.1

## 0.12.1

### Patch Changes

- Updated dependencies [c7ac7678]
  - @siafoundation/renterd-types@0.14.0

## 0.12.0

### Minor Changes

- afc1830a: Removed the allow redundant IPs setting.
- 7a7b0408: The host scanning API was moved from the worker to the bus. Closes https://github.com/SiaFoundation/renterd/issues/1644
- 6737374b: The configured boolean was removed from AutopilotState.
- b8dd101b: Remove contract set list and update APIs.
- 5b7d6ae7: Add enabled flag to autopilot config type.
- cd4789d7: The contract total cost value is now called initial renter funds.
- 5b7d6ae7: Removed autopilots API.
- b8dd101b: Remove set from the autopilot config API.
- b8dd101b: Remove default contract set from config settings API.
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

### Patch Changes

- dfde6e1c: Fixed missing fields and structure of bus and autopilot state types.
- Updated dependencies [afc1830a]
- Updated dependencies [7a7b0408]
- Updated dependencies [6737374b]
- Updated dependencies [36b55f89]
- Updated dependencies [b8dd101b]
- Updated dependencies [5b7d6ae7]
- Updated dependencies [cd4789d7]
- Updated dependencies [5b7d6ae7]
- Updated dependencies [b8dd101b]
- Updated dependencies [b8dd101b]
- Updated dependencies [dfde6e1c]
- Updated dependencies [5e7fedb9]
- Updated dependencies [74f1f28f]
- Updated dependencies [b8dd101b]
- Updated dependencies [b8dd101b]
- Updated dependencies [b8dd101b]
- Updated dependencies [6c9adb00]
- Updated dependencies [b8dd101b]
- Updated dependencies [5078fc02]
- Updated dependencies [74f1f28f]
- Updated dependencies [74f1f28f]
- Updated dependencies [b8dd101b]
- Updated dependencies [5e7fedb9]
  - @siafoundation/renterd-types@0.13.0

## 0.11.0

### Minor Changes

- ae5aeec9: Added consensus network API.

### Patch Changes

- Updated dependencies [ae5aeec9]
  - @siafoundation/renterd-types@0.12.0

## 0.10.1

### Patch Changes

- Updated dependencies [9277382b]
  - @siafoundation/renterd-types@0.11.0

## 0.10.0

### Minor Changes

- ee6e18ce: All query parameters are now lowercased for API consistency.

### Patch Changes

- Updated dependencies [ee6e18ce]
  - @siafoundation/renterd-types@0.10.0

## 0.9.0

### Minor Changes

- 5bfdb01e: The single object and list APIs routes have been updated.
- 7a333ffd: Updated to the new objects remove API.
- 7a333ffd: Adjusted the name of the objects rename API.

### Patch Changes

- Updated dependencies [5bfdb01e]
- Updated dependencies [7a333ffd]
- Updated dependencies [7a333ffd]
  - @siafoundation/renterd-types@0.9.0

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

### Patch Changes

- Updated dependencies [32363a16]
- Updated dependencies [64d82fc3]
- Updated dependencies [32363a16]
- Updated dependencies [978b70aa]
- Updated dependencies [ac703a94]
- Updated dependencies [ac703a94]
- Updated dependencies [978b70aa]
- Updated dependencies [0721586a]
- Updated dependencies [64d82fc3]
- Updated dependencies [64d82fc3]
- Updated dependencies [ac703a94]
- Updated dependencies [0721586a]
- Updated dependencies [978b70aa]
  - @siafoundation/renterd-types@0.8.0

## 0.7.0

### Minor Changes

- a8c22bbe: The account reset drift API was moved from bus to worker. Closes https://github.com/SiaFoundation/web/issues/704
- 49cd9db1: Remove deprecated hosts API. Relates to https://github.com/SiaFoundation/renterd/pull/1484
- 81d374f4: Added the wallet send API.

### Patch Changes

- 81d374f4: Fixed the route for the recommended fee API.
- Updated dependencies [a8c22bbe]
- Updated dependencies [a7ff93e9]
- Updated dependencies [49cd9db1]
- Updated dependencies [81d374f4]
- Updated dependencies [81d374f4]
  - @siafoundation/renterd-types@0.7.0

## 0.6.1

### Patch Changes

- @siafoundation/renterd-types@0.6.1

## 0.6.0

### Minor Changes

- 186e17a6: Max RPC price is no longer pinnable.

### Patch Changes

- Updated dependencies [186e17a6]
  - @siafoundation/renterd-types@0.6.0

## 0.5.0

### Minor Changes

- 09871542: Updated the pricepinning configuration structure to support multiple autopilots. Closes https://github.com/SiaFoundation/renterd/issues/1448

### Patch Changes

- Updated dependencies [09871542]
  - @siafoundation/renterd-types@0.5.0

## 0.4.0

### Minor Changes

- bffe101c: Add price pinning configuration API.

### Patch Changes

- Updated dependencies [bffe101c]
- Updated dependencies [ce89b99a]
  - @siafoundation/renterd-types@0.4.0

## 0.3.0

### Minor Changes

- 802e45c0: Added the contracts prunable API.
- 802e45c0: Added the contract size API.

### Patch Changes

- Updated dependencies [802e45c0]
- Updated dependencies [802e45c0]
  - @siafoundation/renterd-types@0.3.0

## 0.2.2

### Patch Changes

- @siafoundation/renterd-types@0.2.2

## 0.2.1

### Patch Changes

- Updated dependencies [ae0e29b8]
  - @siafoundation/renterd-types@0.2.1

## 0.2.0

### Minor Changes

- 3a983801: Added a method for each known bus setting, in addition to the generic setting method.
- 3a983801: Added support for autopilot config evaluation.

### Patch Changes

- 3a983801: Fixed a typo in the naming of the config method.
- Updated dependencies [3a983801]
- Updated dependencies [3a983801]
  - @siafoundation/request@0.2.0
  - @siafoundation/renterd-types@0.2.0

## 0.1.1

### Patch Changes

- aa118f29: Fixed an issue with upload and download content type and encoding. Closes https://github.com/SiaFoundation/web/issues/591

## 0.1.0

### Minor Changes

- 7b1f4669: Introduced a new renterd-js library. Closes https://github.com/SiaFoundation/web/issues/585

### Patch Changes

- Updated dependencies [b3a08031]
- Updated dependencies [d2180c11]
  - @siafoundation/request@0.1.0
  - @siafoundation/renterd-types@0.1.0
