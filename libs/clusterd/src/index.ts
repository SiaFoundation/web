import child from 'child_process'
import { random } from '@technically/lodash'
import Axios from 'axios'
import { Bus } from '@siafoundation/renterd-js'
import { pluralize } from '@siafoundation/units'

type Node = {
  type: string
  apiAddress: string
  password: string
}

export const clusterd = {
  process: undefined as child.ChildProcessWithoutNullStreams | undefined,
  managementPort: undefined as number | undefined,
  nodes: [] as Node[],
}

const maxTimeWaitingForAllNodesToStartup = 30_000
const maxTimeWaitingForContractsToForm = 60_000

export async function setupCluster({
  renterdCount = 0,
  hostdCount = 0,
  walletdCount = 0,
} = {}) {
  clusterd.managementPort = random(10000, 65535)
  console.log('Starting cluster on port', clusterd.managementPort)

  clusterd.process = child.spawn('internal/cluster/bin/clusterd', [
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
          { type: string; apiAddress: string; password: string }[]
        >(`http://localhost:${clusterd.managementPort}/nodes`)
        if (nodes.data.length === renterdCount + hostdCount + walletdCount) {
          clusterd.nodes = nodes.data.map((n) => ({
            ...n,
            apiAddress: n.apiAddress.replace('[::]', '127.0.0.1'),
          }))
          return true
        }
        console.log('waiting for nodes...')
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

export async function waitForContracts({
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
          autopilotID: 'autopilot',
          filterMode: 'allowed',
          usabilityMode: 'usable',
          limit: 50,
          offset: 0,
        },
      })
      const contracts = await bus.contracts()
      console.log(
        `usable hosts: ${hosts.data.length}/${hostdCount} - active contracts: ${contracts.data.length}/${hostdCount}`
      )
      return (
        hosts.data.length >= hostdCount && contracts.data.length >= hostdCount
      )
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
