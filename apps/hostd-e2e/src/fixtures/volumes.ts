import { Page, expect } from '@playwright/test'
import { navigateToVolumes } from './navigate'
import {
  clearToasts,
  fillTextInputByName,
  maybeExpectAndReturn,
  step,
} from '@siafoundation/e2e'

export const createVolume = step(
  'create volume',
  async (page: Page, name: string, path: string) => {
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
      page.getByRole('dialog').getByText('Must be between 10.00 GB'),
    ).toBeHidden()
    await page.locator('input[name=size]').press('Enter')
    await expect(page.getByRole('dialog')).toBeHidden()
    const row = page.getByRole('row', { name: fullPath })
    await expect(page.getByText('New volume created')).toBeVisible()
    await expect(row.getByText('ready')).toBeVisible()
    await expect(page.getByRole('cell', { name: fullPath })).toBeVisible()
    await clearToasts({ page })
  },
)

export const deleteVolume = step(
  'delete volume',
  async (page: Page, name: string, path: string) => {
    const fullPath = `${path}/${name}`
    await openVolumeContextMenu(page, fullPath)
    const menuDelete = page.getByRole('menuitem', { name: 'Delete' })
    await menuDelete.click({ timeout: 10_000 })
    await fillTextInputByName(page, 'path', fullPath)
    await page.locator('input[name=path]').press('Enter')
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(
      page.getByText('Volume is now being permanently deleted'),
    ).toBeVisible()
    const row = page.getByRole('row', { name: fullPath })
    await expect
      .poll(
        async () =>
          (await row.getByText('removing').isVisible()) ||
          (await page
            .getByTestId('volumesTable')
            .getByText(fullPath)
            .isHidden()),
      )
      .toBe(true)
  },
)

export const deleteVolumeIfExists = step(
  'delete volume if exists',
  async (page: Page, name: string, path: string) => {
    const doesVolumeExist = await page
      .getByTestId('volumesTable')
      .getByText(path + '/' + name)
      .isVisible()
    if (doesVolumeExist) {
      await deleteVolume(page, name, path)
    }
  },
)

export const openVolumeContextMenu = step(
  'open volume context menu',
  async (page: Page, name: string) => {
    const menu = page
      .getByRole('row', { name })
      .getByLabel('volume context menu')
    await expect(menu).toBeVisible()
    await menu.click()
  },
)

export function getVolumeRows(page: Page) {
  return page.getByTestId('volumesTable').locator('tbody').getByRole('row')
}

export const volumeInList = step(
  'volume in list',
  async (page: Page, name: string) => {
    await expect(page.getByTestId('volumesTable').getByText(name)).toBeVisible()
  },
)

export const volumeNotInList = step(
  'volume not in list',
  async (page: Page, name: string) => {
    await expect(page.getByTestId('volumesTable').getByText(name)).toBeHidden()
  },
)

export const getVolumeRowByIndex = step(
  'get volume row by index',
  async (page: Page, index: number, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page
        .getByTestId('volumesTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index),
      shouldExpect,
    )
  },
)

export const expectVolumeRowByIndex = step(
  'expect volume row by index',
  async (page: Page, index: number) => {
    return expect(
      page
        .getByTestId('volumesTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index),
    ).toBeVisible()
  },
)
