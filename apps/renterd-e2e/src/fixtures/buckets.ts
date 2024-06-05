import { Page, expect } from '@playwright/test'
import { navigateToBuckets } from './navigateToBuckets'
import { fillTextInputByName } from './textInput'
import { clearToasts } from './clearToasts'

export async function createBucket(page: Page, name: string) {
  await navigateToBuckets({ page })
  await expect(page.getByTestId('navbar').getByText('Buckets')).toBeVisible()
  await page.getByText('Create bucket').click()
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
    .getByRole('table')
    .getByText(name)
    .isVisible()
  if (doesBucketExist) {
    await deleteBucket(page, name)
  }
}

export async function openBucketContextMenu(page: Page, name: string) {
  await page.getByRole('row', { name }).getByRole('button').first().click()
}

export async function bucketInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name)).toBeVisible()
}

export async function bucketNotInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name)).toBeHidden()
}
