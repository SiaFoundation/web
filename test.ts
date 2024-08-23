import child from 'child_process'
import { random } from '@technically/lodash'
import Axios from 'axios'

let clusterd: child.ChildProcessWithoutNullStreams

setupCluster({ hostdCount: 3 })

export async function setupCluster({ hostdCount = 0 } = {}) {
  const managementPort = random(10000, 65535)
  console.log('Starting cluster on port', managementPort)
  clusterd = child.spawn('internal/cluster/bin/clusterd', [
    '-renterd=1',
    `-hostd=${hostdCount}`,
    `-api=:${managementPort}`,
  ])

  let renterdAddress: string
  let renterdPassword: string
  await waitFor(async () => {
    const nodes = await Axios.get(`http://localhost:${managementPort}/nodes`)
    const renterNodes = nodes.data.filter((n) => n.type === 'renterd')
    if (renterNodes.length === 1) {
      renterdAddress = renterNodes[0].apiAddress
      renterdPassword = renterNodes[0].password
      return true
    }
    return false
  }, 20_000)

  clusterd.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  clusterd.stderr.on('data', (data) => {
    console.error(`clusterd error: ${data}`)
  })

  clusterd.on('error', (err) => {
    console.error('Failed to start clusterd:', err)
  })

  clusterd.on('exit', (code) => {
    console.log(`clusterd process ${clusterd.pid} exited with code ${code}`)
  })

  return {
    address: renterdAddress,
    password: renterdPassword,
    mine: async (blocks: number) => {
      console.log('Attempting to mine', blocks, 'blocks')
      await Axios.post(`http://localhost:${managementPort}/mine`, {
        blocks,
      })
      console.log('Mined', blocks, 'blocks')
    },
  }
}

function waitFor(condition: () => Promise<boolean>, timeout = 1000) {
  return new Promise<void>((resolve, reject) => {
    const interval = setInterval(async () => {
      if (await condition()) {
        clearInterval(interval)
        resolve()
      }
    }, 500)
    setTimeout(() => {
      clearInterval(interval)
      reject(new Error('Timeout'))
    }, timeout)
  })
}
