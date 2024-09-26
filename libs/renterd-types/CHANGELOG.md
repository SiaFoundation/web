# @siafoundation/renterd-types

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
