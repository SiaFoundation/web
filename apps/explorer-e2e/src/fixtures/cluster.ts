import { Explored } from '@siafoundation/explored-js'
import { Hostd } from '@siafoundation/hostd-js'
import { Bus } from '@siafoundation/renterd-js'
import { Walletd } from '@siafoundation/walletd-js'
import { clusterd, setupCluster } from '@siafoundation/clusterd'
import { BrowserContext } from 'playwright'

export type Cluster = Awaited<ReturnType<typeof startCluster>>

export async function startCluster({
  renterdCount = 1,
  walletdCount = 1,
  hostdCount = 3,
  context,
}: {
  renterdCount?: number
  walletdCount?: number
  hostdCount?: number
  context: BrowserContext
}) {
  await setupCluster({
    exploredCount: 1,
    renterdCount,
    walletdCount,
    hostdCount,
  })
  const explored = clusterd.nodes.find((n) => n.type === 'explored')
  const renterds = clusterd.nodes.filter((n) => n.type === 'renterd')
  const hostds = clusterd.nodes.filter((n) => n.type === 'hostd')
  const walletds = clusterd.nodes.filter((n) => n.type === 'walletd')
  if (
    explored === undefined ||
    renterds.length !== renterdCount ||
    hostds.length !== hostdCount ||
    walletds.length !== walletdCount
  ) {
    throw new Error('Failed to start cluster')
  }
  const daemons = {
    explored: {
      node: explored,
      api: Explored({
        api: `${explored.apiAddress}/api`,
        password: explored.password,
      }),
    },
    renterds: renterds.map((r) => ({
      node: r,
      api: Bus({
        api: `${r.apiAddress}/api`,
        password: r.password,
      }),
    })),
    hostds: hostds.map((h) => ({
      node: h,
      api: Hostd({
        api: `${h.apiAddress}/api`,
        password: h.password,
      }),
    })),
    walletds: walletds.map((w) => ({
      node: w,
      api: Walletd({
        api: `${w.apiAddress}/api`,
        password: w.password,
      }),
    })),
  }
  console.log(`
    clusterd: http://localhost:${clusterd.managementPort}
    explored: ${daemons.explored.node.apiAddress}
    renterds: ${daemons.renterds.map((r) => r.node.apiAddress)}
    hostds: ${daemons.hostds.map((h) => h.node.apiAddress)}
    walletds: ${daemons.walletds.map((w) => w.node.apiAddress)}
  `)
  // Set the explorerd address cookie so that the explorer app overrides the
  // normal zen address with the testnet cluster address.
  await context.addCookies([
    {
      // This should match `exploredCustomApiCookieName` in apps/explorer/config/explored.ts
      name: 'exploredAddress',
      value: daemons.explored.node.apiAddress,
      url: 'http://localhost:3005',
    },
  ])
  return {
    clusterd,
    daemons,
  }
}
