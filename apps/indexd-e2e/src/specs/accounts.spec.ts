import { test, expect, Request } from '@playwright/test'
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
  await expect(
    row.getByRole('cell', { name: 'E2E App', exact: true }),
  ).toBeVisible()
  await expect(
    row.getByRole('cell', { name: 'E2E app description' }),
  ).toBeVisible()
  await expect(row.getByRole('cell', { name: '0 B' })).toBeVisible()
})

test('view the app details of an account', async ({ page }) => {
  const { accountKey } = await registerAccount({
    indexdNode: getIndexdNode(),
    app: {
      name: 'Photos',
      description: 'Photo backup app',
      logoURL: 'https://photos.example.com/logo.png',
      serviceURL: 'https://photos.example.com',
    },
  })
  await navigateToAccounts(page)
  await openRow(page, accountKey)
  const panel = getSidePanel(page)
  for (const value of [
    'Photos',
    'Photo backup app',
    'https://photos.example.com/logo.png',
    'https://photos.example.com',
  ]) {
    await expect(panel.getByText(value, { exact: true })).toBeVisible()
  }
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

test('prune slabs with the default cutoff', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  await openRow(page, accountKey)
  const request = page.waitForRequest(
    (r) => r.url().includes('/slabs/prune') && r.method() === 'POST',
  )
  await page.getByRole('button', { name: 'Prune slabs' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Prune slabs' }).click()
  await expect(page.getByText('Slabs pruned')).toBeVisible()
  await expect(dialog).toBeHidden()

  // Without an age, indexd picks the cutoff.
  const url = new URL((await request).url())
  expect(url.searchParams.has('before')).toBe(false)
})

function isRefetch(r: Request, path: string, after: boolean) {
  return (
    after && r.method() === 'GET' && decodeURIComponent(r.url()).includes(path)
  )
}

test('refresh the account after pruning slabs', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  await openRow(page, accountKey)

  // The test account has no orphaned slabs, so its pinned data does not
  // change. Check that the panel and the list refetch after the prune.
  let pruned = false
  page.on('response', (r) => {
    if (r.url().includes('/slabs/prune')) {
      pruned = true
    }
  })
  const accountRefetch = page.waitForRequest((r) =>
    isRefetch(r, `/api/account/${accountKey}`, pruned),
  )
  const accountsRefetch = page.waitForRequest((r) =>
    isRefetch(r, '/api/accounts', pruned),
  )

  await page.getByRole('button', { name: 'Prune slabs' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Prune slabs' })
    .click()
  await expect(page.getByText('Slabs pruned')).toBeVisible()
  await accountRefetch
  await accountsRefetch
})

test('prune slabs pinned before a cutoff', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  await openRow(page, accountKey)
  const request = page.waitForRequest(
    (r) => r.url().includes('/slabs/prune') && r.method() === 'POST',
  )
  await page.getByRole('button', { name: 'Prune slabs' }).click()
  const dialog = page.getByRole('dialog')
  await fillTextInputByName(page, 'minAgeHours', '24')
  const submittedAt = Date.now()
  await dialog.getByRole('button', { name: 'Prune slabs' }).click()
  await expect(page.getByText('Slabs pruned')).toBeVisible()

  // The cutoff is 24 hours before the prune was submitted.
  const url = new URL((await request).url())
  const before = Date.parse(url.searchParams.get('before') ?? '')
  const expected = submittedAt - 24 * 60 * 60 * 1000
  expect(Math.abs(before - expected)).toBeLessThan(60_000)
})

test('reject a negative prune cutoff', async ({ page }) => {
  const { accountKey } = await registerAccount({ indexdNode: getIndexdNode() })
  await navigateToAccounts(page)
  await openRow(page, accountKey)
  let pruned = false
  page.on('request', (r) => {
    if (r.url().includes('/slabs/prune')) {
      pruned = true
    }
  })
  await page.getByRole('button', { name: 'Prune slabs' }).click()
  const dialog = page.getByRole('dialog')
  await fillTextInputByName(page, 'minAgeHours', '-24')
  await dialog.getByRole('button', { name: 'Prune slabs' }).click()
  await expect(
    dialog.getByText('must be between 0 and 1,000,000'),
  ).toBeVisible()
  await expect(dialog).toBeVisible()
  expect(pruned).toBe(false)
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

  // The list updates without a reload.
  await expect(getRow(page, accountKey)).toBeHidden()
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
