import { HostData } from './types'
import { BigNumber } from 'bignumber.js'
import { Host } from '@siafoundation/indexd-types'
import { CurrencyOption } from '@siafoundation/react-core'

export function transformHost(
  host: Host,
  {
    geo,
    exchange,
  }: {
    geo?: {
      publicKey: string
      location: { countryCode: string; latitude: number; longitude: number }
    }[]
    exchange?: { currency: CurrencyOption; rate: BigNumber }
  },
): HostData {
  const datum: HostData = {
    ...host,
    id: host.publicKey,
    usable: Object.values(host.usability).every((value) => value),
    location: geo?.find((h) => h.publicKey === host.publicKey)?.location || {
      countryCode: 'unknown',
      latitude: 0,
      longitude: 0,
    },
    exchange,
    sortFields: {
      storagePrice: new BigNumber(host.settings.prices.storagePrice),
      ingressPrice: new BigNumber(host.settings.prices.ingressPrice),
      egressPrice: new BigNumber(host.settings.prices.egressPrice),
      freeSectorPrice: new BigNumber(host.settings.prices.freeSectorPrice),
      maxCollateral: new BigNumber(host.settings.prices.collateral),
    },
  }
  return datum
}
