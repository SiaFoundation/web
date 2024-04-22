---
'hostd': patch
'renterd': patch
'walletd': patch
---

Fixed an issue where the daemon would panic trying to read the embedded UI files on Windows. Closes https://github.com/SiaFoundation/web/issues/599
