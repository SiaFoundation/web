import {
  bytesToMB,
  MBToBytes,
  monthsToBlocks,
  TBToBytes,
} from '@siafoundation/design-system'
import {
  DNSAWSOptions,
  DNSCloudflareOptions,
  DNSDuckDNSOptions,
  DNSNoIPOptions,
  HostSettings,
} from '@siafoundation/react-hostd'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { scDecimalPlaces, SettingsData } from './fields'

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
      ID: values.dnsAwsId,
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
    baseRPCPrice: toHastings(values.baseRPCPrice).div(1e7).toString(),
    sectorAccessPrice: toHastings(values.sectorAccessPrice).div(1e7).toString(),

    collateral: toHastings(
      values.collateral.div(TBToBytes(1)).div(monthsToBlocks(1))
    ).toString(),
    maxCollateral: toHastings(values.maxCollateral).toString(),

    minStoragePrice: toHastings(
      values.minStoragePrice.div(TBToBytes(1)).div(monthsToBlocks(1))
    ).toString(),
    minEgressPrice: toHastings(
      values.minEgressPrice.div(TBToBytes(1))
    ).toString(),
    minIngressPrice: toHastings(
      values.minIngressPrice.div(TBToBytes(1))
    ).toString(),

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
    dynDNS: {
      ...existingValues?.dynDNS,
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
  if (s.dynDNS.provider === 'duckdns') {
    dnsOptions = {
      dnsDuckDnsToken: s.dynDNS.options['token'],
    }
  }

  // DNS No-IP
  if (s.dynDNS.provider === 'noip') {
    dnsOptions = {
      dnsNoIpEmail: s.dynDNS.options['email'],
      dnsNoIpPassword: s.dynDNS.options['password'],
    }
  }

  // DNS AWS
  if (s.dynDNS.provider === 'route53') {
    dnsOptions = {
      dnsAwsId: s.dynDNS.options['ID'],
      dnsAwsSecret: s.dynDNS.options['secret'],
      dnsAwsZoneId: s.dynDNS.options['zoneID'],
    }
  }

  // DNS Cloudflare
  if (s.dynDNS.provider === 'cloudflare') {
    dnsOptions = {
      dnsCloudflareToken: s.dynDNS.options['token'],
      dnsCloudflareZoneId: s.dynDNS.options['zoneID'],
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
      new BigNumber(s.baseRPCPrice).times(1e7), // per PRC to per million RPCs
      scDecimalPlaces
    ),
    sectorAccessPrice: toSiacoins(
      new BigNumber(s.sectorAccessPrice).times(1e7), // per 1 access to per million access
      scDecimalPlaces
    ),

    collateral: toSiacoins(
      new BigNumber(s.collateral).times(TBToBytes(1)).times(monthsToBlocks(1)),
      scDecimalPlaces
    ),
    maxCollateral: toSiacoins(s.maxCollateral, scDecimalPlaces),

    minStoragePrice: toSiacoins(
      new BigNumber(s.minStoragePrice)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1)),
      scDecimalPlaces
    ),
    minEgressPrice: toSiacoins(
      new BigNumber(s.minEgressPrice).times(TBToBytes(1)),
      scDecimalPlaces
    ),
    minIngressPrice: toSiacoins(
      new BigNumber(s.minIngressPrice).times(TBToBytes(1)),
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
    dnsProvider: s.dynDNS.provider,
    dnsIpv4: s.dynDNS.ipv4,
    dnsIpv6: s.dynDNS.ipv6,

    // DNS options
    ...dnsOptions,
  }
}
