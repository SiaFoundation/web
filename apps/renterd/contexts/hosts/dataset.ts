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

export function useDataset({
  autopilotState,
  regularResponse,
  autopilotResponse,
  allContracts,
  allowlist,
  blocklist,
  isAllowlistActive,
}: {
  autopilotState: ReturnType<typeof useApp>['autopilot']['state']
  regularResponse: ReturnType<typeof useHostsSearch>
  autopilotResponse: ReturnType<typeof useAutopilotHostsSearch>
  allContracts: ContractData[]
  allowlist: ReturnType<typeof useHostsAllowlist>
  blocklist: ReturnType<typeof useHostsBlocklist>
  isAllowlistActive: boolean
}) {
  return useMemo<HostData[] | null>(() => {
    if (autopilotState === 'off') {
      return (
        regularResponse.data?.map((host) => {
          return {
            ...getHostFields(host, allContracts),
            ...getAllowedFields({
              host,
              allowlist: allowlist.data,
              blocklist: blocklist.data,
              isAllowlistActive,
            }),
            ...getAutopilotFields(),
          }
        }) || null
      )
    } else if (autopilotState === 'on') {
      return (
        autopilotResponse.data?.map((ah) => {
          return {
            ...getHostFields(ah.host, allContracts),
            ...getAllowedFields({
              host: ah.host,
              allowlist: allowlist.data,
              blocklist: blocklist.data,
              isAllowlistActive,
            }),
            ...getAutopilotFields(ah),
          }
        }) || null
      )
    }
    return null
  }, [
    autopilotState,
    regularResponse.data,
    autopilotResponse.data,
    allContracts,
    allowlist.data,
    blocklist.data,
    isAllowlistActive,
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
    activeContracts: new BigNumber(
      allContracts?.filter((c) => c.hostKey === host.publicKey).length || 0
    ),
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

function getAutopilotFields(ah?: {
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
    score: new BigNumber(ah?.score || 0),
    scoreBreakdown: {
      age: new BigNumber(ah?.scoreBreakdown.age || 0),
      collateral: new BigNumber(ah?.scoreBreakdown.collateral || 0),
      interactions: new BigNumber(ah?.scoreBreakdown.interactions || 0),
      prices: new BigNumber(ah?.scoreBreakdown.prices || 0),
      storageRemaining: new BigNumber(ah?.scoreBreakdown.storageRemaining || 0),
      uptime: new BigNumber(ah?.scoreBreakdown.uptime || 0),
      version: new BigNumber(ah?.scoreBreakdown.version || 0),
    },
    gougingBreakdown: ah?.gougingBreakdown || {
      v2: {},
      v3: {},
    },
    gouging: ah?.gouging,
    unusableReasons: ah?.unusableReasons || [],
    usable: ah?.usable,
  }
}
