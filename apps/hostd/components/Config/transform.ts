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

    storagePrice: toHastings(
      values.storagePrice.div(TBToBytes(1)).div(monthsToBlocks(1))
    ).toString(),
    egressPrice: toHastings(values.egressPrice.div(TBToBytes(1))).toString(),
    ingressPrice: toHastings(values.ingressPrice.div(TBToBytes(1))).toString(),

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
      dnsAwsId: s.ddns.options['ID'],
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

    storagePrice: toSiacoins(
      new BigNumber(s.storagePrice)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1)),
      scDecimalPlaces
    ),
    egressPrice: toSiacoins(
      new BigNumber(s.egressPrice).times(TBToBytes(1)),
      scDecimalPlaces
    ),
    ingressPrice: toSiacoins(
      new BigNumber(s.ingressPrice).times(TBToBytes(1)),
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
