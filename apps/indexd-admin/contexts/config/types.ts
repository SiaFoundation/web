import { NoUndefined } from '@siafoundation/types'
import { CurrencyId } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type Categories = 'contracts' | 'pricing' | 'other'

export const scDecimalPlaces = 6

// form defaults
export const inputValuesContracts = {
  // contracts
  // enabled: false,
  wantedContracts: undefined as BigNumber | undefined,
  periodWeeks: undefined as BigNumber | undefined,
  renewWindowWeeks: undefined as BigNumber | undefined,
}

export const inputValuesHosts = {
  maxEgressPriceTB: undefined as BigNumber | undefined,
  maxIngressPriceTB: undefined as BigNumber | undefined,
  maxStoragePriceTBMonth: undefined as BigNumber | undefined,
  minCollateral: undefined as BigNumber | undefined,
  minProtocolVersion: undefined as `${number}.${number}.${number}` | undefined,
}

export const inputValuesPricePinning = {
  pinnedCurrency: '' as CurrencyId | '',
  shouldPinMaxStoragePrice: false,
  maxStoragePriceTBMonthPinned: undefined as BigNumber | undefined,
  shouldPinMaxEgressPrice: false,
  maxEgressPriceTBPinned: undefined as BigNumber | undefined,
  shouldPinMaxIngressPrice: false,
  maxIngressPriceTBPinned: undefined as BigNumber | undefined,
  shouldPinMinCollateral: false,
  minCollateralPinned: undefined as BigNumber | undefined,
}

export const inputValues = {
  // contracts
  ...inputValuesContracts,
  // hosts
  ...inputValuesHosts,
  // pricePinning
  ...inputValuesPricePinning,
}

// InputValues: form fields can be undefined when they are cleared.
export type InputValuesContracts = typeof inputValuesContracts
export type InputValuesHosts = typeof inputValuesHosts
export type InputValuesPricePinning = typeof inputValuesPricePinning
export type InputValues = typeof inputValues

// Values: all daemon required fields are present.
export type ValuesContracts = NoUndefined<InputValuesContracts>
export type ValuesHosts = NoUndefined<InputValuesHosts>
export type ValuesPricePinning = NoUndefined<InputValuesPricePinning>
export type Values = NoUndefined<InputValues>
