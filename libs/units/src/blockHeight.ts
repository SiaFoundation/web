export function getBlockHeightFromGenesis(genesisTimestamp?: string) {
  if (!genesisTimestamp) {
    return 0
  }
  // (now - genesis) / 10min = est block height
  const genesis = new Date(genesisTimestamp).getTime()
  return Math.round((new Date().getTime() - genesis) / (1000 * 60 * 10))
}
