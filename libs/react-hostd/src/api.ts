import {
  useGetSwr,
  usePostFunc,
  usePutFunc,
  usePostSwr,
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
  FileContractID,
  PublicKey,
  getTestnetZenBlockHeight,
  getMainnetBlockHeight,
  Currency,
  usePutSwr,
  useDeleteFunc,
  delay,
  TransactionID,
  usePatchFunc,
} from '@siafoundation/react-core'
import useSWR from 'swr'
import { Contract, ContractStatus, WalletTransaction } from './siaTypes'

// state

export type StateHost = {
  publicKey: string
  walletAddress: string
  network: 'Mainnet' | 'Zen Testnet'
  version: string
  commit: string
  os: string
  buildTime: string
}

export const stateHostKey = '/state/host'

export function useStateHost(args?: HookArgsSwr<void, StateHost>) {
  return useGetSwr({
    ...args,
    route: stateHostKey,
  })
}

export type StateConsensus = {
  chainIndex: {
    height: number
    id: string
  }
  synced: boolean
}

export function useStateConsensus(args?: HookArgsSwr<void, StateConsensus>) {
  return useGetSwr({
    ...args,
    route: '/state/consensus',
  })
}

export function useEstimatedNetworkBlockHeight(): number {
  const state = useStateHost({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const res = useSWR(
    state,
    () => {
      if (state.data?.network === 'Zen Testnet') {
        return getTestnetZenBlockHeight()
      }
      return getMainnetBlockHeight()
    },
    {
      refreshInterval: 60_000,
      keepPreviousData: true,
    }
  )
  return res.data || 0
}

// syncer

type Peer = {
  address: string
  version: string
}

const syncerPeers = '/syncer/peers'

export function useSyncerPeers(args?: HookArgsSwr<void, Peer[]>) {
  return useGetSwr({
    ...args,
    route: syncerPeers,
  })
}

export function useSyncerConnect(
  args?: HookArgsCallback<void, { address: string }, never>
) {
  return usePutFunc(
    {
      ...args,
      route: '/syncer/peers',
    },
    async (mutate) => {
      mutate((key) => key === syncerPeers)
    }
  )
}

// wallet

type WalletResponse = {
  scanHeight: number
  address: string
  spendable: string
  confirmed: string
  unconfirmed: string
}

export function useWallet(args?: HookArgsSwr<void, WalletResponse>) {
  return useGetSwr({
    ...args,
    route: '/wallet',
  })
}

export function useWalletTransactions(
  args?: HookArgsSwr<{ limit?: number; offset?: number }, WalletTransaction[]>
) {
  return useGetSwr({
    ...args,
    route: '/wallet/transactions',
  })
}

const walletPendingRoute = '/wallet/pending'
export function useWalletPending(
  args?: HookArgsSwr<void, WalletTransaction[]>
) {
  return useGetSwr({
    ...args,
    route: walletPendingRoute,
  })
}

type WalletSendRequest = {
  amount: string
  address: string
}

export function useWalletSend(
  args?: HookArgsCallback<void, WalletSendRequest, TransactionID>
) {
  return usePostFunc({ ...args, route: '/wallet/send' }, async (mutate) => {
    await delay(2_000)
    mutate((key) => {
      return (
        // key.startsWith(txPoolTransactionsRoute) ||
        key.startsWith(walletPendingRoute)
      )
    })
  })
}

// txpool

export function useTxPoolFee(args?: HookArgsSwr<void, Currency>) {
  return useGetSwr({
    ...args,
    route: '/tpool/fee',
  })
}

// contracts

export type ContractFilterSortField =
  | 'status'
  | 'negotiationHeight'
  | 'expirationHeight'

export type ContractFilterRequest = {
  // filters
  statuses?: ContractStatus[]
  contractIDs?: FileContractID[]
  renewedFrom?: FileContractID[]
  renewedTo?: FileContractID[]
  renterKey?: PublicKey[]

  minNegotiationHeight?: number
  maxNegotiationHeight?: number

  minExpirationHeight?: number
  maxExpirationHeight?: number

  // pagination
  limit?: number
  offset?: number

  // sorting
  sortField?: ContractFilterSortField
  sortDesc?: boolean
}

export type ContractFilterResponse = {
  contracts: Contract[]
  count: number
}

const contractsRoute = '/contracts'
export function useContracts(
  args: HookArgsWithPayloadSwr<
    void,
    ContractFilterRequest,
    ContractFilterResponse
  >
) {
  return usePostSwr({
    ...args,
    route: contractsRoute,
  })
}

export function useContractsIntegrityCheck(
  args?: HookArgsCallback<{ id: string }, void, void>
) {
  return usePutFunc({ ...args, route: '/contracts/:id/integrity' })
}

// metrics

// Revenue is a collection of metrics related to revenue.
type Revenue = {
  rpc: string
  storage: string
  ingress: string
  egress: string
  registryRead: string
  registryWrite: string
}

// Data is a collection of metrics related to data usage.
type Data = {
  // Ingress returns the number of bytes received by the host.
  ingress: number
  // Egress returns the number of bytes sent by the host.
  egress: number
}

// Contracts is a collection of metrics related to contracts.
type Contracts = {
  pending: number
  active: number
  rejected: number
  failed: number
  successful: number
  lockedCollateral: string
  riskedCollateral: string
}

// Pricing is a collection of metrics related to the host's pricing settings.
type Pricing = {
  contractPrice: string
  ingressPrice: string
  egressPrice: string
  baseRPCPrice: string
  sectorAccessPrice: string
  storagePrice: string
  collateralMultiplier: number
}

// Registry is a collection of metrics related to the host's registry.
type Registry = {
  entries: number
  maxEntries: number

  reads: number
  writes: number
}

// Storage is a collection of metrics related to storage.
type Storage = {
  totalSectors: number
  physicalSectors: number
  contractSectors: number
  tempSectors: number
  reads: number
  writes: number
}

// RevenueMetrics is a collection of metrics related to revenue.
type RevenueMetrics = {
  potential: Revenue
  earned: Revenue
}

// DataMetrics is a collection of metrics related to data usage.
type DataMetrics = {
  rhp2: Data
  rhp3: Data
}

type Metrics = {
  revenue: RevenueMetrics
  pricing: Pricing
  contracts: Contracts
  storage: Storage
  registry: Registry
  data: DataMetrics
  balance: string
  timestamp: string
}

const metricsRoute = '/metrics'
export function useMetrics(args?: HookArgsSwr<{ timestamp: string }, Metrics>) {
  return useGetSwr({
    ...args,
    route: metricsRoute,
  })
}

type Interval =
  | '5m'
  | '15m'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

const metricsPeriodRoute = '/metrics/:interval'
export function useMetricsPeriod(
  args?: HookArgsSwr<
    { interval: Interval; start: string; periods?: number },
    Metrics[]
  >
) {
  return useGetSwr({
    ...args,
    route: metricsPeriodRoute,
  })
}

// settings

// DuckDNS
export type DNSDuckDNSOptions = {
  token: string
}

// No-IP
export type DNSNoIPOptions = {
  email: string
  password: string
}

// AWS
export type DNSAWSOptions = {
  id: string
  secret: string
  zoneID: string
}

// Cloudflare
export type DNSCloudflareOptions = {
  token: string
  zoneID: string
}

export type DNSProvider = '' | 'route53' | 'noip' | 'duckdns' | 'cloudflare'

type DNSSettings = {
  provider: DNSProvider
  ipv4: boolean
  ipv6: boolean
  options:
    | DNSDuckDNSOptions
    | DNSNoIPOptions
    | DNSAWSOptions
    | DNSCloudflareOptions
}

export type HostSettings = {
  // Host settings
  acceptingContracts: boolean
  netAddress: string
  maxContractDuration: number

  // Pricing
  contractPrice: Currency
  baseRPCPrice: Currency
  sectorAccessPrice: Currency

  collateralMultiplier: number
  maxCollateral: Currency

  storagePrice: Currency
  egressPrice: Currency
  ingressPrice: Currency

  priceTableValidity: number

  // Registry settings
  maxRegistryEntries: number

  // RHP3 settings
  accountExpiry: number
  maxAccountBalance: Currency

  // Bandwidth limiter settings
  ingressLimit: number
  egressLimit: number

  // DNS settings
  ddns: DNSSettings

  revision: number
}

const settingsRoute = '/settings'
export function useSettings(args?: HookArgsSwr<void, HostSettings>) {
  return useGetSwr({
    ...args,
    route: settingsRoute,
  })
}

export function useSettingsUpdate(
  args?: HookArgsCallback<void, Partial<HostSettings>, HostSettings>
) {
  return usePatchFunc({ ...args, route: '/settings' }, async (mutate) => {
    await mutate((key) => {
      return key.startsWith(settingsRoute)
    })
  })
}

export function useSettingsAnnounce(args?: HookArgsCallback<void, void, void>) {
  return usePostFunc({ ...args, route: '/settings/announce' })
}

export function useSettingsDdnsUpdate(
  args?: HookArgsCallback<void, void, void>
) {
  return usePutFunc({ ...args, route: '/settings/ddns/update' })
}

export function useSettingsDdns(
  args?: HookArgsWithPayloadSwr<void, void, void>
) {
  return usePutSwr({ ...args, payload: {}, route: '/settings/ddns/update' })
}

// volumes

export type Volume = {
  id: number
  localPath: string
  usedSectors: number
  totalSectors: number
  readOnly: boolean
  available: boolean
}

export type VolumeStatus =
  | 'unavailable'
  | 'creating'
  | 'resizing'
  | 'removing'
  | 'ready'

export type VolumeStats = {
  failedReads: number
  failedWrites: number
  successfulReads: number
  successfulWrites: number
  status: VolumeStatus
  errors: string[]
}

export type VolumeMeta = Volume & VolumeStats

export function useVolumes(args?: HookArgsSwr<void, VolumeMeta[]>) {
  return useGetSwr({ ...args, route: '/volumes' })
}

export function useVolume(args?: HookArgsSwr<{ id: string }, VolumeMeta>) {
  return useGetSwr({ ...args, route: '/volumes/:id' })
}

const volumesRoute = '/volumes'
export function useVolumeCreate(
  args?: HookArgsCallback<
    void,
    { localPath: string; maxSectors: number },
    Volume
  >
) {
  return usePostFunc({ ...args, route: volumesRoute }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(volumesRoute)
    })
  })
}

export function useVolumeUpdate(
  args?: HookArgsCallback<{ id: number }, { readOnly: boolean }, void>
) {
  return usePutFunc({ ...args, route: '/volumes/:id' }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(volumesRoute)
    })
  })
}

export function useVolumeDelete(
  args?: HookArgsCallback<{ id: number; force?: boolean }, void, void>
) {
  return useDeleteFunc({ ...args, route: '/volumes/:id' }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(volumesRoute)
    })
  })
}

export function useVolumeResize(
  args?: HookArgsCallback<{ id: number }, { maxSectors: number }, void>
) {
  return usePutFunc(
    { ...args, route: '/volumes/:id/resize' },
    async (mutate) => {
      await delay(10_000)
      mutate((key) => {
        return key.startsWith(volumesRoute)
      })
    }
  )
}

export function useVolumeCancel(
  args?: HookArgsCallback<{ id: number }, void, void>
) {
  return useDeleteFunc(
    { ...args, route: '/volumes/:id/cancel' },
    async (mutate) => {
      await delay(3_000)
      mutate((key) => {
        return key.startsWith(volumesRoute)
      })
    }
  )
}

export type SystemDirResponse = {
  path: string
  totalBytes: number
  freeBytes: number
  directories: string[]
}

export function useSystemDirectory(
  args: HookArgsSwr<{ path: string }, SystemDirResponse>
) {
  return useGetSwr({ ...args, route: '/system/dir' })
}

export function useSystemDirectoryCreate(
  args?: HookArgsCallback<void, { path: string }, void>
) {
  return usePutFunc({ ...args, route: '/system/dir' })
}

// logs

type LogEntry = {
  timestamp: string
  level: string
  name: string
  caller: string
  message: string
  fields: Record<string, unknown>
}

export function useLogsSearch(
  args: HookArgsWithPayloadSwr<
    void,
    {
      names?: string[]
      callers?: string[]
      levels?: string[]
      before?: string
      after?: string
      limit?: number
      offset?: number
    },
    { count: number; entries: LogEntry[] }
  >
) {
  return usePostSwr({ ...args, route: '/log/entries' })
}

// alerts

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'

export type Alert = {
  id: string
  severity: AlertSeverity
  message: string
  data: {
    contractID?: number
    blockHeight?: number
    resolution?: string
    volume?: string
    volumeID?: number

    elapsed?: number
    error?: string

    checked?: number
    missing?: number
    corrupt?: number
    total?: number

    oldSectors?: number
    currentSectors?: number
    targetSectors?: number
    migratedSectors?: number

    migrated?: number
    target?: number

    force?: boolean
  }
  timestamp: string
}

const alertsRoute = '/alerts'

export function useAlerts(args?: HookArgsSwr<void, Alert[]>) {
  return useGetSwr({ ...args, route: alertsRoute })
}

export function useAlertsDismiss(
  args?: HookArgsCallback<void, string[], void>
) {
  return usePostFunc({ ...args, route: '/alerts/dismiss' }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(alertsRoute)
    })
  })
}
