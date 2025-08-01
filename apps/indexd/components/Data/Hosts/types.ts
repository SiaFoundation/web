import { Host } from '@siafoundation/indexd-types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type HostLocation = {
  latitude: number
  longitude: number
  countryCode: string
}

export type HostData = Host & {
  id: string
  usable: boolean
  location?: HostLocation
  exchange?: {
    currency: CurrencyOption
    rate: BigNumber
  }
}
