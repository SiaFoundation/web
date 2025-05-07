# @siafoundation/walletd-types

## 0.6.3-beta.1

### Patch Changes

- Updated dependencies
  - @siafoundation/types@0.11.0-beta.1

## 0.6.3-beta.0

### Patch Changes

- The library is now published in both ESM and CJS.
- Updated dependencies
  - @siafoundation/types@0.10.1-beta.0

## 0.6.2

### Patch Changes

- Updated dependencies [eb4b6a1f]
  - @siafoundation/types@0.10.0

## 0.6.1

### Patch Changes

- Updated dependencies [cad48e35]
- Updated dependencies [ce20d281]
  - @siafoundation/types@0.9.0

## 0.6.0

### Minor Changes

- 54570123: Added construct APIs for both v1 and v2 transactions.
- 54570123: Added the basis ChainIndex parameter to txpool broadcast API.
- 54570123: Added the basis ChainIndex parameter to fund APIs.
- 54570123: Added the basis ChainIndex value to txpool transactions response.

### Patch Changes

- 97727dac: Updated the response structure for outputs APIs.
- Updated dependencies [ef647e54]
  - @siafoundation/types@0.8.0

## 0.5.1

### Patch Changes

- Updated dependencies [36b55f89]
  - @siafoundation/types@0.7.0

## 0.5.0

### Minor Changes

- d794e604: The syncer peers response type updated to include address rather than addr.

## 0.4.1

### Patch Changes

- Updated dependencies [04b45f7d]
  - @siafoundation/types@0.6.0

## 0.4.0

### Minor Changes

- a64f40cc: Core Event types have been moved to the core types library. Closes https://github.com/SiaFoundation/hostd/issues/440

### Patch Changes

- Updated dependencies [a64f40cc]
  - @siafoundation/types@0.5.0

## 0.3.2

### Patch Changes

- Updated dependencies [24b47560]
  - @siafoundation/types@0.4.0

## 0.3.1

### Patch Changes

- 4806f299: Fixed a few inaccuracies in the event data types. Closes https://github.com/SiaFoundation/walletd/issues/141

## 0.3.0

### Minor Changes

- fff7febd: Wallet events have been updated to use the new types and data format. Closes https://github.com/SiaFoundation/walletd/issues/134
- fff7febd: Added wallet events unconfirmed API, removed wallet txpool API.

### Patch Changes

- Updated dependencies [fff7febd]
  - @siafoundation/types@0.3.0

## 0.2.0

### Minor Changes

- 0e393885: Updated wallet events to include maturityHeight and renamed val to data. Closes https://github.com/SiaFoundation/walletd/issues/114

## 0.1.1

### Patch Changes

- 8769bf7a: Organized walletd types and constants.

## 0.1.0

### Minor Changes

- 0456e4b0: Introduced new library for walletd types.
