# @siafoundation/renterd-js

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
