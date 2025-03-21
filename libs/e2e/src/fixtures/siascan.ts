import { Page } from 'playwright'
import {
  hostMetricsRoute,
  exchangeRateRoute,
  HostMetrics,
} from '@siafoundation/explored-types'

const api = 'https://api.siascan.com'

export async function mockApiSiaScanExchangeRates({ page }: { page: Page }) {
  await page.route(
    `${api}${exchangeRateRoute.replace(':currency', '*')}`,
    async (route) => {
      if (route.request().url().endsWith('jpy')) {
        await route.fulfill({ json: 0.727779694168 })
      } else {
        await route.fulfill({ json: 0.003944045283 })
      }
    }
  )
}

export async function mockApiSiaScanExchangeRatesUnroute({
  page,
}: {
  page: Page
}) {
  await page.unroute(`${api}${exchangeRateRoute.replace(':currency', '*')}`)
}

export async function mockApiSiaScanExchangeRatesHanging({
  page,
}: {
  page: Page
}) {
  await page.route(
    `${api}${exchangeRateRoute.replace(':currency', '*')}`,
    async () => {
      await new Promise(() => {
        // Never resolve, leaving the request hanging.
      })
    }
  )
}

const response: HostMetrics = {
  activeHosts: 100,
  totalStorage: 100000000000,
  remainingStorage: 100000000000,
  settings: {
    acceptingcontracts: true,
    netaddress: '',
    unlockhash: '',
    ephemeralaccountexpiry: '',
    maxephemeralaccountbalance: '',
    version: '',
    release: '',
    siamuxport: '',
    maxdownloadbatchsize: 45731232,
    maxduration: 24903,
    maxrevisebatchsize: 42863669,
    remainingstorage: 6374863381719,
    sectorsize: 4194304,
    totalstorage: 10437764381948,
    windowsize: 144,
    revisionnumber: 0,
    baserpcprice: '575911952425466771',
    collateral: '164150939887',
    maxcollateral: '5102329350609040404570949799',
    contractprice: '177909940261449239357414',
    downloadbandwidthprice: '899214551757733',
    sectoraccessprice: '786075245626037457',
    storageprice: '78941314716',
    uploadbandwidthprice: '75987987303050',
  },
  priceTable: {
    uid: '00000000000000000000000000000000',
    validity: '1669565217391',
    hostblockheight: 484542,
    updatepricetablecost: '1',
    accountbalancecost: '1',
    fundaccountcost: '1',
    latestrevisioncost: '2416730419428409022',
    subscriptionmemorycost: '0',
    subscriptionnotificationcost: '0',
    initbasecost: '575911952425466771',
    memorytimecost: '1',
    downloadbandwidthcost: '899214551757733',
    uploadbandwidthcost: '75987987303050',
    dropsectorsbasecost: '1',
    dropsectorsunitcost: '1',
    hassectorbasecost: '1',
    readbasecost: '786075245626037457',
    readlengthcost: '1',
    renewcontractcost: '0',
    revisionbasecost: '0',
    swapsectorcost: '1',
    writebasecost: '786075245626037457',
    writelengthcost: '1',
    writestorecost: '78941314716',
    txnfeeminrecommended: '10742866192394797545',
    txnfeemaxrecommended: '32228598577184392635',
    contractprice: '0',
    collateralcost: '164150939887',
    maxcollateral: '0',
    maxduration: 0,
    windowsize: 0,
    registryentriesleft: 3264413,
    registryentriestotal: 3317868,
  },
  v2Settings: {
    protocolVersion: [1, 0, 0],
    release: '1.0.0',
    walletAddress: '127.0.0.1:9980',
    acceptingContracts: true,
    maxCollateral: '5102329350609040404570949799',
    maxContractDuration: 0,
    remainingStorage: 100000000000000,
    totalStorage: 100000000000000,
    prices: {
      contractPrice: '177909940261449239357414',
      collateral: '164150939887',
      storagePrice: '78941314716',
      egressPrice: '899214551757733',
      ingressPrice: '75987987303050',
      freeSectorPrice: '1',
      tipHeight: 100000000000000,
      validUntil: '1000000000000000000',
      signature: '1000000000000000000',
    },
    validity: 100000000000000,
  },
}

export async function mockApiSiaScanHostMetrics({ page }: { page: Page }) {
  await page.route(`${api}${hostMetricsRoute}`, async (route) => {
    await route.fulfill({ json: response })
  })
}

export async function mockApiSiaScanHostMetricsUnroute({
  page,
}: {
  page: Page
}) {
  await page.unroute(`${api}${hostMetricsRoute}`)
}

export async function mockApiSiaScanHostMetricsHanging({
  page,
}: {
  page: Page
}) {
  await page.route(`${api}${hostMetricsRoute}`, async () => {
    await new Promise(() => {
      // Never resolve, leaving the request hanging.
    })
  })
}
