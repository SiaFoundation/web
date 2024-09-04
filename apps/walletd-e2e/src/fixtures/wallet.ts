import { expect, Page } from '@playwright/test'
import { fillTextInputByName } from './textInput'
import { clickTextareaByName, fillTextareaByName } from './textarea'
import { waitForTableToReload } from './table'
import { navigateToWallet } from './navigateToWallet'

export async function createNewWallet(page: Page, name: string) {
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

export async function recoverWallet(
  page: Page,
  name: string,
  mnemonic: string
) {
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

export async function deleteWallet(page: Page, name: string) {
  await openWalletContextMenu(page, name)
  await page.getByRole('menuitem', { name: 'Delete wallet' }).click()
  await fillTextInputByName(page, 'name', name)
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await walletNotInList(page, name)
}

export async function unlockWallet(page: Page, name: string, mnemonic: string) {
  await openWalletContextMenu(page, name)
  await page.getByRole('menuitem', { name: 'Unlock wallet' }).click()
  await fillTextInputByName(page, 'mnemonic', mnemonic)
  await page.locator('input[name=mnemonic]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
}

export async function rescanWallets(page: Page) {
  await openWalletsContextMenu(page)
  await page.getByRole('menuitem', { name: 'Rescan blockchain' }).click()
  await fillTextInputByName(page, 'rescanStartHeight', '0')
  await page.locator('input[name=rescanStartHeight]').press('Enter')
  await waitForRescanToFinish(page)
}

export async function waitForRescanToFinish(page: Page) {
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

export async function generateAddresses({
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
}) {
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

export async function deleteWalletIfExists(page: Page, name: string) {
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

export async function openWallet(page: Page, name: string) {
  await page.getByRole('table').getByText(name).first().click()
}

export async function openWalletContextMenu(page: Page, name: string) {
  await page.getByRole('row', { name }).getByRole('button').first().click()
}

export async function openWalletsContextMenu(page: Page) {
  await page.getByLabel('wallet settings').click()
}

export async function walletInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name).first()).toBeVisible()
}

export async function walletNotInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name).first()).toBeHidden()
}
