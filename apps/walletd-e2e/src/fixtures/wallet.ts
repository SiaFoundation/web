import { BrowserContext, expect, Page } from '@playwright/test'
import { fillTextInputByName } from './textInput'
import { clickTextareaByName, fillTextareaByName } from './textarea'
import { waitForTableToReload } from './table'

export async function createNewWallet(
  page: Page,
  context: BrowserContext,
  name: string
) {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
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
  context: BrowserContext,
  name: string,
  mnemonic: string
) {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
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

export async function walletInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name).first()).toBeVisible()
}

export async function walletNotInList(page: Page, name: string) {
  await expect(page.getByRole('table').getByText(name).first()).toBeHidden()
}
