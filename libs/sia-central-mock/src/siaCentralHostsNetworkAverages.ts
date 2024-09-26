import { SiaCentralHostsNetworkAveragesResponse } from '@siafoundation/sia-central-types'
import { Page } from 'playwright'

export function getMockSiaCentralHostsNetworkAverages(): Partial<SiaCentralHostsNetworkAveragesResponse> {
  return {
    message: 'successfully got average settings',
    type: 'success',
    settings: {
      max_download_batch_size: 45731232,
      max_duration: 24903,
      max_revise_batch_size: 42863669,
      remaining_storage: 6374863381719,
      sector_size: 4194304,
      total_storage: 10437764381948,
      window_size: 144,
      revision_number: 0,
      base_rpc_price: '575911952425466771',
      collateral: '164150939887',
      max_collateral: '5102329350609040404570949799',
      contract_price: '177909940261449239357414',
      download_price: '899214551757733',
      sector_access_price: '786075245626037457',
      storage_price: '78941314716',
      upload_price: '75987987303050',
    },
    price_table: {
      uid: '00000000000000000000000000000000',
      validity: 1669565217391,
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
    benchmarks: {
      contract_time: 7586,
      upload_time: 12047,
      download_time: 18929,
      data_size: 41943040,
    },
  }
}

export async function mockApiSiaCentralHostsNetworkAverages({
  page,
}: {
  page: Page
}) {
  const json = getMockSiaCentralHostsNetworkAverages()
  await page.route(
    'https://api.siacentral.com/v2/hosts/network/averages',
    async (route) => {
      await route.fulfill({ json })
    }
  )
  return json
}

export async function mockApiSiaCentralHostsNetworkAveragesHanging({
  page,
}: {
  page: Page
}) {
  await page.route(
    'https://api.siacentral.com/v2/hosts/network/averages',
    async () => {
      return new Promise(() => {
        // Never resolve, leaving the request hanging.
      })
    }
  )
}
