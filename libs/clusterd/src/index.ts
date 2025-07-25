import child from 'child_process'
import { random } from '@technically/lodash'
import Axios from 'axios'
import { Bus } from '@siafoundation/renterd-js'
import { pluralize } from '@siafoundation/units'
import { Hostd } from '@siafoundation/hostd-js'
import { Maybe } from '@siafoundation/types'
import { Explored } from '@siafoundation/explored-js'
import { Walletd } from '@siafoundation/walletd-js'
import BigNumber from 'bignumber.js'

export type ClusterNodeRenterd = {
  type: 'renterd'
  apiAddress: string
  password: string
  walletAddress: string
}

export type ClusterNodeHostd = {
  type: 'hostd'
  apiAddress: string
  password: string
  walletAddress: string
}

export type ClusterNodeWalletd = {
  type: 'walletd'
  apiAddress: string
  password: string
}

export type ClusterNodeExplored = {
  type: 'explored'
  apiAddress: string
  password: string
}

export type ClusterNode =
  | ClusterNodeRenterd
  | ClusterNodeHostd
  | ClusterNodeWalletd
  | ClusterNodeExplored

export type NetworkVersion = 'v1' | 'v2'

export const clusterd = {
  process: undefined as child.ChildProcessWithoutNullStreams | undefined,
  managementPort: undefined as number | undefined,
  nodes: [] as ClusterNode[],
}

const maxTimeWaitingForAllNodesToStartup = 100_000
const maxTimeWaitingForContractsToForm = 60_000

const randomAddress =
  '0373a398eae5a7a682ff516d44cf122613c45aae75eac98fc094e3a5979d496088e656bcf925'

export type Cluster = Awaited<ReturnType<typeof setupCluster>>

export async function setupCluster({
  renterdCount = 0,
  hostdCount = 0,
  walletdCount = 0,
  exploredCount = 0,
  networkVersion = 'v2',
  siafundAddr = randomAddress,
}: {
  renterdCount?: number
  hostdCount?: number
  walletdCount?: number
  exploredCount?: number
  networkVersion?: NetworkVersion
  siafundAddr?: string
} = {}) {
  clusterd.managementPort = random(10000, 65535)
  console.log('Starting cluster on port', clusterd.managementPort)

  clusterd.process = child.spawn('internal/cluster/bin/clusterd', [
    `-network=${networkVersion}`,
    `-renterd=${renterdCount}`,
    `-hostd=${hostdCount}`,
    `-walletd=${walletdCount}`,
    `-explored=${exploredCount}`,
    `-api=:${clusterd.managementPort}`,
    `-siafund=${siafundAddr}`,
  ])
  // Drain buffer to prevent process from hanging.
  clusterd.process.stdout.on('data', () => null)
  clusterd.process.stderr.on('data', () => null)
  clusterd.process.on('error', (err) => {
    console.error('Failed to start clusterd:', err)
  })
  clusterd.process.on('exit', (code) => {
    console.log(
      `clusterd process ${clusterd?.process?.pid} exited with code ${code}`
    )
  })

  const waitingForNodesToStartTimer = 'Waiting for nodes to start'
  console.time(waitingForNodesToStartTimer)
  await waitFor(
    waitingForNodesToStartTimer,
    async () => {
      const addr = `http://localhost:${clusterd.managementPort}/nodes`
      try {
        const nodes = await Axios.get<
          Maybe<{ type: string; apiAddress: string; password: string }[]>
        >(`http://localhost:${clusterd.managementPort}/nodes`, {
          timeout: 5_000,
        })
        const runningCount = nodes.data?.length
        const totalCount =
          renterdCount + hostdCount + walletdCount + exploredCount
        if (nodes.data?.length === totalCount) {
          clusterd.nodes = nodes.data?.map((n) => {
            if ('apiAddress' in n) {
              return {
                ...n,
                apiAddress: n.apiAddress.replace('[::]', '127.0.0.1'),
              } as ClusterNode
            }
            return n
          })
          return true
        }
        console.log(`Waiting for nodes (${runningCount}/${totalCount})...`)
        return false
      } catch {
        console.log(`Error fetching nodes: ${addr}`)
        return false
      }
    },
    {
      timeout: maxTimeWaitingForAllNodesToStartup,
      interval: 1_000,
    }
  )
  console.timeEnd(waitingForNodesToStartTimer)

  // Mine a few blocks to make sure daemon wallet balances are spendable.
  // For some reason this is necessary even though each daemon start method
  // already mines maturityHeight+20 worth of blocks.
  await mine(10)

  console.log(
    `started: ${renterdCount} renterd, ${hostdCount} hostd, ${walletdCount} walletd, and ${exploredCount} explored nodes`
  )

  const explored = clusterd.nodes.filter((n) => n.type === 'explored')
  const renterds = clusterd.nodes.filter((n) => n.type === 'renterd')
  const hostds = clusterd.nodes.filter((n) => n.type === 'hostd')
  const walletds = clusterd.nodes.filter((n) => n.type === 'walletd')

  const daemons = {
    exploreds: explored.map((e) => ({
      node: e,
      api: Explored({
        api: `${e.apiAddress}/api`,
        password: e.password,
      }),
    })),
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
    exploreds: ${daemons.exploreds.map((e) => e.node.apiAddress)}
    renterds: ${daemons.renterds.map((r) => r.node.apiAddress)}
    hostds: ${daemons.hostds.map((h) => h.node.apiAddress)}
    walletds: ${daemons.walletds.map((w) => w.node.apiAddress)}
  `)

  return {
    clusterd,
    daemons,
  }
}

export async function renterdWaitForContracts({
  renterdNode,
  hostdCount,
}: {
  renterdNode: ClusterNodeRenterd
  hostdCount: number
}) {
  const renterdApi = `${renterdNode.apiAddress}/api`
  const bus = Bus({
    api: renterdApi,
    password: renterdNode.password,
  })

  if (hostdCount === 0) {
    return
  }

  const waitingForContractsToFormTimer = 'Waiting for contracts to form'
  console.time(waitingForContractsToFormTimer)
  await waitFor(
    waitingForContractsToFormTimer,
    async () => {
      await mine(1)
      const hosts = await bus.hosts({
        data: {
          filterMode: 'allowed',
          usabilityMode: 'usable',
          limit: 50,
          offset: 0,
        },
      })
      const contracts = await bus.contracts()

      const hostCount = hosts.data?.length || 0
      const contractCount = contracts.data?.length || 0

      console.log(
        `usable hosts: ${hostCount}/${hostdCount} - active contracts: ${contractCount}/${hostdCount}`
      )
      return hostCount >= hostdCount && contractCount >= hostdCount
    },
    {
      timeout: maxTimeWaitingForContractsToForm,
      interval: 2_000,
    }
  )
  console.timeEnd(waitingForContractsToFormTimer)
}

export async function hostdWaitForContracts({
  hostdNode,
  renterdCount,
  networkVersion,
}: {
  hostdNode: ClusterNodeHostd
  renterdCount: number
  networkVersion: NetworkVersion
}) {
  const hostdApi = `${hostdNode.apiAddress}/api`
  const hostd = Hostd({
    api: hostdApi,
    password: hostdNode.password,
  })

  if (renterdCount === 0) {
    return
  }

  const waitingForContractsToFormTimer = 'Waiting for contracts to form'
  console.time(waitingForContractsToFormTimer)
  await waitFor(
    waitingForContractsToFormTimer,
    async () => {
      await mine(1)
      const contracts =
        networkVersion === 'v2'
          ? await hostd.contractsV2({
              data: {
                limit: renterdCount,
              },
            })
          : await hostd.contracts({
              data: {
                limit: renterdCount,
              },
            })
      console.log(`contracts: ${contracts.data.count}/${renterdCount}`)
      return contracts.data.count >= renterdCount
    },
    {
      timeout: maxTimeWaitingForContractsToForm,
      interval: 2_000,
    }
  )
  console.timeEnd(waitingForContractsToFormTimer)
}

// Sometimes the wallet balance is confirmed but not spendable immediately
// after the cluster is started. This function waits until it is spendable.
export async function waitUntilRenterdWalletBalanceIsSpendable(
  renterd: ReturnType<typeof Bus>
) {
  await waitFor(
    'Waiting for wallet balance to be spendable',
    async () => {
      console.log('Waiting for wallet balance to be spendable...')
      const wallet = await renterd.wallet()
      return new BigNumber(wallet.data?.spendable || 0).gt(0)
    },
    {
      timeout: 20_000,
      interval: 500,
    }
  )
}

export async function mine(blocks: number) {
  console.log(`Mining ${pluralize(blocks, 'block')}...`)
  await Axios.post(`http://localhost:${clusterd.managementPort}/mine`, {
    blocks,
  })
}

export async function mineToHeight(height: number) {
  console.log(`Mining to height ${height}...`)
  await Axios.post(`http://localhost:${clusterd.managementPort}/mine/to`, {
    targetHeight: height,
  })
}

export async function getCurrentHeight() {
  const response = await Axios.get(
    `http://localhost:${clusterd.managementPort}/height`
  )
  return response.data?.height
}

export async function teardownCluster() {
  console.log('stopping cluster')
  clusterd.process?.kill()
}

export function waitFor(
  description: string,
  condition: () => Promise<boolean>,
  {
    timeout = 5_000,
    interval = 500,
  }: { timeout?: number; interval?: number } = {}
) {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now()

    const checkCondition = async () => {
      try {
        // Check if condition is met.
        if (await condition()) {
          resolve()
          return
        }

        // Check if we've exceeded the timeout.
        if (Date.now() - startTime >= timeout) {
          reject(new Error(`Timeout: ${description}`))
          return
        }

        // Schedule next check after this one is complete.
        setTimeout(checkCondition, interval)
      } catch (error) {
        reject(error)
      }
    }

    // Start the first check.
    checkCondition()
  })
}

export async function waitForData<T>(
  dataFetcher: () => Promise<T>,
  assertion: (data: T) => boolean | Promise<boolean>,
  timeoutMs = 10_000,
  retryIntervalMs = 1_000
): Promise<T> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeoutMs) {
    try {
      const data = await dataFetcher()
      const assertionResult = await assertion(data)

      if (assertionResult) {
        return data // Success, assertion passed
      }
    } catch {
      // Continue retrying on error
    }

    // Wait before next retry
    await new Promise((resolve) => setTimeout(resolve, retryIntervalMs))
  }

  throw new Error(
    `Timeout waiting for data assertion to pass after ${timeoutMs}ms.`
  )
}
