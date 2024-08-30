import { test, expect } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import {
  bucketInList,
  createBucket,
  deleteBucket,
  deleteBucketIfExists,
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
  await navigateToBuckets({ page })
  await openBucketContextMenu(page, 'default')
  await page.getByRole('menuitem', { name: 'Change policy' }).click()
  await page.getByRole('heading', { name: 'Change Policy: default' }).click()
  await page.getByRole('combobox').selectOption('public')
  await page.getByRole('button', { name: 'Update policy' }).click()
  await expect(page.getByText('Bucket policy has been updated')).toBeVisible()
  await bucketInList(page, 'default')
})

test('can create and delete a bucket', async ({ page }) => {
  await navigateToBuckets({ page })
  await deleteBucketIfExists(page, 'my-new-bucket')
  await createBucket(page, 'my-new-bucket')
  await deleteBucket(page, 'my-new-bucket')
})
