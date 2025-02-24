import { ChildProcess, spawn } from 'child_process'
import { workspaceRoot } from '@nx/devkit'
import net from 'net'

let server: ChildProcess
let baseUrl: string

// Starts the explorer app webserver configured to run against the testnet
// cluster provided via the NEXT_PUBLIC_EXPLORED_ADDRESS environment variable.
export async function startWebServerCluster({
  exploredAddress,
}: {
  exploredAddress: string
}) {
  const port = await findFreePort()
  server = spawn(
    'npx',
    [
      'nx',
      'run',
      'explorer:serve:development-testnet-cluster',
      '--port',
      port.toString(),
    ],
    {
      cwd: workspaceRoot,
      shell: true,
      env: {
        ...process.env,
        NEXT_PUBLIC_EXPLORED_ADDRESS: exploredAddress,
      },
    }
  )

  server.stdout?.on('data', (data) => {
    console.log(data.toString())
  })

  server.stderr?.on('data', (data) => {
    console.error(data.toString())
  })

  // Wait until stdout prints "Ready", eg:
  // ✓ Starting...
  // ✓ Ready in 1606ms
  await new Promise((resolve) => {
    server.stdout?.on('data', (data) => {
      if (data.toString().includes('Ready')) {
        console.log('Server ready')
        resolve(true)
      }
    })
  })
  baseUrl = `http://localhost:${port}`
  return {
    baseUrl,
  }
}

export function stopWebServer() {
  console.log('Stopping webserver: ', baseUrl)
  server.kill() // Kill the server after each test
}

async function findFreePort(): Promise<number> {
  return new Promise((res) => {
    const srv = net.createServer()
    srv.listen(0, () => {
      const addr = srv.address()
      if (typeof addr === 'string') {
        throw new Error('Address is a string')
      }
      const port = addr?.port
      if (!port) {
        throw new Error('Port is undefined')
      }
      srv.close(() => res(port))
    })
  })
}
