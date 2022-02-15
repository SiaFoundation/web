import { parseFlags, parseModules } from './flags'
import { ClientConfig, ModuleConfig } from './proto'

describe('flags', () => {
  it('return full set of modules', () => {
    const moduleConfig: ModuleConfig = {
      consensus: true,
      explorer: true,
      feeManager: true,
      gateway: true,
      host: true,
      miner: true,
      renter: true,
      transactionPool: true,
      wallet: true,
    }
    const m = parseModules(moduleConfig)
    expect(m).toBe('cefghmrtw')
  })

  // parseFlags

  const FULL_CONFIG: ClientConfig = {
    agent: 'foo',
    apiAuthentication: true,
    apiAuthenticationPassword: 'xyz',
    dataDirectory: 'bar',
    modules: {
      consensus: true,
      explorer: true,
      feeManager: true,
      gateway: true,
      host: true,
      miner: true,
      renter: true,
      transactionPool: true,
      wallet: true,
    },
  }

  it('ensure default flags return same length', () => {
    const config: ClientConfig = {}
    const flagList = parseFlags(config)
    expect(flagList.length).toBe(3)
  })

  it('ensure custom flags return more flags', () => {
    const flagList = parseFlags(FULL_CONFIG)
    expect(flagList.length).toBe(7)
  })

  it('ensure string flags are printed out correctly', () => {
    const flagList = parseFlags(FULL_CONFIG)
    expect(flagList).toContain('--agent=foo')
    expect(flagList).toContain('--api-addr=localhost:9980')
    expect(flagList).toContain('--authenticate-api=true')
    expect(flagList).toContain('--host-addr=:9982')
    expect(flagList).toContain('--modules=cefghmrtw')
    expect(flagList).toContain('--rpc-addr=:9981')
    expect(flagList).toContain('--sia-directory=bar')
  })
})
