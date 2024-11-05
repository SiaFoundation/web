---
'walletd': patch
---

Updated the seed wallet address generation process to strip the address prefix, which matches the recent API change. Closes https://github.com/SiaFoundation/walletd/issues/190
