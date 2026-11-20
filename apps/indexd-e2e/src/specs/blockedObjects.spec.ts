import { test, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToBlockedObjects } from '../fixtures/navigate'
import {
  blockObject,
  findObject,
  mockApiObjectAccounts,
  objectKey,
} from '../fixtures/objects'
import {
  closeSidePanel,
  confirmDialog,
  getRow,
  saveSidePanel,
  selectRow,
} from '../fixtures/table'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
  await mockApiObjectAccounts(page, {})
})

test.afterEach(async () => {
  await afterTest()
})

test('block an object', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await expect(page.getByText('There are no blocked objects.')).toBeVisible()
  await blockObject(page, { key: objectKey(1), reason: 'dmca-1234' })

  await expect(getRow(page, 'dmca-1234')).toBeVisible()
  // The blocked object opens in the side panel.
  await expect(page.locator('input[name="reason"]')).toHaveValue('dmca-1234')
  await expect(page.getByRole('button', { name: 'Unblock' })).toBeVisible()
  // A key can be blocked before any object has it.
  await expect(page.getByText('Not found')).toBeVisible()
  await expect(page.getByText('Accounts', { exact: true })).toBeHidden()
})

test('reject an invalid object key', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await page.getByRole('button', { name: 'Block object' }).click()
  const dialog = page.getByRole('dialog', { name: 'Block object' })
  await dialog.locator('input[name="objectKey"]').fill('not-a-key')
  await expect(dialog.getByText('must be a 64 character hex key')).toBeVisible()
})

test('edit the reason of a blocked object', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await blockObject(page, { key: objectKey(1), reason: 'dmca-1234' })

  await fillTextInputByName(page, 'reason', 'dmca-5678')
  await saveSidePanel(page, 'reason')
  await expect(page.getByText('Reason updated')).toBeVisible()

  // The change persists across a reload.
  await page.reload()
  await expect(getRow(page, 'dmca-5678')).toBeVisible()
  await expect(getRow(page, 'dmca-1234')).toBeHidden()
})

test('unblock an object from its panel', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await blockObject(page, { key: objectKey(1), reason: 'dmca-1234' })

  await page.getByRole('button', { name: 'Unblock' }).click()
  await confirmDialog(page, 'Unblock')
  await expect(page.getByText('Object unblocked')).toBeVisible()
  // The panel closes since the key is no longer blocked.
  await expect(
    page.getByText('Select an object to see its details'),
  ).toBeVisible()
  await expect(page.getByText('There are no blocked objects.')).toBeVisible()
})

test('unblock multiple objects', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await blockObject(page, { key: objectKey(1), reason: 'reason one' })
  await blockObject(page, { key: objectKey(2), reason: 'reason two' })
  await closeSidePanel(page)

  await selectRow(page, 'reason one')
  await selectRow(page, 'reason two')
  await expect(page.getByText('Selected objects (2)')).toBeVisible()
  await page.getByRole('button', { name: 'Unblock (2)' }).click()
  await confirmDialog(page, 'Unblock')
  await expect(page.getByText('Unblocked 2 objects')).toBeVisible()
  await expect(page.getByText('There are no blocked objects.')).toBeVisible()
})

test('block an object that is already blocked', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await blockObject(page, { key: objectKey(1), reason: 'dmca-1234' })

  await page.getByRole('button', { name: 'Block object' }).click()
  const dialog = page.getByRole('dialog', { name: 'Block object' })
  await dialog.locator('input[name="objectKey"]').fill(objectKey(1))
  await dialog.locator('input[name="reason"]').fill('dmca-5678')
  await dialog.getByRole('button', { name: 'Block object' }).click()
  // The existing reason is kept.
  await expect(dialog.getByText('already blocked: dmca-1234')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(getRow(page, 'dmca-1234')).toBeVisible()
  await expect(getRow(page, 'dmca-5678')).toBeHidden()
})

test('find a blocked object', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await blockObject(page, { key: objectKey(1), reason: 'reason one' })
  await blockObject(page, { key: objectKey(2), reason: 'reason two' })
  await closeSidePanel(page)

  await findObject(page, objectKey(1))
  await expect(page.locator('input[name="reason"]')).toHaveValue('reason one')
})

test('find a key that is not blocked', async ({ page }) => {
  await navigateToBlockedObjects(page)
  await page.getByRole('button', { name: 'Find blocked object' }).click()
  const dialog = page.getByRole('dialog', { name: 'Find blocked object' })
  await dialog.locator('input[name="objectKey"]').fill(objectKey(5))
  await dialog.getByRole('button', { name: 'Find', exact: true }).click()
  // The dialog stays open with the error and no panel opens.
  await expect(dialog.getByText('this key is not blocked')).toBeVisible()
  await expect(
    page.getByText('Select an object to see its details'),
  ).toBeVisible()
})

test('show the accounts that pinned a blocked object', async ({ page }) => {
  await mockApiObjectAccounts(page, {
    [objectKey(4)]: [
      { accountKey: 'ed25519:' + 'a'.repeat(64), connectKey: 'connect-key-1' },
      { accountKey: 'ed25519:' + 'b'.repeat(64), connectKey: 'connect-key-2' },
    ],
  })
  await navigateToBlockedObjects(page)
  await blockObject(page, { key: objectKey(4), reason: 'dmca-1234' })

  const accounts = page.getByTestId('objectAccount')
  await expect(accounts).toHaveCount(2)
  await expect(accounts.nth(0).getByText('connect-key-1')).toBeVisible()
  await expect(accounts.nth(1).getByText('connect-key-2')).toBeVisible()
  await expect(page.getByText('Not found')).toBeHidden()
  // Each account links to its panel on the accounts page.
  await expect(accounts.nth(0).getByRole('link')).toHaveAttribute(
    'href',
    new RegExp(`accountsPanelId=ed25519%3A${'a'.repeat(64)}`),
  )
})
