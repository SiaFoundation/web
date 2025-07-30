import { test, expect, Page } from '@playwright/test'
import { navigateToContracts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  expectContractRowByIndex,
  getContractRowById,
  getContractRows,
  setVersionMode,
  expectVersionMode,
  getContractRowsAll,
} from '../fixtures/contracts'
import {
  ContractsResponse,
  contractsRoute,
  V2ContractsResponse,
  v2ContractsRoute,
} from '@siafoundation/hostd-types'
import { toggleColumnVisibility } from '@siafoundation/e2e'

test.afterEach(async () => {
  await afterTest()
})

test('contracts bulk integrity check', async ({ page }) => {
  await beforeTest(page, {
    renterdCount: 3,
  })
  await navigateToContracts(page)
  const rows = await getContractRowsAll(page)
  await rows.at(0).click({ position: { x: 50, y: 5 } })
  await rows.at(2).click({ modifiers: ['Shift'] })

  const menu = page.getByLabel('contract multi-select menu')

  // Run check for each contract.
  await menu.getByLabel('run integrity check for each contract').click()
  await expect(
    page.getByText('Integrity checks started for 3 contracts'),
  ).toBeVisible()
})

test('new contracts do not show a renewed from or to contract', async ({
  page,
}) => {
  await beforeTest(page, {
    renterdCount: 3,
  })
  await navigateToContracts(page)
  await expect(getContractRows(page).getByTestId('renewedFrom')).toBeHidden()
  await expect(getContractRows(page).getByTestId('renewedTo')).toBeHidden()
})

test('viewing a page with no data shows the correct empty state', async ({
  page,
}) => {
  await beforeTest(page, {
    renterdCount: 3,
  })
  await navigateToContracts(page)
  await page.goto('/contracts?offset=100')
  // Check that the empty state is correct.
  await expect(
    page.getByText('No data on this page, reset pagination to continue.'),
  ).toBeVisible()
  await expect(page.getByText('Back to first page')).toBeVisible()
  await page.getByText('Back to first page').click()
  // Ensure we are now seeing rows of data.
  await expectContractRowByIndex(page, 0)
})

test('paginating contracts with known total and client side pagination', async ({
  page,
}) => {
  await beforeTest(page, {
    renterdCount: 3,
  })
  await interceptApiContactsAndEnsure3Results(page)
  await navigateToContracts(page)
  const url = page.url()
  await page.goto(url + '?limit=1')

  const first = page.getByRole('button', { name: 'go to first page' })
  const previous = page.getByRole('button', { name: 'go to previous page' })
  const next = page.getByRole('button', { name: 'go to next page' })
  const last = page.getByRole('button', { name: 'go to last page' })
  const rows = getContractRows(page)
  await expect(rows).toHaveCount(1)
  await expect(first).toBeDisabled()
  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
  await next.click()
  await expect(rows).toHaveCount(1)
  await expect(first).toBeEnabled()
  await expect(previous).toBeEnabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
  await next.click()
  await expect(rows).toHaveCount(1)
  await expect(first).toBeEnabled()
  await expect(previous).toBeEnabled()
  await expect(next).toBeDisabled()
  await expect(last).toBeDisabled()
})

async function interceptApiContactsAndEnsure3Results(page: Page) {
  await page.route(`**/api${v2ContractsRoute}*`, async (route) => {
    console.log('Intercepted contracts API request')
    // Fetch the original response.
    const response = await route.fetch()

    // Parse the response body as JSON.
    const originalData: ContractsResponse = await response.json()

    // Slice the contracts down to exactly 3 items.
    const modifiedData: ContractsResponse = {
      contracts: originalData.contracts.slice(0, 3),
      count: Math.min(3, originalData.count),
    }

    // Fulfill the route with the modified response.
    await route.fulfill({
      json: modifiedData,
    })
  })
}

test('contract timeline displays correct heights for v1 and v2 contracts', async ({
  page,
}) => {
  await beforeTest(page, {
    renterdCount: 0,
  })
  await page.route(`**/api${contractsRoute}*`, async (route) => {
    const response: ContractsResponse = {
      count: 1,
      contracts: [
        {
          revision: {
            parentID:
              '8f455ffa8c916336f5492f88bd54e6d67ca6cf2aee324cc212eb201431b2d3fc',
            unlockConditions: {
              timelock: 0,
              publicKeys: [
                'ed25519:f0b9d82256a6381a5eab40c62eac1d8f3e2daa6eccf89820142e8ca9ea66e44f',
                'ed25519:6ef1773aeb8943b5d8c8a150b89f3db477af03f5c66183920365c38b6af5b7aa',
              ],
              signaturesRequired: 2,
            },
            filesize: 41943040,
            fileMerkleRoot:
              '310a6ed78657247a2447f1abf564ca01f12f6503d4af3b84be8ffcaf80c915ec',
            windowStart: 97032,
            windowEnd: 97176,
            validProofOutputs: [
              {
                value: '9101390585452022383313',
                address:
                  '7c10e2fbd6972946291d90e52c01e8c5397e74909b7aaf91a541611206cae96cdcc2c4ae4bef',
              },
              {
                value: '403758888492668960875225',
                address:
                  'b549295b60ee7dbee58bc5097f6afc25eb9b4fe896a86eb31d8bb59dec5e61358c306597e09d',
              },
            ],
            missedProofOutputs: [
              {
                value: '9101390585452022383313',
                address:
                  '7c10e2fbd6972946291d90e52c01e8c5397e74909b7aaf91a541611206cae96cdcc2c4ae4bef',
              },
              {
                value: '401747287946613584798425',
                address:
                  'b549295b60ee7dbee58bc5097f6afc25eb9b4fe896a86eb31d8bb59dec5e61358c306597e09d',
              },
              {
                value: '2011600546055376076800',
                address:
                  '000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69',
              },
            ],
            unlockHash:
              '0cab75cd2f30eed98df1af6f776eda228868fc0fb0a00f077ddfcc7741273f50be724e3b1439',
            revisionNumber: 17,
          },
          hostSignature:
            '9079c26fe6ffe243f8a313cb48e224ccbda6bee243c6e32f74efe0d6a86108bad681778653b480d9509582aa0e12c7447db37e060a540d5d9c756bfec4463a09',
          renterSignature:
            '1992db206db3788b2fa822d520e3db706c770d64998fa174ff80c16d1da06f32366eef1f8c310cbb5c329ba96c4515d5406d00cc4e42a43ee6b89e17c030b506',
          status: 'successful',
          lockedCollateral: '9756388640757015978',
          usage: {
            rpc: '200106000000000222298130',
            storage: '2011600546055376076800',
            egress: '199112642456748617819933',
            ingress: '2518889101223987664384',
            accountFunding: '0',
            riskedCollateral: '1341067030703584051200',
          },
          negotiationHeight: 96831,
          formationConfirmed: true,
          revisionConfirmed: false,
          resolutionHeight: 97033,
          renewedTo:
            '0000000000000000000000000000000000000000000000000000000000000000',
          renewedFrom:
            '0000000000000000000000000000000000000000000000000000000000000000',
        },
      ],
    }
    await route.fulfill({
      json: response,
    })
  })

  await page.route(`**/api${v2ContractsRoute}*`, async (route) => {
    const response: V2ContractsResponse = {
      count: 1,
      contracts: [
        {
          capacity: 0,
          filesize: 0,
          fileMerkleRoot:
            '0000000000000000000000000000000000000000000000000000000000000000',
          proofHeight: 122517,
          expirationHeight: 122661,
          renterOutput: {
            value: '8000000000000000000000000',
            address:
              '46d10fb90515da16e6227ab9b7594ad3191052e0af4d1d02a1b05a3556b64ea1e548a31be50f',
          },
          hostOutput: {
            value: '15747399978454439214186496',
            address:
              'b549295b60ee7dbee58bc5097f6afc25eb9b4fe896a86eb31d8bb59dec5e61358c306597e09d',
          },
          missedHostValue: '13547399978454439214186496',
          totalCollateral: '13547399978454439214186496',
          renterPublicKey:
            'ed25519:d1a59bb229856ea9296b906e9ed7ee52425ba462f6c7f8009f745237949b6ae5',
          hostPublicKey:
            'ed25519:6ef1773aeb8943b5d8c8a150b89f3db477af03f5c66183920365c38b6af5b7aa',
          revisionNumber: 2,
          renterSignature:
            'b5a5c57a7efd1651b8f4fc4331e21e2922eb168849c3c57fef7ed15b59bc0803011297d972262b40b2d053e9e690c6107c8a34ba04968ccf7ccff8faaa4a9d0b',
          hostSignature:
            '729c8782135188d58c34e42928a0647aa623a030265b7bae9015afae288c013d3abeb89687de796c78c694415af1bc2180cb8967920b9b6f37a42c011a58a902',
          id: '0eb545efe95764aae11c186c5f07983c24ecea19dff9ef7fe7df97cb173a0565',
          status: 'successful',
          usage: {
            rpc: '200000000000000000000000',
            storage: '0',
            egress: '0',
            ingress: '0',
            accountFunding: '2000000000000000000000000',
            collateral: '0',
          },
          negotiationHeight: 114453,
          revisionConfirmed: false,
          formationIndex: {
            height: 114454,
            id: '0000000046a61214e665c168f785c53ce166755a93c4128f0ea6d90d2a24c82d',
          },
          resolutionIndex: {
            height: 122518,
            id: '0000000000000000000000000000000000000000000000000000000000000000',
          },
          renewedTo:
            '0000000000000000000000000000000000000000000000000000000000000000',
          renewedFrom:
            '0000000000000000000000000000000000000000000000000000000000000000',
        },
      ],
    }
    await route.fulfill({
      json: response,
    })
  })

  await navigateToContracts(page)
  await toggleColumnVisibility(page, 'payout', true)
  await page.reload()

  // v2
  const rowsV2 = getContractRows(page)
  await expect(rowsV2).toHaveCount(1)
  const rowV2 = await getContractRowById(
    page,
    '0eb545efe95764aae11c186c5f07983c24ecea19dff9ef7fe7df97cb173a0565',
  )
  await expect(rowV2.getByLabel('contract formation 114454')).toBeVisible()
  await expect(
    rowV2.getByLabel('contract duration 114454 - 122517'),
  ).toBeVisible()
  await expect(rowV2.getByLabel('proof window 122517 - 122661')).toBeVisible()
  await expect(rowV2.getByLabel('payout 122662')).toBeVisible()
  await expect(
    rowV2.getByTestId('payout').getByText('+15.747 SC'),
  ).toBeVisible()

  // v1
  await setVersionMode(page, 'v1')
  await expectVersionMode(page, 'v1')
  const rowsV1 = getContractRows(page)
  await expect(rowsV1).toHaveCount(1)
  const rowV1 = await getContractRowById(
    page,
    '8f455ffa8c916336f5492f88bd54e6d67ca6cf2aee324cc212eb201431b2d3fc',
  )
  await expect(rowV1.getByLabel('contract formation 96831')).toBeVisible()
  await expect(
    rowV1.getByLabel('contract duration 96831 - 97032'),
  ).toBeVisible()
  await expect(rowV1.getByLabel('proof window 97032 - 97176')).toBeVisible()
  await expect(rowV1.getByLabel('payout 97177')).toBeVisible()
  await expect(
    rowV1.getByTestId('payout').getByText('+403.759 mS'),
  ).toBeVisible()
})
