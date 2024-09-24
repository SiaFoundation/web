import { test, expect } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import {
  bucketInList,
  createBucket,
  deleteBucket,
  openBucketContextMenu,
} from '../fixtures/buckets'
import { afterTest, beforeTest } from '../fixtures/beforeTest'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('can change a buckets policy', async ({ page }) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await expect(page.getByText('Create a bucket to get started.')).toBeVisible()
  await createBucket(page, bucketName)
  await openBucketContextMenu(page, bucketName)
  await page.getByRole('menuitem', { name: 'Change policy' }).click()
  await page
    .getByRole('heading', { name: `Change Policy: ${bucketName}` })
    .click()
  await page.getByRole('combobox').selectOption('public')
  await page.getByRole('button', { name: 'Update policy' }).click()
  await expect(page.getByText('Bucket policy has been updated')).toBeVisible()
  await bucketInList(page, bucketName)
})

test('can create and delete a bucket', async ({ page }) => {
  const bucketName = 'my-new-bucket'
  await navigateToBuckets({ page })
  await expect(page.getByText('Create a bucket to get started.')).toBeVisible()
  await createBucket(page, bucketName)
  await deleteBucket(page, bucketName)
})
