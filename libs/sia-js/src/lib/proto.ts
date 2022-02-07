// ClientConfig is the object that is passed to configure the instantiation of the Sia Daemon.
export interface ClientConfig extends Record<string, unknown> {
  apiHost?: string
  apiPort?: number
  hostPort?: number
  rpcPort?: number
  agent?: string
  apiAuthentication?: 'auto' | boolean
  apiAuthenticationPassword?: string
  dataDirectory?: string
  modules?: ModuleConfig
}

// ModuleConfig defines modules available in Sia.
export interface ModuleConfig extends Record<string, unknown> {
  consensus: boolean
  explorer: boolean
  feeManager: boolean
  gateway: boolean
  host: boolean
  miner: boolean
  renter: boolean
  transactionPool: boolean
  wallet: boolean
}

// SiadFlags defines all the possible configurable flag values for the Sia Daemon.
export interface SiadFlags {
  agent?: string
  'api-addr'?: string
  'authenticate-api'?: boolean
  'disable-api-security'?: boolean
  'host-addr'?: string
  modules?: string
  'no-boostrap'?: boolean
  profile?: string
  'profile-directory'?: string
  'rpc-addr'?: string
  'sia-directory'?: string
  'temp-password'?: string
}
