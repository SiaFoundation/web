# @siafoundation/react-renterd

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

- 67d0113: The renterd React API now lives in react-renterd.
