import { expect, test } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import { createBucket, openBucket } from '../fixtures/buckets'
import { createDirectory } from '../fixtures/files'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  expectCmdkMenu,
  fillTextInputByName,
  openCmdkMenu,
} from '@siafoundation/e2e'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('can search for a file within a bucket via the actions menu', async ({
  page,
}) => {
  test.setTimeout(120_000)
  await navigateToBuckets({ page })
  await createBucket(page, 'bucket-1')
  await openBucket(page, 'bucket-1')
  await createDirectory(page, 'foobar-1')
  await createDirectory(page, 'foobar-2')
  await navigateToBuckets({ page })
  await createBucket(page, 'bucket-2')
  await openBucket(page, 'bucket-2')
  await createDirectory(page, 'foobar-1')
  await createDirectory(page, 'foobar-2')
  await page.getByLabel('search files').click()
  const cmdk = await expectCmdkMenu(page)
  await expect(cmdk.locator('div[cmdk-item]')).toHaveCount(2)
  await expect(cmdk.getByText('bucket-2')).toBeVisible()
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-1'),
  ).toBeVisible()
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-2'),
  ).toBeVisible()
  await fillTextInputByName(page, 'search-files-menu-input', 'foobar-1')
  await expect(cmdk.locator('div[cmdk-item]')).toHaveCount(1)
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-1'),
  ).toBeVisible()
})

test('can search for a file within a bucket via the cmdk menu', async ({
  page,
}) => {
  test.setTimeout(120_000)
  await navigateToBuckets({ page })
  await createBucket(page, 'bucket-1')
  await openBucket(page, 'bucket-1')
  await createDirectory(page, 'foobar-1')
  await createDirectory(page, 'foobar-2')
  await navigateToBuckets({ page })
  await createBucket(page, 'bucket-2')
  await openBucket(page, 'bucket-2')
  await createDirectory(page, 'foobar-1')
  await createDirectory(page, 'foobar-2')
  await page.getByLabel('search files').click()
  const cmdk = await expectCmdkMenu(page)
  await expect(cmdk.locator('div[cmdk-item]')).toHaveCount(2)
  await expect(cmdk.getByText('bucket-2')).toBeVisible()
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-1'),
  ).toBeVisible()
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-2'),
  ).toBeVisible()
  await fillTextInputByName(page, 'search-files-menu-input', 'foobar-1')
  await expect(cmdk.locator('div[cmdk-item]')).toHaveCount(1)
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-1'),
  ).toBeVisible()
})

test('can search for a file across all buckets', async ({ page }) => {
  test.setTimeout(120_000)
  await navigateToBuckets({ page })
  await createBucket(page, 'bucket-1')
  await openBucket(page, 'bucket-1')
  await createDirectory(page, 'foobar-1')
  await createDirectory(page, 'foobar-2')
  await navigateToBuckets({ page })
  await createBucket(page, 'bucket-2')
  await openBucket(page, 'bucket-2')
  await createDirectory(page, 'foobar-1')
  await createDirectory(page, 'foobar-2')
  const cmdk = await openCmdkMenu(page)
  await fillTextInputByName(page, 'cmdk-input', 'search all files')
  await expect(cmdk.locator('div[cmdk-item]')).toHaveCount(1)
  await cmdk.locator('div[cmdk-item]').getByText('search all files').click()
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('bucket-1'),
  ).toHaveCount(2)
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('bucket-2'),
  ).toHaveCount(2)
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-1'),
  ).toHaveCount(2)
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-2'),
  ).toHaveCount(2)
  await fillTextInputByName(page, 'cmdk-input', 'foobar-1')
  await expect(cmdk.locator('div[cmdk-item]')).toHaveCount(2)
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-1'),
  ).toHaveCount(2)
  await expect(
    cmdk.locator('div[cmdk-item]').getByText('foobar-2'),
  ).toHaveCount(0)
})
