// mainnet: https://github.com/SiaFoundation/coreutils/blob/master/chain/network.go#L50-L51
// n.HardforkV2.AllowHeight = 526000   // June 6th, 2025 @ 6:00am UTC
// n.HardforkV2.RequireHeight = 530000 // July 4th, 2025 @ 2:00am UTC

// zen: https://github.com/SiaFoundation/coreutils/blob/master/chain/network.go#L144-L145
// n.HardforkV2.AllowHeight = 112000   // March 1, 2025 @ 7:00:00 UTC
// n.HardforkV2.RequireHeight = 114000 // ~ 2 weeks later

// anagami: https://github.com/SiaFoundation/coreutils/blob/master/chain/network.go#L172-L173
// n.HardforkV2.AllowHeight = 2016         // ~2 weeks in
// n.HardforkV2.RequireHeight = 2016 + 288 // ~2 days later

// test cluster: internal/cluster/cmd/clusterd/main.go#L131-L132
// n.HardforkV2.AllowHeight = 400
// n.HardforkV2.RequireHeight = 500

export const hardforkV2AllowHeights = {
  mainnet: 526_000,
  zen: 112_000,
  anagami: 2_016,
  testCluster: 400,
}

export const hardforkV2RequireHeights = {
  mainnet: 530_000,
  zen: 114_000,
  anagami: 2_016 + 288,
  testCluster: 500,
}

export function getNetwork(network?: string) {
  return process.env.NEXT_PUBLIC_TEST_CLUSTER === 'true'
    ? 'testCluster'
    : network || 'mainnet'
}

export function getHardforkV2AllowHeight(network: string) {
  return hardforkV2AllowHeights[getNetwork(network)]
}

export function getHardforkV2RequireHeight(network: string) {
  return hardforkV2RequireHeights[getNetwork(network)]
}

export function isPastV2AllowHeight({
  network,
  height,
}: {
  network: string
  height: number
}) {
  const hardforkV2AllowHeight = getHardforkV2AllowHeight(network)
  return height > hardforkV2AllowHeight
}

export function isPastV2RequireHeight({
  network,
  height,
}: {
  network: string
  height: number
}) {
  const hardforkV2RequireHeight = getHardforkV2RequireHeight(network)
  return height > hardforkV2RequireHeight
}
