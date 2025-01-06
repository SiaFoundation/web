import { test, expect, Page } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import { createBucket, openBucket } from '../fixtures/buckets'
import {
  changeExplorerMode,
  createFilesMap,
  expectFileRowById,
} from '../fixtures/files'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  busMultipartListuploadsRoute,
  MultipartUploadListUploadsResponse,
} from '@siafoundation/renterd-types'
import { expectUploadRowById } from '../fixtures/uploads'
import { getContractRowByIndex } from '../fixtures/contracts'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('viewing a page with no data shows the correct empty state', async ({
  page,
}) => {
  await page.goto('/contracts?offset=100')
  // Check that the empty state is correct.
  await expect(
    page.getByText('No data on this page, reset pagination to continue.')
  ).toBeVisible()
  await expect(page.getByText('Back to first page')).toBeVisible()
  await page.getByText('Back to first page').click()
  // Ensure we are now seeing rows of data.
  await getContractRowByIndex(page, 0, true)
})

test('paginating files works as expected in both directory and all files mode', async ({
  page,
}) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    'file1.txt': 10,
    'file2.txt': 10,
    'file3.txt': 10,
    'file4.txt': 10,
    'file5.txt': 10,
    'file6.txt': 10,
  })
  await navigateToBuckets({ page })
  await openBucket(page, bucketName)
  let url = page.url()
  await page.goto(url + '?limit=2')

  const first = page.getByRole('button', { name: 'go to first page' })
  const next = page.getByRole('button', { name: 'go to next page' })
  await expectFileRowById(page, 'bucket1/file5.txt')
  await expect(first).toBeDisabled()
  await expect(next).toBeEnabled()
  await next.click()
  await expectFileRowById(page, 'bucket1/file3.txt')
  await expect(first).toBeEnabled()
  await expect(next).toBeEnabled()
  await next.click()
  await expectFileRowById(page, 'bucket1/file1.txt')
  await expect(first).toBeEnabled()
  await expect(next).toBeDisabled()

  await changeExplorerMode(page, 'all files')
  url = page.url()
  await page.goto(url + '?limit=2')

  await expectFileRowById(page, 'bucket1/file5.txt')
  await expect(first).toBeDisabled()
  await expect(next).toBeEnabled()
  await next.click()
  await expectFileRowById(page, 'bucket1/file3.txt')
  await expect(first).toBeEnabled()
  await expect(next).toBeEnabled()
  await next.click()
  await expectFileRowById(page, 'bucket1/file1.txt')
  await expect(first).toBeEnabled()
  await expect(next).toBeDisabled()
})

test('paginating all uploads works as expected', async ({ page }) => {
  const bucketName = 'bucket1'
  // We use a mock for the multipart uploads API because it is otherwise hard to
  // catch a stable list of uploads before they complete and the list clears out.
  await mockApiMultipartUploads(page)
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await changeExplorerMode(page, 'uploads')
  await expect(page.getByRole('button', { name: 'All uploads' })).toBeVisible()
  await page.getByRole('button', { name: 'All uploads' }).click()
  await expect(page.getByTestId('uploadsTable')).toBeVisible()
  const first = page.getByRole('button', { name: 'go to first page' })
  const next = page.getByRole('button', { name: 'go to next page' })
  await expectUploadRowById(page, 'upload1')
  await expect(first).toBeDisabled()
  await expect(next).toBeEnabled()
  await next.click()
  await expectUploadRowById(page, 'upload3')
  await expect(first).toBeEnabled()
  await expect(next).toBeEnabled()
  await next.click()
  await expectUploadRowById(page, 'upload5')
  await expect(first).toBeEnabled()
  await expect(next).toBeDisabled()
})

async function mockApiMultipartUploads(page: Page) {
  // Define responses keyed by "uploadIDMarker|keyMarker"
  const responseMap: Record<string, MultipartUploadListUploadsResponse> = {
    // Initial page.
    default: {
      hasMore: true,
      nextUploadIDMarker: 'upload1',
      nextMarker: 'key1',
      uploads: [
        {
          bucket: 'bucket1',
          key: 'file1',
          encryptionKey: 'encKey1',
          uploadID: 'upload1',
          createdAt: new Date().toISOString(),
        },
        {
          bucket: 'bucket1',
          key: 'file2',
          encryptionKey: 'encKey2',
          uploadID: 'upload2',
          createdAt: new Date().toISOString(),
        },
      ],
    },
    // Second page.
    'upload1|key1': {
      hasMore: true,
      nextUploadIDMarker: 'upload2',
      nextMarker: 'key2',
      uploads: [
        {
          bucket: 'bucket1',
          key: 'file3',
          encryptionKey: 'encKey3',
          uploadID: 'upload3',
          createdAt: new Date().toISOString(),
        },
        {
          bucket: 'bucket1',
          key: 'file4',
          encryptionKey: 'encKey4',
          uploadID: 'upload4',
          createdAt: new Date().toISOString(),
        },
      ],
    },
    // Final page.
    'upload2|key2': {
      hasMore: false,
      nextMarker: null,
      nextUploadIDMarker: null,
      uploads: [
        {
          bucket: 'bucket1',
          key: 'file5',
          encryptionKey: 'encKey5',
          uploadID: 'upload5',
          createdAt: new Date().toISOString(),
        },
      ],
    },
  }

  await page.route(`**/api${busMultipartListuploadsRoute}*`, async (route) => {
    const postData = route.request().postData()
    const data = JSON.parse(postData)
    const uploadIDMarker = data?.uploadIDMarker
    const keyMarker = data?.keyMarker
    const key =
      uploadIDMarker && keyMarker ? `${uploadIDMarker}|${keyMarker}` : 'default'
    const response = responseMap[key]
    await route.fulfill({
      json: response,
    })
  })

  return responseMap
}
