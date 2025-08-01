import BigNumber from 'bignumber.js'
import {
  displayStoragePricePerTBPerMonth,
  displayEgressPricePerTBPerMonth,
  displayIngressPricePerTBPerMonth,
} from './storage'

test('storage', () => {
  expect(
    displayStoragePricePerTBPerMonth({
      price: '1e9',
    }),
  ).toEqual('4.320 SC/TB/month')
})

test('storage fiat', () => {
  expect(
    displayStoragePricePerTBPerMonth({
      price: '1e9',
      exchange: { currency: { prefix: '$' }, rate: new BigNumber(2) },
    }),
  ).toEqual('$8.64/TB/month')
})

test('download', () => {
  expect(displayEgressPricePerTBPerMonth({ price: '1e9' })).toEqual(
    '1.000 mS/TB',
  )
})

test('upload', () => {
  expect(displayIngressPricePerTBPerMonth({ price: '1e9' })).toEqual(
    '1.000 mS/TB',
  )
})
