import { ClientConfig, ModuleConfig, SiadFlags } from './proto'
import { assignDefined } from './utils'

/**
 * Creates a list of flags ready to be consumed by the spawn process.
 * @param config
 */
export function parseFlags(config: ClientConfig): string[] {
  // Default flags used in the Sia Daemon.
  const defaultFlags: SiadFlags = {
    'api-addr': 'localhost:9980',
    'authenticate-api': false,
    'disable-api-security': false,
    'host-addr': ':9982',
    'rpc-addr': ':9981',
  }
  // Build flag arguements from constructor details
  const flags = assignDefined(defaultFlags as Record<string, unknown>, {
    agent: config.agent,
    'api-addr':
      config.apiHost && config.apiPort
        ? `${config.apiHost}:${config.apiPort}`
        : null,
    // If auto, we are going to attempt to resolve api password through the default sia file.
    'authenticate-api':
      config.apiAuthentication === 'auto' ? null : config.apiAuthentication,
    'host-addr': config.hostPort ? `:${config.hostPort}` : null,
    modules: config.modules ? parseModules(config.modules) : null,
    'rpc-addr': config.rpcPort ? `:${config.rpcPort}` : null,
    'sia-directory': config.dataDirectory,
  })
  // Create flag string list to pass to siad
  const filterFlags = (key: string) => flags[key] !== false
  const mapFlags = (key: string) => `--${key}=${flags[key]}`
  const flagList = Object.keys(flags).filter(filterFlags).map(mapFlags)
  return flagList
}

/**
 * Returns a module string that can be passed as a flag value to siad.
 * @param modules
 */
export function parseModules(modules: ModuleConfig): string {
  const moduleMap: Record<string, string> = {
    consensus: 'c',
    explorer: 'e',
    feeManager: 'f',
    gateway: 'g',
    host: 'h',
    miner: 'm',
    renter: 'r',
    transactionPool: 't',
    wallet: 'w',
  }

  let enabledModules = ''
  Object.keys(modules).forEach((k) => {
    if (modules[k]) {
      enabledModules += moduleMap[k]
    }
  })
  return enabledModules
}
