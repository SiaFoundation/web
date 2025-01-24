import { test, expect } from '@playwright/test'
import { recoverWallet, rescanWallets, walletInList } from '../fixtures/wallet'
import { navigateToWallet } from '../fixtures/navigate'
import { random } from '@technically/lodash'
import {
  afterTest,
  beforeTest,
  sendSiacoinFromRenterd,
} from '../fixtures/beforeTest'
import { toHastings } from '@siafoundation/units'
import { testRequiresClipboardPermissions } from '@siafoundation/e2e'
import { sendSiacoinWithSeedWallet } from '../fixtures/seedSendSiacoin'
import { mine, getCurrentHeight } from '@siafoundation/clusterd'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('send siacoin with a seed wallet pre and post v2 fork allow height', async ({
  page,
  browserName,
}) => {
  const height = await getCurrentHeight()
  console.log('height', height)
  testRequiresClipboardPermissions(browserName)
  // Mnemonic and address0 for the wallet.
  const name = 'test-send-siacoin-seed-wallet'
  const mnemonic =
    'myth north belt curtain short disease neck jungle jealous venue across very'
  const address0 =
    '3af8e2a77c4b666dfc3cf7f68dfabaf61fa9d7707cbcd4308a5b75b63a9452e3edc505af3c79'
  // Add some funds to address 0 to use for sending.
  await sendSiacoinFromRenterd(address0, toHastings(1_000_000).toString())

  // Recipient address for the transaction.
  const receiveAddress =
    '5739945c21e60afd70eaf97ccd33ea27836e0219212449f39e4b38acaa8b3119aa4150a9ef0f'
  const changeAddress = address0

  await recoverWallet(page, name, mnemonic)
  await walletInList(page, name)
  await rescanWallets(page)
  await navigateToWallet(page, name)
  const navbar = page.getByTestId('navbar')
  await expect(navbar.getByText('1.000 MS')).toBeVisible({ timeout: 20_000 })

  await sendSiacoinWithSeedWallet(page, {
    browserName,
    walletName: name,
    mnemonic,
    receiveAddress,
    changeAddress,
    amount: random(1, 20),
    fee: 0.004,
  })

  await mine(100)
  await page.reload()

  await sendSiacoinWithSeedWallet(page, {
    browserName,
    walletName: name,
    mnemonic,
    receiveAddress,
    changeAddress,
    amount: random(21, 40),
    // Fee is calculated differently in v2 send flow.
    fee: 0.02,
  })
})
