import { Page, test, expect } from '@playwright/test'
import { navigateToAlerts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  AlertsResponse,
  busAlertsRoute,
  busContractsRoute,
  ContractsResponse,
} from '@siafoundation/renterd-types'

test.beforeEach(async ({ page }) => {
  await mockApiBusContracts(page)
  await mockApiBusAlerts(page)
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('alert data', async ({ page }) => {
  await navigateToAlerts({ page })

  // Churn alert
  const churnData = page.getByTestId('churn')
  await expect(churnData.getByText('churn: 37.54%')).toBeVisible()
  const churnDataContractB6 = churnData.getByTestId(
    'b6f32dc39998bd85d730d39666360225af12fbad3bc18de4df50ce09073c9393'
  )
  await expect(
    churnDataContractB6.getByText('host is price gouging')
  ).toHaveCount(2)
  await expect(churnDataContractB6.getByText('11/28/2023')).toBeVisible()
  await expect(churnDataContractB6.getByText('11/27/2023')).toBeVisible()
  await expect(churnDataContractB6.getByText('11/26/2023')).toBeVisible()
  await expect(churnDataContractB6.getByText('30.00 MB')).toBeVisible()
  await expect(churnDataContractB6.getByText('30.00 KB')).toBeVisible()
  await expect(churnDataContractB6.getByText('30 B')).toBeVisible()

  // Slab migration failed alert
  const objectsData = page.getByTestId('objects')
  await expect(objectsData.getByText('bucket1/nest2/file3.png')).toBeVisible()
})

async function mockApiBusContracts(page: Page) {
  const json: ContractsResponse = [
    {
      id: 'b6f32dc39998bd85d730d39666360225af12fbad3bc18de4df50ce09073c9393',
      hostKey: 'hk',
      usability: 'bad',
      proofHeight: 100,
      revisionHeight: 100,
      revisionNumber: 1,
      startHeight: 100,
      windowStart: 200,
      windowEnd: 300,
      renewedFrom: '',
      spending: {
        deletions: '0',
        fundAccount: '0',
        sectorRoots: '0',
        uploads: '0',
      },
      initialRenterFunds: '2000',
      size: 30000000,
      state: 'active',
    },
    {
      id: '26cd68ac42d4056f1494aef012bf9da4f753ba15e2831722eebf30a78243d534',
      hostKey: 'hk',
      usability: 'good',
      proofHeight: 100,
      revisionHeight: 100,
      revisionNumber: 1,
      startHeight: 100,
      windowStart: 200,
      windowEnd: 300,
      renewedFrom: '',
      spending: {
        deletions: '0',
        fundAccount: '0',
        sectorRoots: '0',
        uploads: '0',
      },
      initialRenterFunds: '2000',
      size: 30000,
      state: 'active',
    },
    {
      id: '437b0c09f6167790fefc21000c4a4a81de109729151414526562721ee7802ac6',
      hostKey: 'hk',
      usability: 'bad',
      proofHeight: 100,
      revisionHeight: 100,
      revisionNumber: 1,
      startHeight: 100,
      windowStart: 200,
      windowEnd: 300,
      renewedFrom: '',
      spending: {
        deletions: '0',
        fundAccount: '0',
        sectorRoots: '0',
        uploads: '0',
      },
      initialRenterFunds: '2000',
      size: 4000,
      state: 'active',
    },
    {
      id: '89dfc5594909fd468729b59096b26c886b25106e5479ceb1a28276420cb32fd3',
      hostKey: 'hk',
      usability: 'bad',
      proofHeight: 100,
      revisionHeight: 100,
      revisionNumber: 1,
      startHeight: 100,
      windowStart: 200,
      windowEnd: 300,
      renewedFrom: '',
      spending: {
        deletions: '0',
        fundAccount: '0',
        sectorRoots: '0',
        uploads: '0',
      },
      initialRenterFunds: '2000',
      size: 10000,
      state: 'active',
    },
    {
      id: 'f0bbb8b6a1a6219beb510f0c4008bba9ed5687b5e617d10efce206022248ed59',
      hostKey: 'hk',
      usability: 'bad',
      proofHeight: 100,
      revisionHeight: 100,
      revisionNumber: 1,
      startHeight: 100,
      windowStart: 200,
      windowEnd: 300,
      renewedFrom: '',
      spending: {
        deletions: '0',
        fundAccount: '0',
        sectorRoots: '0',
        uploads: '0',
      },
      initialRenterFunds: '2000',
      size: 50000,
      state: 'active',
    },
    {
      id: 'c7f32dc39998bd85d730d39666360225af12fbad3bc18de4df50ce09073c9666',
      hostKey: 'hk',
      usability: 'good',
      proofHeight: 100,
      revisionHeight: 100,
      revisionNumber: 1,
      startHeight: 100,
      windowStart: 200,
      windowEnd: 300,
      renewedFrom: '',
      spending: {
        deletions: '0',
        fundAccount: '0',
        sectorRoots: '0',
        uploads: '0',
      },
      initialRenterFunds: '2000',
      size: 50000000,
      state: 'active',
    },
  ]
  await page.route(`**/api${busContractsRoute}*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}

async function mockApiBusAlerts(page: Page) {
  const json: AlertsResponse = {
    hasMore: false,
    totals: {
      info: 1,
      warning: 1,
      error: 1,
      critical: 1,
    },
    alerts: [
      {
        id: '7f8f7c09da3010a16c2562c4487ba2bbe9753e69d773d78628c3fb31ef1ed60f',
        severity: 'critical',
        message: 'Slab migration failed',
        data: {
          error:
            'failed to upload slab for migration: 1 < 2: not enough contracts to support requested redundancy',
          health: 0,
          hint: 'Migration failures can be temporary, but if they persist it can eventually lead to data loss and should therefor be taken very seriously. It might be necessary to increase the MigrationSurchargeMultiplier in the gouging settings to ensure it has every chance of succeeding.',
          objects: [
            {
              bucket: 'test-bucket',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/dir2/file4.png',
              modTime: '2024-11-08T20:10:38Z',
              size: 230648,
            },
            {
              bucket: 'bucket1',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/directory-with-a-file/file3.png',
              modTime: '2024-11-08T19:56:20Z',
              size: 230648,
            },
            {
              bucket: 'bucket2',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/folder/folder/file3.png',
              modTime: '2024-11-13T15:56:47Z',
              size: 230648,
            },
            {
              bucket: 'bucket2',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/folder/folder/file4.png',
              modTime: '2024-11-13T15:56:47Z',
              size: 230648,
            },
            {
              bucket: 'bucket2',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/folder/folder/file5.png',
              modTime: '2024-11-13T15:56:47Z',
              size: 230648,
            },
            {
              bucket: 'bucket2',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/folder/folder/file6.png',
              modTime: '2024-11-13T15:56:47Z',
              size: 230648,
            },
            {
              bucket: 'bucket1',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/inner-dir-with-a-file/inner-file.png',
              modTime: '2024-11-08T19:45:24Z',
              size: 230648,
            },
            {
              bucket: 'bucket1',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/main-directory/directory-with-a-file/file.png',
              modTime: '2024-11-08T19:00:59Z',
              size: 230648,
            },
            {
              bucket: 'bucket1',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/nest/file4.png',
              modTime: '2024-11-08T19:00:59Z',
              size: 230648,
            },
            {
              bucket: 'x',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/nest/nest1.png',
              modTime: '2024-11-20T15:15:53Z',
              size: 230648,
            },
            {
              bucket: 'x',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/nest/nest2.png',
              modTime: '2024-11-20T15:15:53Z',
              size: 230648,
            },
            {
              bucket: 'bucket1',
              eTag: '6e5528d123fecd0fc9de26411251b730f1e7683e94d45f418aee407ab13049cd',
              health: 0,
              key: '/nest2/file3.png',
              modTime: '2024-11-08T19:00:59Z',
              size: 230648,
            },
          ],
          origin: 'worker.worker',
          slabKey:
            'skey:7cc08070dc880ffbfecd8fa702fb73adfdcb78d6fcb68c6601606c073f49ff39',
        },
        timestamp: '2024-11-26T15:10:11.760596-05:00',
      },
      {
        id: '288153f639d373d7f9270caf75663277664bc5b4991c7fe472daba1f77e1277a',
        severity: 'info',
        message: 'Contract usability updated',
        data: {
          churn: {
            '26cd68ac42d4056f1494aef012bf9da4f753ba15e2831722eebf30a78243d534':
              [
                {
                  from: 'bad',
                  to: 'good',
                  time: '2024-11-26T20:07:50.185945Z',
                  hostKey: 'hk',
                  size: 30000,
                },
              ],
            '437b0c09f6167790fefc21000c4a4a81de109729151414526562721ee7802ac6':
              [
                {
                  from: 'good',
                  to: 'bad',
                  reason: 'host is price gouging',
                  time: '2024-11-26T20:07:50.185945Z',
                  hostKey: 'hk',
                  size: 4000,
                },
              ],
            '89dfc5594909fd468729b59096b26c886b25106e5479ceb1a28276420cb32fd3':
              [
                {
                  from: 'good',
                  to: 'bad',
                  reason: 'host is price gouging',
                  time: '2024-11-26T20:07:50.185945Z',
                  hostKey: 'hk',
                  size: 10000,
                },
              ],
            b6f32dc39998bd85d730d39666360225af12fbad3bc18de4df50ce09073c9393: [
              {
                from: 'good',
                to: 'bad',
                time: '2023-11-28T20:07:50.185945Z',
                reason: 'host is price gouging',
                hostKey: 'hk',
                size: 30000000,
              },
              {
                from: 'bad',
                to: 'good',
                time: '2023-11-27T20:07:50.185945Z',
                hostKey: 'hk',
                size: 30000,
              },
              {
                from: 'good',
                to: 'bad',
                reason: 'host is price gouging',
                time: '2023-11-26T20:07:50.185945Z',
                hostKey: 'hk',
                size: 30,
              },
            ],
            f0bbb8b6a1a6219beb510f0c4008bba9ed5687b5e617d10efce206022248ed59: [
              {
                from: 'good',
                to: 'bad',
                reason: 'host is price gouging',
                time: '2024-11-26T20:07:50.185945Z',
                hostKey: 'hk',
                size: 50000,
              },
            ],
          },
          hint: 'High usability churn can lead to a lot of unnecessary migrations, it might be necessary to tweak your configuration depending on the reason hosts are being discarded.',
        },
        timestamp: '2024-11-26T15:07:50.185945-05:00',
      },
    ],
  }
  await page.route(`**/api${busAlertsRoute}*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}
