import { Page } from 'playwright'
import {
  hostMetricsRoute,
  exchangeRateRoute,
  HostMetrics,
} from '@siafoundation/explored-types'

const exchangeRates = {
  aud: '0.016136871549',
  bch: '0.000021499880703',
  btc: '0.000000149047',
  cad: '0.014328484298',
  cny: '0.076310722577',
  eth: '0.0000029068532077',
  eur: '0.009737538604',
  gbp: '0.008359151948',
  jpy: '1.600530478116',
  ltc: '0.000116295710314',
  rub: '0.978819669836',
  usd: '0.010571307522',
}

export async function mockApiSiaScanExchangeRates({ page }: { page: Page }) {
  await page.route(
    `https://api.siascan.com${exchangeRateRoute.replace(':currency', '*')}`,
    async (route) => {
      if (route.request().url().endsWith('jpy')) {
        await route.fulfill({ json: exchangeRates.jpy })
      } else {
        await route.fulfill({ json: exchangeRates.usd })
      }
    }
  )
}

export async function mockApiSiaScanExchangeRatesUnroute({
  page,
}: {
  page: Page
}) {
  await page.unroute(
    `https://api.siascan.com${exchangeRateRoute.replace(':currency', '*')}`
  )
}

export async function mockApiSiaScanExchangeRatesHanging({
  page,
}: {
  page: Page
}) {
  await page.route(
    `https://api.siascan.com${exchangeRateRoute.replace(':currency', '*')}`,
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
    maxdownloadbatchsize: 100000000000,
    maxduration: 1000000000000,
    maxrevisebatchsize: 100000000000,
    netaddress: '127.0.0.1:9980',
    remainingstorage: 1000000000000,
    sectorsize: 100000000000000,
    totalstorage: 100000000000000,
    unlockhash: '',
    windowsize: 100000000000,
    collateral: '1000000000000000000',
    maxcollateral: '1000000000000000000',
    baserpcprice: '1000000000000000000',
    contractprice: '1000000000000000000',
    downloadbandwidthprice: '1000000000000000000',
    sectoraccessprice: '1000000000000000000',
    storageprice: '1000000000000000000',
    uploadbandwidthprice: '1000000000000000000',
    ephemeralaccountexpiry: '1000000000000000000',
    maxephemeralaccountbalance: '1000000000000000000',
    revisionnumber: 100000000,
    version: '1000000000000000000',
    release: '1000000000000000000',
    siamuxport: '1000000000000000000',
  },
  priceTable: {
    uid: '1000000000000000000',
    validity: '1000000000000000000',
    hostblockheight: 100000000,
    updatepricetablecost: '1000000000000000000',
    accountbalancecost: '1000000000000000000',
    fundaccountcost: '1000000000000000000',
    latestrevisioncost: '1000000000000000000',
    subscriptionmemorycost: '1000000000000000000',
    subscriptionnotificationcost: '1000000000000000000',
    initbasecost: '1000000000000000000',
    memorytimecost: '1000000000000000000',
    downloadbandwidthcost: '1000000000000000000',
    uploadbandwidthcost: '1000000000000000000',
    dropsectorsbasecost: '1000000000000000000',
    dropsectorsunitcost: '1000000000000000000',
    hassectorbasecost: '1000000000000000000',
    readbasecost: '1000000000000000000',
    readlengthcost: '1000000000000000000',
    renewcontractcost: '1000000000000000000',
    revisionbasecost: '1000000000000000000',
    swapsectorcost: '1000000000000000000',
    writebasecost: '1000000000000000000',
    writelengthcost: '1000000000000000000',
    writestorecost: '1000000000000000000',
    txnfeeminrecommended: '1000000000000000000',
    txnfeemaxrecommended: '1000000000000000000',
    contractprice: '1000000000000000000',
    collateralcost: '1000000000000000000',
    maxcollateral: '1000000000000000000',
    maxduration: 100000000000000,
    windowsize: 100000000000000,
    registryentriesleft: 100000000000000,
    registryentriestotal: 100000000000000,
  },
}

export async function mockApiSiaScanHostMetrics({ page }: { page: Page }) {
  await page.route(
    `https://api.siascan.com${hostMetricsRoute}`,
    async (route) => {
      await route.fulfill({ json: response })
    }
  )
}

export async function mockApiSiaScanHostMetricsUnroute({
  page,
}: {
  page: Page
}) {
  await page.unroute(`https://api.siascan.com${hostMetricsRoute}`)
}

export async function mockApiSiaScanHostMetricsHanging({
  page,
}: {
  page: Page
}) {
  await page.route(`https://api.siascan.com${hostMetricsRoute}`, async () => {
    await new Promise(() => {
      // Never resolve, leaving the request hanging.
    })
  })
}
