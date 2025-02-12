import child from 'child_process'
import { random } from '@technically/lodash'
import Axios from 'axios'
import { Bus } from '@siafoundation/renterd-js'
import { pluralize } from '@siafoundation/units'
import { Hostd } from '@siafoundation/hostd-js'
import { Maybe } from '@siafoundation/types'

type Node = {
  type: string
  apiAddress: string
  password: string
}
type NetworkVersion = 'v1' | 'v2' | 'transition'

export const clusterd = {
  process: undefined as child.ChildProcessWithoutNullStreams | undefined,
  managementPort: undefined as number | undefined,
  nodes: [] as Node[],
}

const maxTimeWaitingForAllNodesToStartup = 100_000
const maxTimeWaitingForContractsToForm = 60_000

export async function setupCluster({
  renterdCount = 0,
  hostdCount = 0,
  walletdCount = 0,
  networkVersion = 'v1',
}: {
  renterdCount?: number
  hostdCount?: number
  walletdCount?: number
  networkVersion?: NetworkVersion
} = {}) {
  clusterd.managementPort = random(10000, 65535)
  console.log('Starting cluster on port', clusterd.managementPort)

  clusterd.process = child.spawn('internal/cluster/bin/clusterd', [
    `-network=${networkVersion}`,
    `-renterd=${renterdCount}`,
    `-hostd=${hostdCount}`,
    `-walletd=${walletdCount}`,
    `-api=:${clusterd.managementPort}`,
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

  console.time('waiting for nodes to start')
  await waitFor(
    async () => {
      const addr = `http://localhost:${clusterd.managementPort}/nodes`
      try {
        const nodes = await Axios.get<
          Maybe<{ type: string; apiAddress: string; password: string }[]>
        >(`http://localhost:${clusterd.managementPort}/nodes`)
        const runningCount = nodes.data?.length
        const totalCount = renterdCount + hostdCount + walletdCount
        if (nodes.data?.length === renterdCount + hostdCount + walletdCount) {
          clusterd.nodes = nodes.data?.map((n) => ({
            ...n,
            apiAddress: n.apiAddress.replace('[::]', '127.0.0.1'),
          }))
          return true
        }
        console.log(`waiting for nodes (${runningCount}/${totalCount})...`)
        return false
      } catch (e) {
        console.log(`Error fetching nodes: ${addr}`)
        return false
      }
    },
    {
      timeout: maxTimeWaitingForAllNodesToStartup,
      interval: 1_000,
    }
  )
  console.timeEnd('waiting for nodes to start')

  console.log(
    `started: ${renterdCount} renterd, ${hostdCount} hostd, and ${walletdCount} walletd nodes`
  )
}

export async function renterdWaitForContracts({
  renterdNode,
  hostdCount,
}: {
  renterdNode: Node
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

  console.time('waiting for contracts to form')
  await waitFor(
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
  console.timeEnd('waiting for contracts to form')
}

export async function hostdWaitForContracts({
  hostdNode,
  renterdCount,
}: {
  hostdNode: Node
  renterdCount: number
}) {
  const hostdApi = `${hostdNode.apiAddress}/api`
  const hostd = Hostd({
    api: hostdApi,
    password: hostdNode.password,
  })

  if (renterdCount === 0) {
    return
  }

  console.time('waiting for contracts to form')
  await waitFor(
    async () => {
      await mine(1)
      const contracts = await hostd.contracts({
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
  console.timeEnd('waiting for contracts to form')
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

function waitFor(
  condition: () => Promise<boolean>,
  {
    timeout = 1000,
    interval = 500,
  }: { timeout?: number; interval?: number } = {}
) {
  return new Promise<void>((resolve, reject) => {
    const intervalRef = setInterval(async () => {
      if (await condition()) {
        clearInterval(intervalRef)
        resolve()
      }
    }, interval)
    setTimeout(() => {
      clearInterval(intervalRef)
      reject(new Error('Timeout'))
    }, timeout)
  })
}
