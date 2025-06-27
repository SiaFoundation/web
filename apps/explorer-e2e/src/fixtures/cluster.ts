import { clusterd, NetworkVersion, setupCluster } from '@siafoundation/clusterd'
import { BrowserContext } from 'playwright'

export type Cluster = Awaited<ReturnType<typeof startCluster>>

export async function startCluster({
  renterdCount = 1,
  walletdCount = 1,
  hostdCount = 3,
  context,
  networkVersion,
}: {
  renterdCount?: number
  walletdCount?: number
  hostdCount?: number
  context: BrowserContext
  networkVersion?: NetworkVersion
}) {
  const cluster = await setupCluster({
    exploredCount: 1,
    renterdCount,
    walletdCount,
    hostdCount,
    networkVersion,
  })
  const daemons = {
    explored: cluster.daemons.exploreds[0],
    renterds: cluster.daemons.renterds,
    hostds: cluster.daemons.hostds,
    walletds: cluster.daemons.walletds,
  }
  // Set the explorerd address cookie so that the explorer app overrides the
  // normal zen address with the testnet cluster address.
  await context.addCookies([
    {
      // This should match `exploredCustomApiCookieName` in apps/explorer/config/explored.ts
      name: 'exploredAddress',
      value: `${daemons.explored.node.apiAddress}/api`,
      url: 'http://localhost:3005',
    },
  ])
  return {
    clusterd,
    daemons,
  }
}
