import { Page, expect } from '@playwright/test'
import { navigateToVolumes } from './navigate'
import { fillTextInputByName } from './textInput'

export async function createVolume(page: Page, name: string, path: string) {
  const fullPath = `${path}/${name}`
  await navigateToVolumes({ page })
  await page.getByText('Create volume').click()
  await fillTextInputByName(page, 'name', name)
  await fillTextInputByName(page, 'immediatePath', path)
  // immediatePath updates path after 500ms
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(1000)
  await fillTextInputByName(page, 'size', '11')
  await expect(
    page.getByRole('dialog').getByText('Must be between 10.00 GB')
  ).toBeHidden()
  await page.locator('input[name=size]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  const row = page.getByRole('row', { name: fullPath })
  await expect(page.getByText('Volume created')).toBeVisible()
  await expect(row.getByText('ready')).toBeVisible()
  await expect(page.getByRole('cell', { name: fullPath })).toBeVisible()
}

export async function deleteVolume(page: Page, name: string, path: string) {
  const fullPath = `${path}/${name}`
  await openVolumeContextMenu(page, fullPath)
  const menuDelete = page.getByRole('menuitem', { name: 'Delete' })
  await menuDelete.click({ timeout: 10_000 })
  await fillTextInputByName(page, 'path', fullPath)
  await page.locator('input[name=path]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(
    page.getByText('Volume is now being permanently deleted')
  ).toBeVisible()
  await volumeNotInList(page, fullPath)
}

export async function deleteVolumeIfExists(
  page: Page,
  name: string,
  path: string
) {
  const doesVolumeExist = await page
    .getByRole('table')
    .getByText(path + '/' + name)
    .isVisible()
  if (doesVolumeExist) {
    await deleteVolume(page, name, path)
  }
}

export async function openVolumeContextMenu(page: Page, name: string) {
  await page
    .getByRole('row', { name })
    .getByLabel('volume context menu')
    .click()
}

export async function volumeInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name)).toBeVisible()
}

export async function volumeNotInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name)).toBeHidden()
}
