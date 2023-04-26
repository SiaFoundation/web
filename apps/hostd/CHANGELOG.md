# hostd

## 0.8.0

### Minor Changes

- 7b0a75c: The home dashboard now shows a variety of metrics and allows changing the data time range.
- 879ee13: Charts now supports grouping stats by category, such as hostd earned and potential revenue.
- ddebbb1: The network block height is now estimated. renterd no longer uses SiaStats for anything so the 3rd party data privacy toggle has also been removed.
- ddebbb1: The sync screen now shows the correct network block height when using the Zen testnet.
- 879ee13: Charts now have loading states.
- 879ee13: The wallet sparklines have been temporarily hidden until we have support for all inflow/outflow events such as returned allowance.

## 0.7.0

### Minor Changes

- 12d206f: The contracts explorer now allows filtering on status and contract ID, these are also accessible via the global ⌘K palette.
- d746281: The unlock form now times out after 5s and shows a new 'Error, daemon did not respond' error - this occurs when the wallet is re-indexing.
- 12d206f: The contracts explorer now features columns for a contract timeline, siacoin usage by type, data size, and more.
- 12d206f: The contracts explorer now supports view column configuration and sorting by status and timeline.

## 0.6.0

### Minor Changes

- 842ffbe: The txpool and wallet transaction lists now show the specific type of transaction.

## 0.5.0

### Minor Changes

- c069789: Apps now build Go release on GitHub push tag event.

## 0.4.0

### Minor Changes

- 5959f7c: All app paths were slightly incorrect, they are now go.sia.tech/web/\*.

## 0.3.0

### Minor Changes

- 6296e23: All app Go modules are now under the go.sia.tech domain.

## 0.2.0

### Minor Changes

- e51b4d3: Apps now have embed specific build flags, embedded apps do not show a server field at login.
- 82832d9: The apps are now built into Go modules exposing static assets as an embed.FS.

## 0.1.0

### Minor Changes

- 35e3da8: Design system and general styling migrated to tailwind.
