import child_process from 'child_process'
import fs from 'fs'
import { Client } from './client'

// Global constants
const BIN_PATH = '/Users'
let spawnMock = jest.fn()

describe('client', () => {
  beforeEach(() => {
    jest.mock('fs')
    fs.existsSync = jest.fn().mockReturnValue(true)
    jest.mock('child_process')
    spawnMock = jest.fn()
    child_process.spawn = spawnMock
  })
  it('can create client with no config', () => {
    const client = new Client({})
    client.launch(BIN_PATH)
    expect(spawnMock.mock.calls.length).toBe(1)
    // // This should match daemon path passed into the function
    const arg0: string = spawnMock.mock.calls[0][0]
    expect(arg0).toBe(BIN_PATH)
    // // Check that default flags are passed in
    const arg1: string[] = spawnMock.mock.calls[0][1]
    expect(arg1).toContain('--api-addr=localhost:9980')
    expect(arg1).toContain('--host-addr=:9982')
    expect(arg1).toContain('--rpc-addr=:9981')
  })

  it('can replace client config', () => {
    const client = new Client({
      agent: 'custom-agent',
      apiAuthentication: true,
      apiAuthenticationPassword: 'foo',
      apiHost: '1.1.1.1',
      apiPort: 1337,
      dataDirectory: 'bar',
      hostPort: 1339,
      modules: {
        consensus: true,
        explorer: true,
        gateway: true,
        host: true,
        miner: false,
        feeManager: false,
        renter: true,
        transactionPool: true,
        wallet: true,
      },
      rpcPort: 1338,
    })
    client.launch(BIN_PATH)
    const arg1: string[] = spawnMock.mock.calls[0][1]

    expect(arg1.length).toBe(7)
    expect(arg1).toContain('--agent=custom-agent')
    expect(arg1).toContain('--api-addr=1.1.1.1:1337')
    expect(arg1).toContain('--authenticate-api=true')
    expect(arg1).toContain('--host-addr=:1339')
    // skipping module test here because we have a seperate unit test for parseModules
    expect(arg1).toContain('--rpc-addr=:1338')
    expect(arg1).toContain('--sia-directory=bar')
  })
})
