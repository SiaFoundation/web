# @siafoundation/indexd-types

## 0.16.0

### Minor Changes

- b9fbb89: Added account update API.
- 6c275d1: Added contract delete API.
- 51c4840: Expanded account stats response with active, pinnedData, and pinnedSize fields.
- aa56baa: Expanded sector stats response with lost, checked, and checkFailed fields.

## 0.15.0

### Minor Changes

- 8dfbe56: Added hostkey filter param to hosts and contracts APIs.
- 7d8c765: Added reset lost sectors API.
- 91ce574: Added account slabs prune API.
- 4c3d1df: Added stats/hosts API.
- ffdd92d: Added connect key stats API.

## 0.14.0

### Minor Changes

- 76ee23f: Removed serviceAccount, as it is no longer supplied. Closes https://github.com/SiaFoundation/indexd/issues/794

## 0.13.0

### Minor Changes

- cc7a716: Added fundTargetBytes to quota management.

## 0.12.0

### Minor Changes

- 9567a4e: Added quota types and updated connect key payloads to reference quotas.

## 0.11.0

### Minor Changes

- da46c3e: Added consensus APIs.

## 0.10.0

### Minor Changes

- 26c718f: Added serviceaccount and connectkey to admin accounts API.
- 8701eee: Added Host location typings.
- 15f073b: Added sort parameters to contracts and hosts APIs.

### Patch Changes

- a213105: Updated blocklist types with reasons array.
- a213105: Added new fields to Account and ConnectKey.

## 0.9.0

### Minor Changes

- 543df1d: Added contract stats API.
- 543df1d: Updated the sector stats key names.

## 0.8.0

### Minor Changes

- 094ac33: Added new sector and account stats APIs.
- 8d67d8e: Added account and alert by ID APIs.

## 0.7.0

### Minor Changes

- 19650c8: Added connect key API.

## 0.6.0

### Minor Changes

- 86c8e35: Updated numSectors to numSlabs.

## 0.5.0

### Minor Changes

- d2d4a81: The accounts response is now account objects with more fields.

## 0.4.0

### Minor Changes

- 3b0183d: Added explorer config to state response.
- 174f989: Added stats sector API.
- feb07e3: Added connect key APIs.
- baa83d1: Add alerts APIs.

## 0.3.0

### Minor Changes

- 4982f21: Added all app APIs.

## 0.2.0

### Minor Changes

- bd61c9e: Updated the protocol version type to include both formats and added a helper function.

### Patch Changes

- Updated dependencies [bd61c9e]
  - @siafoundation/types@0.13.0

## 0.1.0

### Minor Changes

- ab9214e: Added admin APIs and types.

### Patch Changes

- e399659: Updated dependencies.
- Updated dependencies [e399659]
  - @siafoundation/types@0.12.2
