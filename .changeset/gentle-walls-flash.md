---
'walletd': minor
---

Fixed an issue where walletd would indefinitely report as "syncing" - the synced state is now based on the most recent block's timestamp being within the last 2 hours.
