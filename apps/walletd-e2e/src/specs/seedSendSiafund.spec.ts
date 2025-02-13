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
import {
  testRequiresClipboardPermissions,
  fillTextInputByName,
  fillSelectInputByName,
  expectTextInputByName,
} from '@siafoundation/e2e'
import { mine } from '@siafoundation/clusterd'
import { sendSiafundWithSeedWallet } from '../fixtures/seedSendSiafund'

// First wallet - sender
const wallet1Mnemonic =
  'myth north belt curtain short disease neck jungle jealous venue across very'
const wallet1Address0 =
  '3af8e2a77c4b666dfc3cf7f68dfabaf61fa9d7707cbcd4308a5b75b63a9452e3edc505af3c79'

// Second wallet - receiver
const wallet2Mnemonic =
  'volume receive fun good mouse clap enrich maximum trick tomato shrimp region'
const wallet2Address0 =
  '4e7e288504d86ae2234ffc6989aa96e70eb555ace205eb2d0afaaca650536fd1de3b5ff8f90c'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    siafundAddr: wallet1Address0,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('send siafund between wallets pre and post v2 fork allow height', async ({
  page,
  browserName,
}) => {
  testRequiresClipboardPermissions(browserName)

  // Setup both wallets.
  const wallet1Name = 'sender-wallet'
  const wallet2Name = 'receiver-wallet'

  // Add some siacoins to cover fees.
  await sendSiacoinFromRenterd(
    wallet1Address0,
    toHastings(1_000_000).toString()
  )

  // Recover both wallets.
  await recoverWallet(page, wallet1Name, wallet1Mnemonic)
  await recoverWallet(page, wallet2Name, wallet2Mnemonic)
  await walletInList(page, wallet1Name)
  await walletInList(page, wallet2Name)
  await rescanWallets(page)

  // Navigate to wallet1 and verify initial balance.
  await navigateToWallet(page, wallet1Name)
  const navbar = page.getByTestId('navbar')
  await expect(navbar.getByText('1.000 MS')).toBeVisible({ timeout: 20_000 })
  await expect(navbar.getByText('10,000 SF')).toBeVisible({ timeout: 20_000 })

  // Send v1 transaction
  const amountV1 = random(1, 20)
  await sendSiafundWithSeedWallet(page, {
    walletName: wallet1Name,
    mnemonic: wallet1Mnemonic,
    receiveAddress: wallet2Address0,
    changeAddress: wallet1Address0,
    claimAddress: wallet1Address0,
    amount: amountV1,
    expectedFee: 0.004,
    expectedVersion: 'v1',
  })

  await mine(1)

  // Verify v1 transaction in wallet2.
  await navigateToWallet(page, wallet2Name)
  await expect(navbar.getByText(`${amountV1.toLocaleString()} SF`)).toBeVisible(
    {
      timeout: 20_000,
    }
  )

  // Mine blocks to pass v2 fork height.
  await mine(100)
  await page.reload()

  // Switch back to wallet1 for v2 transaction.
  await navigateToWallet(page, wallet1Name)

  // Send v2 transaction.
  const amountV2 = random(21, 40)
  await sendSiafundWithSeedWallet(page, {
    walletName: wallet1Name,
    mnemonic: wallet1Mnemonic,
    receiveAddress: wallet2Address0,
    changeAddress: wallet1Address0,
    amount: amountV2,
    expectedFee: 0.02,
    expectedVersion: 'v2',
  })

  await mine(1)

  // Verify v2 transaction in wallet2.
  await navigateToWallet(page, wallet2Name)
  await expect(
    navbar.getByText(`${(amountV1 + amountV2).toLocaleString()} SF`)
  ).toBeVisible({
    timeout: 20_000,
  })
})

test('switching between siacoin and siafund modes resets amount fields', async ({
  page,
  browserName,
}) => {
  testRequiresClipboardPermissions(browserName)

  // Setup wallet.
  const wallet1Name = 'sender-wallet'
  await recoverWallet(page, wallet1Name, wallet1Mnemonic)
  await walletInList(page, wallet1Name)
  await rescanWallets(page)

  await sendSiacoinFromRenterd(
    wallet1Address0,
    toHastings(1_000_000).toString()
  )

  // Navigate to wallet and verify initial balance.
  await navigateToWallet(page, wallet1Name)
  const navbar = page.getByTestId('navbar')
  await expect(navbar.getByText('1.000 MS')).toBeVisible({ timeout: 20_000 })
  await expect(navbar.getByText('10,000 SF')).toBeVisible({ timeout: 20_000 })

  // Open send dialog.
  await page.getByLabel('send').click()

  // Fill out form with siacoin.
  await fillTextInputByName(page, 'receiveAddress', wallet2Address0)
  await fillTextInputByName(page, 'siacoin', '100')
  await expectTextInputByName(page, 'siacoin', '100')

  // Switch to siafund mode.
  await fillSelectInputByName(page, 'mode', 'siafund')
  await fillTextInputByName(page, 'siafund', '50')
  await expectTextInputByName(page, 'siafund', '50')

  // Switch back to siacoin mode.
  await fillSelectInputByName(page, 'mode', 'siacoin')
  await expectTextInputByName(page, 'siacoin', '')

  // Switch back to siafund mode.
  await fillSelectInputByName(page, 'mode', 'siafund')
  await expectTextInputByName(page, 'siafund', '')
})
