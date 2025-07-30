const genesis = 1433600000
export function getMainnetBlockHeight() {
  // (now - genesis) / 10min = est block height
  return Math.round((new Date().getTime() - genesis * 1000) / (1000 * 60 * 10))
}

const zenGenesis = 1673600000
export function getTestnetZenBlockHeight() {
  // (now - genesis) / 10min = est block height
  return Math.round(
    (new Date().getTime() - zenGenesis * 1000) / (1000 * 60 * 10),
  )
}
