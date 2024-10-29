import { test, expect } from '@playwright/test'
import {
  createNewWallet,
  generateAddresses,
  recoverWallet,
  walletInList,
} from '../fixtures/wallet'
import { navigateToWallet } from '../fixtures/navigate'
import {
  afterTest,
  beforeTest,
  sendSiacoinFromRenterd,
} from '../fixtures/beforeTest'
import { humanDate, toHastings } from '@siafoundation/units'
import { getEventRowByIndex } from '../fixtures/events'
import { testRequiresClipboardPermissions } from '@siafoundation/e2e'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('create new seed wallet', async ({ page, browserName }) => {
  testRequiresClipboardPermissions(browserName)
  const name = 'my-new-seed-wallet'
  await createNewWallet(page, name)
  await expect(page.getByRole('table').getByText(name).first()).toBeVisible()
  await page.getByRole('table').getByText(name).first().click()
  await expect(page.getByText('The wallet has no')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Addresses' })).toBeVisible()
})

test('recover wallet and see existing transactions', async ({
  page,
  browserName,
}) => {
  testRequiresClipboardPermissions(browserName)
  const name = 'my-existing-wallet'
  const mnemonic =
    'myth north belt curtain short disease neck jungle jealous venue across very'
  const address0 =
    '3af8e2a77c4b666dfc3cf7f68dfabaf61fa9d7707cbcd4308a5b75b63a9452e3edc505af3c79'
  const address1 =
    'fc869ca9941a79def1cd4384e8594b7e7518326142447d6bffa1cb02ad79ebce4f89a678bf8b'
  const address2 =
    '6fd502039be6cdce44edb0e01d946b300539c16ac932d2d7b9aa47329d8a60e4a7eabddbc52b'
  await sendSiacoinFromRenterd(address0, toHastings(1_000_000).toString())
  await sendSiacoinFromRenterd(address1, toHastings(400).toString())
  await sendSiacoinFromRenterd(address2, toHastings(800).toString())
  await recoverWallet(page, name, mnemonic)
  await walletInList(page, name)
  await generateAddresses({
    page,
    walletName: name,
    startIndex: 0,
    count: 5,
    rescan: true,
    rescanStartHeight: 0,
  })
  await navigateToWallet(page, name)
  const row1 = await getEventRowByIndex(page, 0, true)
  const row2 = await getEventRowByIndex(page, 1, true)
  const row3 = await getEventRowByIndex(page, 2, true)
  const today = humanDate(new Date(), { timeStyle: 'short' })
  await expect(row1.getByText(today)).toBeVisible()
  await expect(row1.getByText('siacoin transfer')).toBeVisible()
  await expect(row1.getByText('+800.000 SC')).toBeVisible()
  await expect(row1.getByText('+$3.16')).toBeVisible()
  await expect(row1.getByText('12.000 mS')).toBeVisible()
  await expect(row1.getByText('$0.00')).toBeVisible()
  await expect(row2.getByText(today)).toBeVisible()
  await expect(row2.getByText('siacoin transfer')).toBeVisible()
  await expect(row2.getByText('+400.000 SC')).toBeVisible()
  await expect(row2.getByText('+$1.58')).toBeVisible()
  await expect(row2.getByText('12.000 mS')).toBeVisible()
  await expect(row2.getByText('$0.00')).toBeVisible()
  await expect(row3.getByText(today)).toBeVisible()
  await expect(row3.getByText('siacoin transfer')).toBeVisible()
  await expect(row3.getByText('+1.000 MS')).toBeVisible()
  await expect(row3.getByText('+$3,944.05')).toBeVisible()
  await expect(row3.getByText('12.000 mS')).toBeVisible()
  await expect(row3.getByText('$0.00')).toBeVisible()
})
