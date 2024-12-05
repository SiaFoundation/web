import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { HostData } from './types'
import { Host, HostAutopilotChecks } from '@siafoundation/renterd-types'
import {
  useHostsAllowlist,
  useHostsBlocklist,
  useHosts,
} from '@siafoundation/renterd-react'
import { ContractData } from '../contracts/types'
import { SiaCentralHost } from '@siafoundation/sia-central-types'
import { Maybe } from '@siafoundation/types'
import { objectEntries } from '@siafoundation/design-system'

export function useDataset({
  response,
  allContracts,
  allowlist,
  blocklist,
  isAllowlistActive,
  geoHosts,
}: {
  response: ReturnType<typeof useHosts>
  allContracts: Maybe<ContractData[]>
  allowlist: ReturnType<typeof useHostsAllowlist>
  blocklist: ReturnType<typeof useHostsBlocklist>
  isAllowlistActive: boolean
  geoHosts: SiaCentralHost[]
}) {
  return useMemo<Maybe<HostData[]>>(() => {
    const allow = allowlist.data
    const block = blocklist.data
    if (!response.data || !allow || !block) {
      return undefined
    }
    return response.data.map((host) => {
      const sch = geoHosts.find((gh) => gh.public_key === host.publicKey)
      return {
        ...getHostFields(host, allContracts),
        ...getAllowedFields({
          host,
          allowlist: allow,
          blocklist: block,
          isAllowlistActive,
        }),
        ...getAutopilotFields(host.checks),
        location: sch?.location,
        countryCode: sch?.country_code,
        // selectable
        onClick: () => null,
        isSelected: false,
      }
    })
  }, [
    response.data,
    allContracts,
    allowlist.data,
    blocklist.data,
    isAllowlistActive,
    geoHosts,
  ])
}

function getHostFields(host: Host, allContracts: Maybe<ContractData[]>) {
  return {
    id: host.publicKey,
    netAddress: host.netAddress,
    publicKey: host.publicKey,
    lastScanSuccess: host.interactions.lastScanSuccess,
    lastScan:
      host.interactions.lastScan === '0001-01-01T00:00:00Z'
        ? undefined
        : host.interactions.lastScan,
    knownSince:
      host.knownSince === '0001-01-01T00:00:00Z' ? undefined : host.knownSince,
    lastAnnouncement:
      host.lastAnnouncement === '0001-01-01T00:00:00Z'
        ? undefined
        : host.lastAnnouncement,
    uptime: new BigNumber(host.interactions.uptime || 0),
    downtime: new BigNumber(host.interactions.downtime || 0),
    successfulInteractions: new BigNumber(
      host.interactions.successfulInteractions || 0
    ),
    totalInteractions: new BigNumber(
      host.interactions.successfulInteractions +
        host.interactions.failedInteractions || 0
    ),
    failedInteractions: new BigNumber(
      host.interactions.failedInteractions || 0
    ),
    totalScans: new BigNumber(host.interactions.totalScans || 0),
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
  usable: boolean
  scoreBreakdown: {
    age: number
    collateral: number
    interactions: number
    storageRemaining: number
    prices: number
    uptime: number
    version: number
  }
  gougingBreakdown: {
    contractErr?: string
    downloadErr?: string
    gougingErr?: string
    uploadErr?: string
    pruneErr?: string
  }
  usabilityBreakdown: {
    blocked: boolean
    gouging: boolean
    lowScore: boolean
    notAcceptingContracts: boolean
    notAnnounced: boolean
    notCompletingScan: boolean
    offline: boolean
    redundantIP: boolean
  }
}): {
  score: BigNumber
  scoreBreakdown: {
    age: BigNumber
    collateral: BigNumber
    interactions: BigNumber
    prices: BigNumber
    storageRemaining: BigNumber
    uptime: BigNumber
    version: BigNumber
  }
  isGouging: boolean
  isUsable: boolean
  gougingBreakdown: {
    contractErr?: string
    downloadErr?: string
    gougingErr?: string
    uploadErr?: string
    pruneErr?: string
  }
  usabilityBreakdown: {
    blocked: boolean
    gouging: boolean
    lowScore: boolean
    notAcceptingContracts: boolean
    notAnnounced: boolean
    notCompletingScan: boolean
    offline: boolean
    redundantIP: boolean
  }
  unusableReasons: string[]
} {
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
    isGouging: Object.values(ahc?.gougingBreakdown || {}).some((v) => v),
    isUsable: !!ahc?.usable,
    gougingBreakdown: ahc?.gougingBreakdown || {},
    usabilityBreakdown: ahc?.usabilityBreakdown || {
      blocked: false,
      gouging: false,
      lowScore: false,
      notAcceptingContracts: false,
      notAnnounced: false,
      notCompletingScan: false,
      offline: false,
      redundantIP: false,
    },
    unusableReasons: ahc
      ? objectEntries(ahc.usabilityBreakdown).reduce((acc, [key, value]) => {
          if (value) {
            return acc.concat(getUnusableReasonLabel(key))
          }
          return acc
        }, [] as string[])
      : [],
  }
}

function getUnusableReasonLabel(
  key: keyof HostAutopilotChecks['usabilityBreakdown']
): string {
  switch (key) {
    case 'blocked':
      return 'Host is blocked'
    case 'gouging':
      return 'Host is gouging'
    case 'lowScore':
      return 'Host has low score'
    case 'notAcceptingContracts':
      return 'Host is not accepting contracts'
    case 'notAnnounced':
      return 'Host is not announced'
    case 'notCompletingScan':
      return 'Host is not completing scan'
    case 'offline':
      return 'Host is offline'
    case 'redundantIP':
      return 'Host has redundant IP'
    default:
      return 'Unknown'
  }
}
