import child from 'child_process'
import { random } from '@technically/lodash'
import Axios from 'axios'
import { Bus } from '@siafoundation/renterd-js'
import { pluralize } from '@siafoundation/units'

export const clusterd = {
  process: null as child.ChildProcessWithoutNullStreams,
  managementPort: undefined as number,
  renterdAddress: undefined as string,
  renterdPassword: undefined as string,
}

const maxTimeWaitingForAllNodesToStartup = 30_000
const maxTimeWaitingForContractsToForm = 60_000

export async function setupCluster({ hostdCount = 0 } = {}) {
  clusterd.managementPort = random(10000, 65535)
  console.log('Starting cluster on port', clusterd.managementPort)

  clusterd.process = child.spawn('internal/cluster/bin/clusterd', [
    '-renterd=1',
    `-hostd=${hostdCount}`,
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
      `clusterd process ${clusterd.process.pid} exited with code ${code}`
    )
  })

  console.time('waiting for nodes to start')
  await waitFor(
    async () => {
      const addr = `http://localhost:${clusterd.managementPort}/nodes`
      try {
        const nodes = await Axios.get(addr)
        const renterNodes = nodes.data.filter((n) => n.type === 'renterd')
        const hostdNodes = nodes.data.filter((n) => n.type === 'hostd')
        if (renterNodes.length === 1 && hostdNodes.length === hostdCount) {
          clusterd.renterdAddress = renterNodes[0].apiAddress.replace(
            '[::]',
            '127.0.0.1'
          )
          clusterd.renterdPassword = renterNodes[0].password
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

  console.log(`renterd node started, ${hostdCount} hostd nodes started`)

  const renterdApi = `${clusterd.renterdAddress}/api`
  const bus = Bus({
    api: renterdApi,
    password: clusterd.renterdPassword,
  })

  if (hostdCount === 0) {
    return
  }

  console.time('waiting for contracts to form')
  await waitFor(
    async () => {
      await mine(1)
      const hosts = await bus.hostsSearch({
        data: {
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
