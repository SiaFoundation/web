import { getDownloadCost, getStorageCost, getUploadCost } from './storage'

test('storage', () => {
  expect(getStorageCost({ price: (1e9).toString() })).toEqual('4.320 SC/TB')
})

test('storage fiat', () => {
  expect(
    getStorageCost({
      exchange: { currency: { prefix: '$' }, rate: '2' },
      price: (1e9).toString(),
    }),
  ).toEqual('$8.64/TB')
})

test('download', () => {
  expect(getDownloadCost({ price: (1e9).toString() })).toEqual('1.000 mS/TB')
})

test('upload', () => {
  expect(getUploadCost({ price: (1e9).toString() })).toEqual('1.000 mS/TB')
})
