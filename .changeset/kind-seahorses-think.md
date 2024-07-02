---
'renterd': minor
---

The contracts table now allows the user to check the prunable and expiring data size for a specific contract, across all contracts, or a filtered set of contracts. Prunable means data that the autopilot sector pruning feature would prune, expiring means prunable data outside of autopilot contracts that will likely eventually expire. Closes https://github.com/SiaFoundation/renterd/issues/1247
