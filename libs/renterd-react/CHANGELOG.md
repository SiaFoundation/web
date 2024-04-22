# @siafoundation/renterd-react

## 4.2.1

### Patch Changes

- Updated dependencies [ae0e29b8]
  - @siafoundation/renterd-types@0.2.1

## 4.2.0

### Minor Changes

- 3a983801: Added a method for each known bus setting, in addition to the generic setting method.
- 3a983801: Added support for autopilot config evaluation.

### Patch Changes

- Updated dependencies [3a983801]
  - @siafoundation/renterd-types@0.2.0
  - @siafoundation/react-core@1.2.1

## 4.1.0

### Minor Changes

- 1b1952e5: Libraries now follow new naming scheme.

### Patch Changes

- Updated dependencies [1b1952e5]
- Updated dependencies [0d7249a4]
- Updated dependencies [d2180c11]
  - @siafoundation/react-core@1.2.0
  - @siafoundation/renterd-types@0.1.0

## 4.0.0

### Minor Changes

- 1053c506: Added useAccountResetDrift.

### Patch Changes

- Updated dependencies [e2b8f950]
  - @siafoundation/types@0.2.0

## 3.1.0

### Minor Changes

- 2190046c: Add useMultipartUploadCreate, useMultipartUploadComplete, useMultipartUploadAbort, useMultipartUploadAddPart, useMultipartUploadChunk, useMultipartUploadListUploads, useMultipartUploadListParts.

## 3.0.0

### Minor Changes

- 035f90e9: Add useHostResetLostSectorCount.

### Patch Changes

- Updated dependencies [40e402ad]
  - @siafoundation/react-core@1.1.0

## 2.1.0

### Minor Changes

- 021568d1: Added useObjectList.
- a4099d4b: useObjectDirectory now supports sortBy size.
- 443ade97: Added useObjectRename.

### Patch Changes

- b3e12c99: The package has been updated to use Next 14.
- Updated dependencies [b3e12c99]
  - @siafoundation/react-core@1.0.3
  - @siafoundation/types@0.1.3

## 2.0.3

### Patch Changes

- 4afab555: Deprecate the before and since query paramaters for transactions.

## 2.0.2

### Patch Changes

- Reconfigure rollup.
- Updated dependencies
  - @siafoundation/react-core@1.0.2
  - @siafoundation/types@0.1.2

## 2.0.1

### Patch Changes

- Preserve modules and directives.
- Updated dependencies
  - @siafoundation/react-core@1.0.1
  - @siafoundation/types@0.1.1

## 2.0.0

### Minor Changes

- d8528c8e: Package build and bundling has been updated.

### Patch Changes

- Updated dependencies [d8528c8e]
  - @siafoundation/react-core@1.0.0
  - @siafoundation/types@0.1.0

## 1.0.6

### Patch Changes

- e24c8935: esm support
- Updated dependencies [e24c8935]
  - @siafoundation/react-core@0.16.11
  - @siafoundation/types@0.0.7

## 0.12.0

### Minor Changes

- 55e1a99f: Update host interaction type casing.
- c9baf5e2: Add metrics APIs.
- c32dcae5: Updated the object partial slab response structure.

## 0.11.0

### Minor Changes

- eae7d2f7: useObjectDirectory now supports prefix filtering.
- 56aece36: useObjectDirectory now supports sortBy and sortDir.
- 57339114: useObjectStats now includes minHealth.

## 0.10.0

### Minor Changes

- 800c47d1: Add useBucket and useBucketPolicyUpdate.

## 0.9.0

### Minor Changes

- 2bd31cb4: Removed and updated deprecated route names.
- db21136e: Add useAutopilotTrigger.

## 0.8.1

### Patch Changes

- Updated dependencies [21972d75]
  - @siafoundation/react-core@0.15.0

## 0.8.0

### Minor Changes

- 569d94c3: Added useBuckets, useBucketCreate, useBucketDelete, and bucket support to all object hooks.

## 0.7.0

### Minor Changes

- 95c09e0e: Added useAlertsDismiss.

## 0.6.0

### Minor Changes

- 0ba92814: useObject now includes partialSlab.
- 8b69b770: Add useSlabObjects.
- 1ed477f0: Add useAutopilotState, useBusState, useWorkerState, remove useAutopilotStatus.

## 0.5.0

### Minor Changes

- ce199e51: Added useAlerts, renamed useHostsPubkey to useHost.
- c62ae09c: Add useWallet, remove useWalletBalance useWalletAddress.
- 6e87f6d0: Added batch flag to useObjectDelete.

## 0.4.0

### Minor Changes

- 234a40a8: The autopilot status endpoint has been removed.

## 0.3.0

### Minor Changes

- eef3a74: useContracts updated to use the /bus/contracts endpoint.

## 0.2.0

### Minor Changes

- d746281: Add useConsensusNetwork.
- 5059a85: useObjectDirectory updated for new response structure.
- d746281: Add useNetworkBlockHeight.
- d746281: The network block height is now estimated. renterd no longer uses SiaStats for anything so the 3rd party data privacy toggle has also been removed.

## 0.1.0

### Minor Changes

- 67d0113: The renterd React API now lives in renterd-react.
