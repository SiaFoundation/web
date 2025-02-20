import { Explored } from '@siafoundation/explored-js'
import { Hostd } from '@siafoundation/hostd-js'
import { Bus } from '@siafoundation/renterd-js'
import { Walletd } from '@siafoundation/walletd-js'
import { startWebServerCluster, stopWebServer } from './webServerCluster'
import {
  clusterd,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'

export type Cluster = Awaited<ReturnType<typeof startCluster>>

export async function startCluster() {
  const exploredCount = 1
  const renterdCount = 1
  const walletdCount = 1
  const hostdCount = 3
  await setupCluster({
    exploredCount,
    renterdCount,
    walletdCount,
    hostdCount,
  })
  const renterd = clusterd.nodes.find((n) => n.type === 'renterd')
  const explored = clusterd.nodes.find((n) => n.type === 'explored')
  const hostds = clusterd.nodes.filter((n) => n.type === 'hostd')
  const walletds = clusterd.nodes.filter((n) => n.type === 'walletd')
  if (!renterd || !explored || !hostds || !walletds) {
    throw new Error('Failed to start cluster')
  }
  const daemons = {
    renterd,
    explored,
    hostds,
    walletds,
  }
  const apis = {
    renterd: Bus({
      api: `${renterd.apiAddress}/api`,
      password: renterd.password,
    }),
    explored: Explored({
      api: `${explored.apiAddress}/api`,
      password: explored.password,
    }),
    hostds: hostds.map((h) =>
      Hostd({
        api: `${h.apiAddress}/api`,
        password: h.password,
      })
    ),
    walletds: walletds.map((w) =>
      Walletd({
        api: `${w.apiAddress}/api`,
        password: w.password,
      })
    ),
  }
  const { baseUrl } = await startWebServerCluster({
    exploredAddress: daemons.explored.apiAddress,
  })
  console.log(`
    webServerUrl: ${baseUrl}
    clusterd: http://localhost:${clusterd.managementPort}
    explored: ${daemons.explored.apiAddress}
    renterd: ${daemons.renterd.apiAddress}
    hostds: ${daemons.hostds.map((h) => h.apiAddress)}
    walletds: ${daemons.walletds.map((w) => w.apiAddress)}
  `)
  return {
    webServerUrl: baseUrl,
    clusterd,
    apis,
    daemons,
  }
}

export async function stopCluster() {
  stopWebServer()
  teardownCluster()
}
