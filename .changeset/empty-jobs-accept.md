---
'renterd': minor
---

The configuration now has an option to automatically calculate prices from the user-specified allowance. The prices are calculated to spend around the allowance while keeping upload, download, and storage prices proportionally fixed while also allocating based on estimated usage in each category. The max prices also include headroom so that variations in contract prices average out while avoiding host churn. Closes https://github.com/SiaFoundation/renterd/issues/1303
