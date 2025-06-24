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
import { Cluster, mine, mineToHeight } from '@siafoundation/clusterd'

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

let cluster: Cluster

test.beforeEach(async ({ page }) => {
  cluster = await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('send siacoin between wallets pre and post v2 fork allow height', async ({
  page,
  browserName,
}) => {
  testRequiresClipboardPermissions(browserName)

  // Setup both wallets.
  const wallet1Name = 'sender-wallet'
  const wallet2Name = 'receiver-wallet'

  // Add initial funds to wallet1.
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

  // Send v1 transaction.
  const amountV1 = random(1, 20)
  await sendSiacoinWithSeedWallet(page, {
    walletName: wallet1Name,
    mnemonic: wallet1Mnemonic,
    receiveAddress: wallet2Address0,
    changeAddress: wallet1Address0,
    amount: amountV1,
    expectedFee: 0.004,
    expectedVersion: 'v1',
    transactionVersionIndicator:
      'testCluster - constructing v1 transaction - switching to v2 at allow height 400',
  })

  await mine(1)

  // Verify v1 transaction in wallet2.
  await navigateToWallet(page, wallet2Name)
  await expect(navbar.getByText(`${amountV1.toFixed(3)} SC`)).toBeVisible({
    timeout: 20_000,
  })

  // Mine blocks to pass v2 fork height.
  const consensusNetwork =
    await cluster.daemons.walletds[0].api.consensusNetwork()
  await mineToHeight(consensusNetwork.data.hardforkV2.allowHeight + 1)
  await page.reload()

  // Switch back to wallet1 for v2 transaction.
  await navigateToWallet(page, wallet1Name)

  // Send v2 transaction.
  const amountV2 = random(21, 40)
  await sendSiacoinWithSeedWallet(page, {
    walletName: wallet1Name,
    mnemonic: wallet1Mnemonic,
    receiveAddress: wallet2Address0,
    changeAddress: wallet1Address0,
    amount: amountV2,
    expectedFee: 0.02,
    expectedVersion: 'v2',
    transactionVersionIndicator:
      'testCluster - constructing v2 transaction - switched to v2 at allow height 400',
  })

  await mine(1)

  // Verify v2 transaction in wallet2.
  await navigateToWallet(page, wallet2Name)
  await expect(
    navbar.getByText(`${(amountV1 + amountV2).toFixed(3)} SC`)
  ).toBeVisible({
    timeout: 20_000,
  })
})
