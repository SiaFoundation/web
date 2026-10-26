import { test, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest, getIndexdNode } from '../fixtures/beforeTest'
import { navigateToAccounts, navigateToKeys } from '../fixtures/navigate'
import { registerAccount } from '../fixtures/accounts'
import {
  confirmDialog,
  getRow,
  getSidePanel,
  openRow,
  saveSidePanel,
  selectRow,
} from '../fixtures/table'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('list a registered account', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  const row = getRow(page, accountKey)
  await expect(row).toBeVisible()
  await expect(row.getByRole('cell', { name: '0 B' })).toBeVisible()
})

test('view the accounts of a connect key', async ({ page }) => {
  const indexdNode = getIndexdNode()
  const accountA = await registerAccount({
    indexdNode,
    connectKeyDescription: 'Key A',
  })
  const accountB = await registerAccount({
    indexdNode,
    connectKeyDescription: 'Key B',
  })

  await navigateToKeys(page)
  await openRow(page, 'Key A')
  // The sidenav also has an Accounts button, so use the side panel's.
  await getSidePanel(page)
    .getByRole('button', { name: 'Accounts', exact: true })
    .click()
  await expect(page).toHaveURL(/\/accounts/)
  await expect(
    page.getByRole('button', {
      name: `Connect key is ${accountA.connectKey.slice(0, 10)}`,
    }),
  ).toBeVisible()
  await expect(getRow(page, accountA.accountKey)).toBeVisible()
  await expect(getRow(page, accountB.accountKey)).toBeHidden()
})

test('edit the max pinned data of an account', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  await openRow(page, accountKey)
  await fillTextInputByName(page, 'maxPinnedDataGB', '10')
  await saveSidePanel(page, 'maxPinnedDataGB')
  await expect(page.getByText('Account updated')).toBeVisible()

  // The change persists across a reload.
  await page.reload()
  await expect(
    getRow(page, accountKey).getByRole('cell', { name: '10.00 GB' }),
  ).toBeVisible()
})

test('delete an account from its side panel', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  await openRow(page, accountKey)
  await page.getByRole('button', { name: 'Delete account' }).click()

  // The deletion has to be confirmed by typing the phrase.
  const dialog = page.getByRole('dialog')
  await fillTextInputByName(page, 'name', 'delete the account')
  await dialog.getByRole('button', { name: 'Delete account' }).click()
  await expect(dialog.getByText('does not match')).toBeVisible()
  await expect(dialog).toBeVisible()

  await fillTextInputByName(page, 'name', 'delete the account and all its data')
  await dialog.getByRole('button', { name: 'Delete account' }).click()
  await expect(page.getByText('Account permanently deleted')).toBeVisible()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: 'Close drawer' })).toBeHidden()

  // The account is gone after a reload.
  await page.reload()
  await expect(page.getByText('There are no accounts yet.')).toBeVisible()
})

test('delete an account with a bulk action', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  await selectRow(page, accountKey)
  await page.getByRole('button', { name: 'Delete', exact: true }).click()
  await confirmDialog(page, 'Delete')
  await expect(page.getByText('Deleted 1 account')).toBeVisible()
  await expect(getRow(page, accountKey)).toBeHidden()
})
