import child from 'child_process'
import { Bus } from './libs/renterd-js/src/index'
import Axios from 'axios'

setupCluster({ hostdCount: 3 })

export async function setupCluster({ hostdCount = 0 } = {}) {
  const managementPort = 4444
  console.log('Starting cluster on port', managementPort)

  const clusterd = child.spawn('internal/cluster/bin/clusterd', [
    '-renterd=1',
    `-hostd=${hostdCount}`,
    `-api=:${managementPort}`,
  ])
  //std out
  clusterd.stdout.on('data', (data) => {
    // console.log(`stdout: ${data}`)
  })

  clusterd.on('error', (err) => {
    console.error('Failed to start clusterd:', err)
  })

  clusterd.on('exit', (code) => {
    console.log(`clusterd process ${clusterd.pid} exited with code ${code}`)
  })

  let renterdAddress = ''
  let renterdPassword = ''
  await waitFor(
    async () => {
      try {
        const nodes = await Axios.get(
          `http://localhost:${managementPort}/nodes`
        )
        const renterNodes = nodes.data.filter((n) => n.type === 'renterd')
        const hostdNodes = nodes.data.filter((n) => n.type === 'hostd')
        if (renterNodes.length === 1 && hostdNodes.length === hostdCount) {
          renterdAddress = renterNodes[0].apiAddress
          renterdPassword = renterNodes[0].password
          return true
        }
        console.log('waiting for nodes...')
        return false
      } catch (e) {
        console.log(e)
        return false
      }
    },
    {
      timeout: 20_000,
      interval: 500,
    }
  )

  console.log(`renterd node started, ${hostdCount} hostd nodes started`)

  const renterdApi = `${renterdAddress}/api`.replace('[::]', '127.0.0.1')

  const bus = Bus({
    api: renterdApi,
    password: renterdPassword,
  })

  await waitFor(
    async () => {
      const hosts = await bus.hostsSearch({
        data: {
          filterMode: 'all',
          usabilityMode: 'usable',
          limit: 50,
          offset: 0,
        },
      })
      const contracts = await bus.contracts()
      console.log('usable hosts', hosts.data.length)
      console.log('active contracts', contracts.data.length)
      return hosts.data.length >= 3 && contracts.data.length >= 3
    },
    {
      timeout: 20_000,
      interval: 2_000,
    }
  )
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
