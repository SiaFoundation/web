import { expect, Page } from '@playwright/test'
import {
  fillTextInputByName,
  clickTextareaByName,
  fillTextareaByName,
  waitForTableToReload,
  step,
  expectThenClick,
  clearToasts,
} from '@siafoundation/e2e'
import { navigateToWallet } from './navigate'

export const createNewWallet = step(
  'create new wallet',
  async (page: Page, name: string) => {
    await expect(page.getByRole('button', { name: 'Add wallet' })).toBeVisible()
    await page.getByRole('button', { name: 'Add wallet' }).click()
    await page.getByRole('button', { name: 'Create a wallet' }).click()
    await fillTextInputByName(page, 'name', name, true)
    await fillTextareaByName(page, 'description', name, true)
    await clickTextareaByName(page, 'mnemonic')
    const cb = await page.evaluateHandle(() => navigator.clipboard.readText())
    const mnemonic = await cb.jsonValue()
    await page.getByRole('button', { name: 'Add wallet' }).click()
    await expect(page.getByText(`Wallet ${name.slice(0, 5)}`)).toBeVisible()
    await fillTextInputByName(page, 'mnemonic', mnemonic)
    await page.getByRole('button', { name: 'Generate addresses' }).click()
  }
)

export const recoverWallet = step(
  'recover wallet',
  async (page: Page, name: string, mnemonic: string) => {
    await expect(page.getByRole('button', { name: 'Add wallet' })).toBeVisible()
    await page.getByRole('button', { name: 'Add wallet' }).click()
    await page.getByRole('button', { name: 'Recover a wallet' }).click()
    await fillTextInputByName(page, 'name', name, true)
    await fillTextareaByName(page, 'description', name, true)
    await fillTextareaByName(page, 'mnemonic', mnemonic, true)
    await page.getByRole('button', { name: 'Add wallet' }).click()
    await expect(page.getByText(`Wallet ${name.slice(0, 5)}`)).toBeVisible()
    await fillTextInputByName(page, 'mnemonic', mnemonic)
    await page.getByRole('button', { name: 'Generate addresses' }).click()
  }
)

export const deleteWallet = step(
  'delete wallet',
  async (page: Page, name: string) => {
    await openWalletRowContextMenu(page, name)
    await page.getByRole('menuitem', { name: 'Delete wallet' }).click()
    await fillTextInputByName(page, 'name', name)
    await page.locator('input[name=name]').press('Enter')
    await expect(page.getByRole('dialog')).toBeHidden()
    await walletNotInList(page, name)
  }
)

export const unlockOpenWallet = step(
  'unlock wallet',
  async (page: Page, mnemonic: string) => {
    await openWalletNavContextMenu(page)
    // Wait for menu to open.
    await expect(
      page.getByRole('menuitem', { name: 'Delete wallet' })
    ).toBeVisible()
    // If we see a "lock wallet" button, its already unlocked.
    const isLocked = await page
      .getByRole('menuitem', { name: 'Unlock wallet' })
      .isVisible()
    if (isLocked) {
      await expectThenClick(
        page.getByRole('menuitem', { name: 'Unlock wallet' })
      )
      await fillTextInputByName(page, 'mnemonic', mnemonic)
      await page.locator('input[name=mnemonic]').press('Enter')
      await expect(page.getByRole('dialog')).toBeHidden()
    } else {
      // Close context menu.
      await page.keyboard.press('Escape')
      await expect(page.getByTestId('dropdown-menu-content')).toBeHidden()
    }
  }
)

export const rescanWallets = step('rescan wallets', async (page: Page) => {
  await openWalletsContextMenu(page)
  await page.getByRole('menuitem', { name: 'Rescan blockchain' }).click()
  await fillTextInputByName(page, 'rescanStartHeight', '0')
  await page.locator('input[name=rescanStartHeight]').press('Enter')
  await waitForRescanToFinish(page)
  await clearToasts({ page })
})

export const waitForRescanToFinish = step(
  'wait for rescan to finish',
  async (page: Page) => {
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000)
    const isScanning = page
      .getByTestId('rescanStatusPanel')
      .getByText('Rescanning the blockchain')
      .isVisible()
    if (isScanning) {
      await expect(
        page
          .getByTestId('rescanStatusPanel')
          .getByText('Rescanning the blockchain')
      ).toBeHidden()
    }
  }
)

export const generateAddresses = step(
  'generate addresses',
  async ({
    walletName,
    page,
    startIndex,
    count,
    rescan = false,
    rescanStartHeight = 0,
  }: {
    walletName: string
    page: Page
    startIndex: number
    count: number
    rescan?: boolean
    rescanStartHeight: number
  }) => {
    await navigateToWallet(page, walletName)
    await page.getByLabel('view addresses').click()
    await page.getByRole('button', { name: 'Add addresses' }).click()
    await fillTextInputByName(page, 'index', startIndex.toString())
    await fillTextInputByName(page, 'count', count.toString())
    if (rescan) {
      await page.getByLabel('shouldRescan').click()
      await fillTextInputByName(
        page,
        'rescanStartHeight',
        rescanStartHeight.toString()
      )
    }
    await page.getByRole('button', { name: 'Generate addresses' }).click()
    if (rescan) {
      await waitForRescanToFinish(page)
    }
  }
)

export const deleteWalletIfExists = step(
  'delete wallet if exists',
  async (page: Page, name: string) => {
    await waitForTableToReload(page, 'walletsTable')
    const doesWalletExist = await page
      .getByTestId('walletsTable')
      .getByText(name)
      .first()
      .isVisible()
    if (doesWalletExist) {
      await deleteWallet(page, name)
    }
  }
)

export const openWallet = step(
  'open wallet',
  async (page: Page, name: string) => {
    const row = page.getByRole('table').getByText(name).first()
    await expect(row).toBeVisible()
    await row.click()
    await expect(page.getByTestId('navbar').getByText(name)).toBeVisible()
  }
)

export const openWalletRowContextMenu = step(
  'open wallet row context menu',
  async (page: Page, name: string) => {
    const menu = page.getByRole('row', { name }).getByRole('button').first()
    await expect(menu).toBeVisible()
    await menu.click()
  }
)

export const openWalletNavContextMenu = step(
  'open wallet nav context menu',
  async (page: Page) => {
    const menu = page.getByLabel('wallet context menu')
    await expect(menu).toBeVisible()
    await menu.click()
    return menu
  }
)

export const openWalletsContextMenu = step(
  'open wallets context menu',
  async (page: Page) => {
    const menu = page.getByLabel('wallet settings')
    await expect(menu).toBeVisible()
    await menu.click()
  }
)

export const walletInList = step(
  'expect wallet in list',
  async (page: Page, name: string) => {
    await expect(page.getByRole('table').getByText(name).first()).toBeVisible()
  }
)

export const walletNotInList = step(
  'expect wallet not in list',
  async (page: Page, name: string) => {
    await expect(page.getByRole('table').getByText(name).first()).toBeHidden()
  }
)
