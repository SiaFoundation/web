import { HostData } from './types'
import { BigNumber } from 'bignumber.js'
import { Host } from '@siafoundation/indexd-types'
import {
  CurrencyDisplayPreference,
  CurrencyOption,
} from '@siafoundation/react-core'
import {
  egressPriceInHastingsPerTBPerMonth,
  GBToBytes,
  countryCodeEmoji,
  getCountryName,
  humanBytes,
  ingressPriceInHastingsPerTBPerMonth,
  storagePriceInHastingsPerTBPerMonth,
  sectorsToBytes,
  blocksToWeeks,
} from '@siafoundation/units'
import { getCurrencyDisplayPropsPreferred } from '@siafoundation/design-system'
import { getV2HostSettingsProtcolVersion } from '@siafoundation/types'

export function transformHost(
  host: Host,
  {
    location,
    currencyDisplay,
    exchange,
  }: {
    location?: { countryCode: string; latitude: number; longitude: number }
    currencyDisplay: CurrencyDisplayPreference
    exchange?: { currency: CurrencyOption; rate: BigNumber }
  },
): HostData {
  const datum: HostData = {
    ...host,
    id: host.publicKey,
    usable: Object.values(host.usability).every((value) => value),
    location: location || {
      countryCode: 'unknown',
      latitude: 0,
      longitude: 0,
    },
    exchange,
    displayFields: transformHostDisplayFields(
      host,
      location,
      currencyDisplay,
      exchange,
    ),
  }
  return datum
}

function transformHostDisplayFields(
  host: Host,
  location:
    | { countryCode: string; latitude: number; longitude: number }
    | undefined,
  currencyDisplay: CurrencyDisplayPreference,
  exchange?: { currency: CurrencyOption; rate: BigNumber },
) {
  const remainingStorageBytes = sectorsToBytes(host.settings.remainingStorage)
  const lowStorageThresholdBytes = GBToBytes(10)
  const remainingStorageUsability: 'usable' | 'warning' | 'unusable' =
    remainingStorageBytes.eq(0)
      ? 'unusable'
      : remainingStorageBytes.lt(lowStorageThresholdBytes)
        ? 'warning'
        : 'usable'
  return {
    uptime: `${(host.recentUptime * 100).toFixed(1)}%`,
    totalStorage: humanBytes(sectorsToBytes(host.settings.totalStorage)),
    remainingStorage: humanBytes(remainingStorageBytes),
    remainingStorageUsability,
    storagePrice: getCurrencyDisplayPropsPreferred({
      sc: storagePriceInHastingsPerTBPerMonth({
        price: host.settings.prices.storagePrice,
      }),
      currencyDisplay,
      exchange,
    }),
    ingressPrice: getCurrencyDisplayPropsPreferred({
      sc: ingressPriceInHastingsPerTBPerMonth({
        price: host.settings.prices.ingressPrice,
      }),
      currencyDisplay,
      exchange,
    }),
    egressPrice: getCurrencyDisplayPropsPreferred({
      sc: egressPriceInHastingsPerTBPerMonth({
        price: host.settings.prices.egressPrice,
      }),
      currencyDisplay,
      exchange,
    }),
    freeSectorPrice: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(host.settings.prices.freeSectorPrice),
      currencyDisplay,
      exchange,
    }),
    maxCollateral: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(host.settings.prices.collateral),
      currencyDisplay,
      exchange,
    }),
    maxContractDuration: `${blocksToWeeks(host.settings.maxContractDuration).toFixed(1)} weeks`,
    protocolVersion: getV2HostSettingsProtcolVersion(host.settings),
    priceValidity: new Date(host.settings.prices.validUntil).toLocaleString(),
    release: host.settings.release,
    countryName: getCountryName(location?.countryCode),
    countryFlag: countryCodeEmoji(location?.countryCode),
  }
}
