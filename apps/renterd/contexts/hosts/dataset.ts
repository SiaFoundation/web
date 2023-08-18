import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { HostData } from './types'
import {
  Host,
  useAutopilotHostsSearch,
  useHostsAllowlist,
  useHostsBlocklist,
  useHostsSearch,
} from '@siafoundation/react-renterd'
import { ContractData } from '../contracts/types'
import { useApp } from '../app'
import { SiaCentralHost } from '@siafoundation/react-core'

export function useDataset({
  autopilotStatus,
  regularResponse,
  autopilotResponse,
  allContracts,
  allowlist,
  blocklist,
  isAllowlistActive,
  geoHosts,
  onHostSelect,
}: {
  autopilotStatus: ReturnType<typeof useApp>['autopilot']['status']
  regularResponse: ReturnType<typeof useHostsSearch>
  autopilotResponse: ReturnType<typeof useAutopilotHostsSearch>
  allContracts: ContractData[]
  allowlist: ReturnType<typeof useHostsAllowlist>
  blocklist: ReturnType<typeof useHostsBlocklist>
  isAllowlistActive: boolean
  geoHosts: SiaCentralHost[]
  onHostSelect: (publicKey: string, location?: [number, number]) => void
}) {
  return useMemo<HostData[] | null>(() => {
    if (autopilotStatus === 'off') {
      return (
        regularResponse.data?.map((host) => {
          const sch = geoHosts.find((gh) => gh.public_key === host.publicKey)
          return {
            onClick: () => onHostSelect(host.publicKey, sch?.location),
            ...getHostFields(host, allContracts),
            ...getAllowedFields({
              host,
              allowlist: allowlist.data,
              blocklist: blocklist.data,
              isAllowlistActive,
            }),
            ...getAutopilotFields(),
            location: sch?.location,
            countryCode: sch?.country_code,
          }
        }) || null
      )
    } else if (autopilotStatus === 'on') {
      return (
        autopilotResponse.data?.map((ah) => {
          const sch = geoHosts.find((gh) => gh.public_key === ah.host.publicKey)
          return {
            onClick: () => onHostSelect(ah.host.publicKey, sch?.location),
            ...getHostFields(ah.host, allContracts),
            ...getAllowedFields({
              host: ah.host,
              allowlist: allowlist.data,
              blocklist: blocklist.data,
              isAllowlistActive,
            }),
            ...getAutopilotFields(ah.checks),
            location: sch?.location,
            countryCode: sch?.country_code,
          }
        }) || null
      )
    }
    return null
  }, [
    onHostSelect,
    autopilotStatus,
    regularResponse.data,
    autopilotResponse.data,
    allContracts,
    allowlist.data,
    blocklist.data,
    isAllowlistActive,
    geoHosts,
  ])
}

function getHostFields(host: Host, allContracts: ContractData[]) {
  return {
    id: host.publicKey,
    netAddress: host.netAddress,
    publicKey: host.publicKey,
    lastScanSuccess: host.interactions.LastScanSuccess,
    lastScan: host.interactions.LastScan,
    knownSince: host.knownSince,
    uptime: new BigNumber(host.interactions.Uptime || 0),
    downtime: new BigNumber(host.interactions.Downtime || 0),
    successfulInteractions: new BigNumber(
      host.interactions.SuccessfulInteractions || 0
    ),
    totalInteractions: new BigNumber(
      host.interactions.SuccessfulInteractions +
        host.interactions.FailedInteractions || 0
    ),
    failedInteractions: new BigNumber(
      host.interactions.FailedInteractions || 0
    ),
    totalScans: new BigNumber(host.interactions.TotalScans || 0),
    activeContractsCount: new BigNumber(
      allContracts?.filter((c) => c.hostKey === host.publicKey).length || 0
    ),
    activeContracts:
      allContracts?.filter((c) => c.hostKey === host.publicKey) || [],
    priceTable: host.priceTable,
    settings: host.settings,
  }
}

function getAllowedFields({
  host,
  allowlist,
  blocklist,
  isAllowlistActive,
}: {
  host: Host
  allowlist: string[]
  blocklist: string[]
  isAllowlistActive: boolean
}) {
  const isOnAllowlist = !!allowlist?.find((a) => a === host.publicKey)
  const allowed = !isAllowlistActive || isOnAllowlist
  const isOnBlocklist = !!blocklist?.find((b) => {
    if (b === host.netAddress) {
      return true
    }
    try {
      const hostname = new URL('https://' + host.netAddress).hostname
      return b === hostname
    } catch (e) {
      return false
    }
  })
  const isBlocked = isOnBlocklist || !allowed
  return {
    isOnAllowlist,
    isOnBlocklist,
    isBlocked,
  }
}

function getAutopilotFields(ahc?: {
  score: number
  gougingBreakdown: {
    v2: {
      contractErr?: string
      downloadErr?: string
      gougingErr?: string
      uploadErr?: string
    }
    v3: {
      contractErr?: string
      downloadErr?: string
      gougingErr?: string
      uploadErr?: string
    }
  }
  gouging: boolean
  scoreBreakdown: {
    age: number
    collateral: number
    interactions: number
    prices: number
    storageRemaining: number
    uptime: number
    version: number
  }
  unusableReasons: string[]
  usable: boolean
}) {
  return {
    score: new BigNumber(ahc?.score || 0),
    scoreBreakdown: {
      age: new BigNumber(ahc?.scoreBreakdown.age || 0),
      collateral: new BigNumber(ahc?.scoreBreakdown.collateral || 0),
      interactions: new BigNumber(ahc?.scoreBreakdown.interactions || 0),
      prices: new BigNumber(ahc?.scoreBreakdown.prices || 0),
      storageRemaining: new BigNumber(
        ahc?.scoreBreakdown.storageRemaining || 0
      ),
      uptime: new BigNumber(ahc?.scoreBreakdown.uptime || 0),
      version: new BigNumber(ahc?.scoreBreakdown.version || 0),
    },
    gougingBreakdown: ahc?.gougingBreakdown || {
      v2: {},
      v3: {},
    },
    gouging: ahc?.gouging,
    unusableReasons: ahc?.unusableReasons || [],
    usable: ahc?.usable,
  }
}
