import {
  bytesToMB,
  MBToBytes,
  monthsToBlocks,
} from '@siafoundation/design-system'
import {
  DNSAWSOptions,
  DNSCloudflareOptions,
  DNSDuckDNSOptions,
  DNSNoIPOptions,
  HostSettings,
} from '@siafoundation/react-hostd'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import {
  humanBaseRpcPrice,
  humanEgressPrice,
  humanIngressPrice,
  humanSectorAccessPrice,
  humanStoragePrice,
} from '../../lib/humanUnits'
import BigNumber from 'bignumber.js'
import { scDecimalPlaces, SettingsData } from './types'

export function transformUp(
  values: SettingsData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingValues: any
): Omit<HostSettings, 'revision'> {
  let dnsOptions = null
  // DNS DuckDNS
  if (values.dnsProvider === 'duckdns') {
    dnsOptions = {
      token: values.dnsDuckDnsToken,
    } as DNSDuckDNSOptions
  }

  // DNS No-IP
  if (values.dnsProvider === 'noip') {
    dnsOptions = {
      email: values.dnsNoIpEmail,
      password: values.dnsNoIpPassword,
    } as DNSNoIPOptions
  }

  // DNS AWS
  if (values.dnsProvider === 'route53') {
    dnsOptions = {
      id: values.dnsAwsId,
      secret: values.dnsAwsSecret,
      zoneID: values.dnsAwsZoneId,
    } as DNSAWSOptions
  }

  // DNS Cloudflare
  if (values.dnsProvider === 'cloudflare') {
    dnsOptions = {
      token: values.dnsCloudflareToken,
      zoneID: values.dnsCloudflareZoneId,
    } as DNSCloudflareOptions
  }

  return {
    ...existingValues,
    // Host settings
    acceptingContracts: values.acceptingContracts,
    netAddress: values.netAddress,
    maxContractDuration: Number(
      values.maxContractDuration.times(monthsToBlocks(1)).toFixed(0)
    ),

    // Pricing
    contractPrice: toHastings(values.contractPrice).toString(),
    baseRPCPrice: values.baseRPCPrice
      .div(toSiacoins(humanBaseRpcPrice(1)))
      .toFixed(0),
    sectorAccessPrice: values.sectorAccessPrice
      .div(toSiacoins(humanSectorAccessPrice(1)))
      .toFixed(0),

    collateralMultiplier: values.collateralMultiplier.toNumber(),
    maxCollateral: toHastings(values.maxCollateral).toString(),

    storagePrice: values.storagePrice
      .div(toSiacoins(humanStoragePrice(1)))
      .toFixed(0),
    egressPrice: values.egressPrice
      .div(toSiacoins(humanEgressPrice(1)))
      .toFixed(0),
    ingressPrice: values.ingressPrice
      .div(toSiacoins(humanIngressPrice(1)))
      .toFixed(0),

    priceTableValidity: Number(
      values.priceTableValidity
        .times(60) // minutes to seconds
        .times(1_000_000_000) // seconds to nanoseconds
        .toFixed(0)
    ),

    // Registry settings
    maxRegistryEntries: Number(values.maxRegistryEntries.toFixed(0)),

    // RHP3 settings
    accountExpiry: Number(
      values.accountExpiry
        .times(60 * 60 * 24) // days to seconds
        .times(1_000_000_000) // seconds to nanoseconds
        .toFixed(0)
    ),
    maxAccountBalance: toHastings(values.maxAccountBalance).toString(),

    // Bandwidth limiter settings
    ingressLimit: Number(MBToBytes(values.ingressLimit).toFixed(0)),
    egressLimit: Number(MBToBytes(values.egressLimit).toFixed(0)),

    // DNS settings
    ddns: {
      ...existingValues?.ddns,
      provider: values.dnsProvider,
      ipv4: values.dnsIpv4,
      ipv6: values.dnsIpv6,
      options: dnsOptions,
    },
  }
}

export function transformDown(s: HostSettings): SettingsData {
  let dnsOptions = null
  // DNS DuckDNS
  if (s.ddns.provider === 'duckdns') {
    dnsOptions = {
      dnsDuckDnsToken: s.ddns.options['token'],
    }
  }

  // DNS No-IP
  if (s.ddns.provider === 'noip') {
    dnsOptions = {
      dnsNoIpEmail: s.ddns.options['email'],
      dnsNoIpPassword: s.ddns.options['password'],
    }
  }

  // DNS AWS
  if (s.ddns.provider === 'route53') {
    dnsOptions = {
      dnsAwsId: s.ddns.options['id'],
      dnsAwsSecret: s.ddns.options['secret'],
      dnsAwsZoneId: s.ddns.options['zoneID'],
    }
  }

  // DNS Cloudflare
  if (s.ddns.provider === 'cloudflare') {
    dnsOptions = {
      dnsCloudflareToken: s.ddns.options['token'],
      dnsCloudflareZoneId: s.ddns.options['zoneID'],
    }
  }

  return {
    // Host settings
    acceptingContracts: s.acceptingContracts,
    netAddress: s.netAddress,
    maxContractDuration: new BigNumber(s.maxContractDuration).div(
      monthsToBlocks(1)
    ),

    // Pricing
    contractPrice: toSiacoins(s.contractPrice, scDecimalPlaces),
    baseRPCPrice: toSiacoins(
      humanBaseRpcPrice(s.baseRPCPrice),
      scDecimalPlaces
    ),
    sectorAccessPrice: toSiacoins(
      humanSectorAccessPrice(s.sectorAccessPrice),
      scDecimalPlaces
    ),

    collateralMultiplier: new BigNumber(s.collateralMultiplier),
    maxCollateral: toSiacoins(s.maxCollateral, scDecimalPlaces),

    storagePrice: toSiacoins(
      humanStoragePrice(s.storagePrice),
      scDecimalPlaces
    ),
    egressPrice: toSiacoins(humanEgressPrice(s.egressPrice), scDecimalPlaces),
    ingressPrice: toSiacoins(
      humanIngressPrice(s.ingressPrice),
      scDecimalPlaces
    ),

    priceTableValidity: new BigNumber(s.priceTableValidity)
      .div(1_000_000_000) // nanoseconds to seconds
      .div(60), // seconds to minutes

    // Registry settings
    maxRegistryEntries: new BigNumber(s.maxRegistryEntries),

    // RHP3 settings
    accountExpiry: new BigNumber(s.accountExpiry)
      .div(1_000_000_000) // nanoseconds to seconds
      .div(60 * 60 * 24), // seconds to days
    maxAccountBalance: toSiacoins(s.maxAccountBalance, scDecimalPlaces),

    // Bandwidth limiter settings
    ingressLimit: bytesToMB(new BigNumber(s.ingressLimit)),
    egressLimit: bytesToMB(new BigNumber(s.egressLimit)),

    // DNS settings
    dnsProvider: s.ddns.provider,
    dnsIpv4: s.ddns.ipv4,
    dnsIpv6: s.ddns.ipv6,

    // DNS options
    ...dnsOptions,
  }
}

export function calculateMaxCollateral(
  storage: BigNumber,
  collateralMultiplier: BigNumber
) {
  return new BigNumber(12960)
    .times(storage)
    .div(monthsToBlocks(1))
    .times(collateralMultiplier)
}
