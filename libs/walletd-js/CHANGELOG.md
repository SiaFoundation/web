# @siafoundation/walletd-js

## 0.4.1

### Patch Changes

- @siafoundation/walletd-types@0.7.1

## 0.4.0

### Minor Changes

- d4571173: Added the address output APIs.
- 4aba20b2: Elements returned by unspent outputs endpoints now include the number of confirmations.
- aeb95460: The transaction pool broadcast API now returns the full transaction set.

### Patch Changes

- Updated dependencies [d4571173]
- Updated dependencies [4aba20b2]
- Updated dependencies [aeb95460]
  - @siafoundation/walletd-types@0.7.0

## 0.3.3

### Patch Changes

- Updated dependencies [03a50151]
  - @siafoundation/request@0.3.0

## 0.3.2

### Patch Changes

- @siafoundation/walletd-types@0.6.2

## 0.3.1

### Patch Changes

- @siafoundation/walletd-types@0.6.1

## 0.3.0

### Minor Changes

- 54570123: Added construct APIs for both v1 and v2 transactions.
- 54570123: Added the basis ChainIndex parameter to txpool broadcast API.
- 54570123: Added the basis ChainIndex parameter to fund APIs.
- 54570123: Added the basis ChainIndex value to txpool transactions response.

### Patch Changes

- 97727dac: Updated the response structure for outputs APIs.
- Updated dependencies [54570123]
- Updated dependencies [54570123]
- Updated dependencies [54570123]
- Updated dependencies [54570123]
- Updated dependencies [97727dac]
  - @siafoundation/walletd-types@0.6.0

## 0.2.6

### Patch Changes

- @siafoundation/walletd-types@0.5.1

## 0.2.5

### Patch Changes

- Updated dependencies [d794e604]
  - @siafoundation/walletd-types@0.5.0

## 0.2.4

### Patch Changes

- @siafoundation/walletd-types@0.4.1

## 0.2.3

### Patch Changes

- Updated dependencies [a64f40cc]
  - @siafoundation/walletd-types@0.4.0

## 0.2.2

### Patch Changes

- @siafoundation/walletd-types@0.3.2

## 0.2.1

### Patch Changes

- 4806f299: Fixed a few inaccuracies in the event data types. Closes https://github.com/SiaFoundation/walletd/issues/141
- Updated dependencies [4806f299]
  - @siafoundation/walletd-types@0.3.1

## 0.2.0

### Minor Changes

- fff7febd: Wallet events have been updated to use the new types and data format. Closes https://github.com/SiaFoundation/walletd/issues/134
- fff7febd: Added wallet events unconfirmed API, removed wallet txpool API.

### Patch Changes

- Updated dependencies [fff7febd]
- Updated dependencies [fff7febd]
  - @siafoundation/walletd-types@0.3.0

## 0.1.1

### Patch Changes

- Updated dependencies [0e393885]
  - @siafoundation/walletd-types@0.2.0

## 0.1.0

### Minor Changes

- 8769bf7a: Introduced a new walletd-js library.

### Patch Changes

- 8769bf7a: Organized walletd types and constants.
- Updated dependencies [8769bf7a]
  - @siafoundation/walletd-types@0.1.1
