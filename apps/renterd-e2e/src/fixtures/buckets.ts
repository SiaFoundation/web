import { Page, expect } from '@playwright/test'
import { navigateToBuckets } from './navigate'
import { fillTextInputByName, clearToasts } from '@siafoundation/e2e'
import { deleteDirectory, deleteFile } from './files'

export async function createBucket(page: Page, name: string) {
  await navigateToBuckets({ page })
  await page.getByText('Create bucket').first().click()
  await fillTextInputByName(page, 'name', name)
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByText('Bucket created')).toBeVisible()
  await clearToasts({ page })
  await expect(page.getByRole('cell', { name })).toBeVisible()
}

export async function deleteBucket(page: Page, name: string) {
  await openBucketContextMenu(page, name)
  await page.getByRole('menuitem', { name: 'Delete bucket' }).click()
  await fillTextInputByName(page, 'name', name)
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await bucketNotInList(page, name)
}

export async function deleteBucketIfExists(page: Page, name: string) {
  const doesBucketExist = await page
    .getByTestId('bucketsTable')
    .getByText(name)
    .isVisible()
  if (doesBucketExist) {
    await openBucket(page, name)
    // The list changes to filesTable and is still loading=false for a split second
    // before the files start fetching - this is why we need to wait for 1000ms.
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000)
    await expect(
      page.locator('[data-testid=filesTable][data-loading=false]')
    ).toBeVisible()
    const tableRows = await page
      .getByTestId('filesTable')
      .getByTestId(new RegExp(`${name}.*`))
      .all()
    // First delete all top-level objects in the bucket, because a bucket
    // can't be deleted if there are objects in it.
    for (const row of tableRows) {
      const id = await row.getAttribute('data-testid')
      if (id === '..') {
        continue
      }
      if (id?.endsWith('/')) {
        await deleteDirectory(page, id)
      } else {
        await deleteFile(page, id)
      }
    }
    await navigateToBuckets({ page })
    await deleteBucket(page, name)
  }
}

export async function openBucketContextMenu(page: Page, name: string) {
  await page.getByRole('row', { name }).getByRole('button').first().click()
}

export async function openBucket(page: Page, name: string) {
  await page.getByRole('row').getByText(name).click()
  await expect(page.getByTestId('navbar').getByText(name)).toBeVisible()
  await expect(page.getByLabel('Upload files')).toBeVisible()
}

export async function bucketInList(page: Page, name: string) {
  await expect(page.getByTestId('bucketsTable').getByText(name)).toBeVisible()
}

export async function bucketNotInList(page: Page, name: string) {
  await expect(page.getByTestId('bucketsTable').getByText(name)).toBeHidden()
}
