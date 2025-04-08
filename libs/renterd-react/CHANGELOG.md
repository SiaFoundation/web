# @siafoundation/renterd-react

## 4.15.3

### Patch Changes

- @siafoundation/react-core@4.0.1
- @siafoundation/units@3.4.1

## 4.15.2

### Patch Changes

- Updated dependencies [17d53d9b]
- Updated dependencies [07bcec5e]
- Updated dependencies [3d5b2090]
- Updated dependencies [2138d300]
  - @siafoundation/renterd-types@0.17.0
  - @siafoundation/react-core@4.0.0
  - @siafoundation/units@3.4.0

## 4.15.1

### Patch Changes

- @siafoundation/react-core@3.0.0
- @siafoundation/renterd-types@0.16.1
- @siafoundation/units@3.3.4

## 4.15.0

### Minor Changes

- a9f2cede: Added contract formation API.
- a9f2cede: Updated payloads for contract lock and release APIs.
- a9f2cede: Added new fields to Contract type.

### Patch Changes

- Updated dependencies [0bdf8534]
- Updated dependencies [a9f2cede]
- Updated dependencies [a9f2cede]
- Updated dependencies [a9f2cede]
- Updated dependencies [70e57bf6]
- Updated dependencies [70e57bf6]
  - @siafoundation/react-core@2.1.0
  - @siafoundation/renterd-types@0.16.0
  - @siafoundation/units@3.3.3

## 4.14.2

### Patch Changes

- @siafoundation/react-core@2.0.0
- @siafoundation/renterd-types@0.15.1
- @siafoundation/units@3.3.2

## 4.14.1

### Patch Changes

- Updated dependencies [0d7fdf2e]
  - @siafoundation/react-core@1.8.0
  - @siafoundation/units@3.3.1

## 4.14.0

### Minor Changes

- 1434b2e8: Added the auth API.

### Patch Changes

- Updated dependencies [1434b2e8]
- Updated dependencies [55524cb3]
- Updated dependencies [55524cb3]
  - @siafoundation/renterd-types@0.15.0
  - @siafoundation/react-core@1.7.0

## 4.13.3

### Patch Changes

- Updated dependencies [b7e5ea12]
- Updated dependencies [b7e5ea12]
  - @siafoundation/renterd-types@0.14.1
  - @siafoundation/react-core@1.6.0

## 4.13.2

### Patch Changes

- Updated dependencies [c7ac7678]
  - @siafoundation/renterd-types@0.14.0

## 4.13.1

### Patch Changes

- Updated dependencies [b04c20e4]
  - @siafoundation/units@3.3.0

## 4.13.0

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
  - @siafoundation/units@3.2.1

## 4.12.0

### Minor Changes

- ae5aeec9: Added consensus network API.

### Patch Changes

- Updated dependencies [ae5aeec9]
  - @siafoundation/renterd-types@0.12.0

## 4.11.0

### Minor Changes

- 9277382b: The alerts API limit and skip params are now optional.

### Patch Changes

- Updated dependencies [56974bbf]
- Updated dependencies [56974bbf]
- Updated dependencies [9277382b]
- Updated dependencies [56974bbf]
  - @siafoundation/react-core@1.5.0
  - @siafoundation/renterd-types@0.11.0

## 4.10.0

### Minor Changes

- ee6e18ce: All query parameters are now lowercased for API consistency.

### Patch Changes

- Updated dependencies [ee6e18ce]
  - @siafoundation/renterd-types@0.10.0

## 4.9.0

### Minor Changes

- 5bfdb01e: The single object and list APIs routes have been updated.
- 7a333ffd: Updated to the new objects remove API.
- 7a333ffd: Adjusted the name of the objects rename API.

### Patch Changes

- Updated dependencies [5bfdb01e]
- Updated dependencies [7a333ffd]
- Updated dependencies [7a333ffd]
  - @siafoundation/renterd-types@0.9.0

## 4.8.0

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

- 978b70aa: Fixed a bug optimistically updating last scan information when initiating a host scan.
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

## 4.7.0

### Minor Changes

- a8c22bbe: The account reset drift API was moved from bus to worker. Closes https://github.com/SiaFoundation/web/issues/704
- 49cd9db1: Remove deprecated hosts API. Relates to https://github.com/SiaFoundation/renterd/pull/1484
- 81d374f4: Added the wallet send API.

### Patch Changes

- 81d374f4: Fixed the route for the recommended fee API.
- Updated dependencies [5c0df06e]
- Updated dependencies [a8c22bbe]
- Updated dependencies [8be86046]
- Updated dependencies [a7ff93e9]
- Updated dependencies [5f34c9a6]
- Updated dependencies [d5dc0f86]
- Updated dependencies [8be86046]
- Updated dependencies [49cd9db1]
- Updated dependencies [5f34c9a6]
- Updated dependencies [81d374f4]
- Updated dependencies [81d374f4]
  - @siafoundation/units@3.2.0
  - @siafoundation/renterd-types@0.7.0
  - @siafoundation/react-core@1.4.0

## 4.6.1

### Patch Changes

- @siafoundation/renterd-types@0.6.1
- @siafoundation/units@3.1.1

## 4.6.0

### Minor Changes

- 186e17a6: Max RPC price is no longer pinnable.

### Patch Changes

- Updated dependencies [186e17a6]
  - @siafoundation/renterd-types@0.6.0

## 4.5.0

### Minor Changes

- 09871542: Updated the pricepinning configuration structure to support multiple autopilots. Closes https://github.com/SiaFoundation/renterd/issues/1448

### Patch Changes

- Updated dependencies [09871542]
  - @siafoundation/renterd-types@0.5.0

## 4.4.0

### Minor Changes

- a6c956ea: The network block height calculation methods have been moved to the units
  package.
- bffe101c: Add price pinning configuration API.
- ce89b99a: Added support for the new network naming scheme and the anagami testnet.

### Patch Changes

- Updated dependencies [a6c956ea]
- Updated dependencies [a6c956ea]
- Updated dependencies [bffe101c]
- Updated dependencies [a64f40cc]
- Updated dependencies [ce89b99a]
- Updated dependencies [a64f40cc]
  - @siafoundation/react-core@1.3.0
  - @siafoundation/units@3.1.0
  - @siafoundation/renterd-types@0.4.0

## 4.3.0

### Minor Changes

- 802e45c0: Added the contracts prunable API.
- 802e45c0: Added the contract size API.

### Patch Changes

- Updated dependencies [802e45c0]
- Updated dependencies [802e45c0]
  - @siafoundation/renterd-types@0.3.0

## 4.2.2

### Patch Changes

- @siafoundation/renterd-types@0.2.2

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
