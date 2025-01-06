import { test, expect, Page } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import { createBucket, openBucket } from '../fixtures/buckets'
import { changeExplorerMode, createFilesMap } from '../fixtures/files'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { workerMultipartKeyRoute } from '@siafoundation/renterd-types'
import { getUploadRows, getUploadsTable } from '../fixtures/uploads'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
  // Simulate in progress uploads.
  await mockApiWorkerMultipartUploadPartHanging({ page })
})

test.afterEach(async () => {
  await afterTest()
})

test('uploads are shown in the local and all uploads lists', async ({
  page,
}) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    'file1.txt': 10,
    'file2.txt': 10,
    'file3.txt': 10,
    'file4.txt': 10,
    'file5.txt': 10,
    'file6.txt': 10,
  })
  await expect(
    page.getByRole('button', { name: 'Active uploads' })
  ).toBeVisible()
  await changeExplorerMode(page, 'uploads')
  await expect(getUploadRows(page)).toHaveCount(6)
  await expect(getUploadsTable(page).getByText('uploading')).toHaveCount(5)
  await expect(getUploadsTable(page).getByText('queued')).toHaveCount(1)
  await expect(page.getByText('1 - 6 of 6')).toBeVisible()
  await expect(page.getByRole('button', { name: 'All uploads' })).toBeVisible()
  await page.getByRole('button', { name: 'All uploads' }).click()
  await expect(page.getByText('1 - 6 of 6')).toBeHidden()
  await expect(getUploadRows(page)).toHaveCount(5)
  await expect(getUploadsTable(page).getByText('uploading')).toHaveCount(5)
  await expect(getUploadsTable(page).getByText('queued')).toHaveCount(0)
})

export async function mockApiWorkerMultipartUploadPartHanging({
  page,
}: {
  page: Page
}) {
  await page.route(
    `**/api${workerMultipartKeyRoute.replace(':key', '')}*`,
    async () => {
      await new Promise(() => {
        // Never resolve, leaving the request hanging.
      })
    }
  )
}
