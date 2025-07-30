import BigNumber from 'bignumber.js'
import {
  calculateSpendingEstimate,
  derivePricingFromSpendingEstimate,
} from './spending'

test('with estimates of 1 TB, standard weights, 1x redundancy, 1x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const maxPricingFactor = 1
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(1)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '500.00',
    maxStoragePriceTBMonth: '400.00',
    maxUploadPriceTB: '100.00',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with estimates of 1 TB, standard weights, 2x redundancy, 1x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const maxPricingFactor = 1
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(2)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '333.33',
    maxStoragePriceTBMonth: '266.67',
    maxUploadPriceTB: '66.67',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with estimates of 1 TB, standard weights, 3x redunancy, 1x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const maxPricingFactor = 1
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(3)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '250.00',
    maxStoragePriceTBMonth: '200.00',
    maxUploadPriceTB: '50.00',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with estimates of 1 TB, standard weights, 1x redundancy, 2x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const maxPricingFactor = 2
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(1)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '1000.00',
    maxStoragePriceTBMonth: '800.00',
    maxUploadPriceTB: '200.00',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with estimates of 1 TB, standard weights, 2x redundancy, 2x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const maxPricingFactor = 2
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(2)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '666.67',
    maxStoragePriceTBMonth: '533.33',
    maxUploadPriceTB: '133.33',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with estimates of 1 TB, standard weights, 3x redunancy, 2x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const maxPricingFactor = 2
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(3)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '500.00',
    maxStoragePriceTBMonth: '400.00',
    maxUploadPriceTB: '100.00',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with mostly storage, standard weights, 1x redunancy, 2x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(10_000)
  const maxPricingFactor = 2
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(20)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(1)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '952.38',
    maxStoragePriceTBMonth: '761.90',
    maxUploadPriceTB: '190.48',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with varied estimates, standard weights, 1x redunancy, 2x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const maxPricingFactor = 2
  const storageTB = new BigNumber(8)
  const downloadTBMonth = new BigNumber(15)
  const uploadTBMonth = new BigNumber(3)
  const redundancyMultiplier = new BigNumber(1)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '90.91',
    maxStoragePriceTBMonth: '72.73',
    maxUploadPriceTB: '18.18',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with estimates of 1 TB, standard weights, 1x redundancy, 1.5x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(1)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1
  const maxPricingFactor = 1.5

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '750.00',
    maxStoragePriceTBMonth: '600.00',
    maxUploadPriceTB: '150.00',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with varied estimates, standard weights, 1x redundancy, 1.5x spending factor', () => {
  const estimatedSpendingPerMonth = new BigNumber(1000)
  const storageTB = new BigNumber(8)
  const downloadTBMonth = new BigNumber(15)
  const uploadTBMonth = new BigNumber(3)
  const redundancyMultiplier = new BigNumber(1)
  const storageWeight = 4
  const downloadWeight = 5
  const uploadWeight = 1
  const maxPricingFactor = 1.5

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    maxPricingFactor,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    storageWeight,
    downloadWeight,
    uploadWeight,
  })

  expect(prices).not.toBeUndefined()
  expect({
    maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth.toFixed(2),
    maxDownloadPriceTB: prices?.maxDownloadPriceTB.toFixed(2),
    maxUploadPriceTB: prices?.maxUploadPriceTB.toFixed(2),
  }).toEqual({
    maxDownloadPriceTB: '68.18',
    maxStoragePriceTBMonth: '54.55',
    maxUploadPriceTB: '13.64',
  })
  expect(
    calculateSpendingEstimate({
      maxStoragePriceTBMonth: prices?.maxStoragePriceTBMonth,
      maxDownloadPriceTB: prices?.maxDownloadPriceTB,
      maxUploadPriceTB: prices?.maxUploadPriceTB,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    }),
  ).toEqual(estimatedSpendingPerMonth)
})

test('with zero spending returns null', () => {
  const estimatedSpendingPerMonth = new BigNumber(0)
  const storageTB = new BigNumber(8)
  const downloadTBMonth = new BigNumber(15)
  const uploadTBMonth = new BigNumber(3)
  const redundancyMultiplier = new BigNumber(1)

  const prices = derivePricingFromSpendingEstimate({
    estimatedSpendingPerMonth,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
  })

  expect(prices).toBeUndefined()
})

test('with zero prices returns null', () => {
  const maxStoragePriceTBMonth = new BigNumber(0)
  const maxDownloadPriceTB = new BigNumber(0)
  const maxUploadPriceTB = new BigNumber(0)
  const storageTB = new BigNumber(1)
  const downloadTBMonth = new BigNumber(1)
  const uploadTBMonth = new BigNumber(1)
  const redundancyMultiplier = new BigNumber(1)

  const spending = calculateSpendingEstimate({
    maxDownloadPriceTB,
    maxStoragePriceTBMonth,
    maxUploadPriceTB,
    maxPricingFactor: 1.5,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
  })

  expect(spending).toBeUndefined()
})
