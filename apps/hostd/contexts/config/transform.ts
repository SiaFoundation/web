import {
  DNSAWSOptions,
  DNSCloudflareOptions,
  DNSDuckDNSOptions,
  DNSNoIPOptions,
  HostSettings,
  HostSettingsPinned,
} from '@siafoundation/hostd-types'
import {
  bytesToMB,
  MBToBytes,
  monthsToBlocks,
  toHastings,
  toSiacoins,
} from '@siafoundation/units'
import {
  humanBaseRpcPrice,
  humanEgressPrice,
  humanIngressPrice,
  humanSectorAccessPrice,
  humanStoragePrice,
} from '../../lib/humanUnits'
import BigNumber from 'bignumber.js'
import {
  defaultValuesSettingsPinned,
  scDecimalPlaces,
  SettingsData,
} from './types'

export function transformUpSettings(
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

export function getCalculatedValues({
  storagePrice,
  collateralMultiplier,
  autoMaxCollateral,
}: {
  storagePrice: BigNumber
  collateralMultiplier: BigNumber
  autoMaxCollateral: boolean
}) {
  const calculatedValues: Partial<SettingsData> = {}
  if (autoMaxCollateral && storagePrice && collateralMultiplier) {
    calculatedValues.maxCollateral = calculateMaxCollateral(
      storagePrice,
      collateralMultiplier
    )
  }
  return calculatedValues
}

export function transformUpSettingsPinned(
  values: SettingsData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingValues: any
): HostSettingsPinned {
  return {
    ...existingValues,
    currency: values.pinnedCurrency,
    threshold: values.pinnedThreshold.div(100).toNumber(),
    storage: {
      pinned: values.shouldPinStoragePrice,
      value: values.storagePricePinned.toNumber(),
    },
    ingress: {
      pinned: values.shouldPinIngressPrice,
      value: values.ingressPricePinned.toNumber(),
    },
    egress: {
      pinned: values.shouldPinEgressPrice,
      value: values.egressPricePinned.toNumber(),
    },
    maxCollateral: {
      pinned: values.shouldPinMaxCollateral,
      value: values.maxCollateralPinned.toNumber(),
    },
  }
}

export function transformDown({
  settings,
  settingsPinned,
}: {
  settings: HostSettings
  settingsPinned?: HostSettingsPinned
}): SettingsData {
  let dnsOptions = null
  // DNS DuckDNS
  if (settings.ddns.provider === 'duckdns') {
    dnsOptions = {
      dnsDuckDnsToken: settings.ddns.options['token'],
    }
  }

  // DNS No-IP
  if (settings.ddns.provider === 'noip') {
    dnsOptions = {
      dnsNoIpEmail: settings.ddns.options['email'],
      dnsNoIpPassword: settings.ddns.options['password'],
    }
  }

  // DNS AWS
  if (settings.ddns.provider === 'route53') {
    dnsOptions = {
      dnsAwsId: settings.ddns.options['id'],
      dnsAwsSecret: settings.ddns.options['secret'],
      dnsAwsZoneId: settings.ddns.options['zoneID'],
    }
  }

  // DNS Cloudflare
  if (settings.ddns.provider === 'cloudflare') {
    dnsOptions = {
      dnsCloudflareToken: settings.ddns.options['token'],
      dnsCloudflareZoneId: settings.ddns.options['zoneID'],
    }
  }

  return {
    // Host settings
    acceptingContracts: settings.acceptingContracts,
    netAddress: settings.netAddress,
    maxContractDuration: new BigNumber(settings.maxContractDuration).div(
      monthsToBlocks(1)
    ),

    // Pricing
    contractPrice: toSiacoins(settings.contractPrice, scDecimalPlaces),
    baseRPCPrice: toSiacoins(
      humanBaseRpcPrice(settings.baseRPCPrice),
      scDecimalPlaces
    ),
    sectorAccessPrice: toSiacoins(
      humanSectorAccessPrice(settings.sectorAccessPrice),
      scDecimalPlaces
    ),

    collateralMultiplier: new BigNumber(settings.collateralMultiplier),

    maxCollateral: toSiacoins(settings.maxCollateral, scDecimalPlaces),
    storagePrice: toSiacoins(
      humanStoragePrice(settings.storagePrice),
      scDecimalPlaces
    ),
    egressPrice: toSiacoins(
      humanEgressPrice(settings.egressPrice),
      scDecimalPlaces
    ),
    ingressPrice: toSiacoins(
      humanIngressPrice(settings.ingressPrice),
      scDecimalPlaces
    ),

    priceTableValidity: new BigNumber(settings.priceTableValidity)
      .div(1_000_000_000) // nanoseconds to seconds
      .div(60), // seconds to minutes

    // RHP3 settings
    accountExpiry: new BigNumber(settings.accountExpiry)
      .div(1_000_000_000) // nanoseconds to seconds
      .div(60 * 60 * 24), // seconds to days
    maxAccountBalance: toSiacoins(settings.maxAccountBalance, scDecimalPlaces),

    // Bandwidth limiter settings
    ingressLimit: bytesToMB(new BigNumber(settings.ingressLimit)),
    egressLimit: bytesToMB(new BigNumber(settings.egressLimit)),

    // DNS settings
    dnsProvider: settings.ddns.provider,
    dnsIpv4: settings.ddns.ipv4,
    dnsIpv6: settings.ddns.ipv6,

    // DNS options
    ...dnsOptions,

    // settings pinned
    ...(settingsPinned
      ? {
          pinnedCurrency: settingsPinned.currency,
          pinnedThreshold: new BigNumber(settingsPinned.threshold).times(100),
          shouldPinMaxCollateral: settingsPinned.maxCollateral.pinned,
          maxCollateralPinned: new BigNumber(
            settingsPinned.maxCollateral.value
          ),

          shouldPinStoragePrice: settingsPinned.storage.pinned,
          storagePricePinned: new BigNumber(settingsPinned.storage.value),

          shouldPinEgressPrice: settingsPinned.egress.pinned,
          egressPricePinned: new BigNumber(settingsPinned.egress.value),

          shouldPinIngressPrice: settingsPinned.ingress.pinned,
          ingressPricePinned: new BigNumber(settingsPinned.ingress.value),
        }
      : defaultValuesSettingsPinned),
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
