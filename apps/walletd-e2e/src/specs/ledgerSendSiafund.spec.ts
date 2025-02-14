import { test, expect } from '@playwright/test'
import { navigateToWallet } from '../fixtures/navigate'
import { random } from '@technically/lodash'
import {
  afterTest,
  beforeTest,
  sendSiacoinFromRenterd,
} from '../fixtures/beforeTest'
import { toHastings } from '@siafoundation/units'
import {
  testOnlyWorksOn,
  testRequiresClipboardPermissions,
} from '@siafoundation/e2e'
import { clusterd, mineToHeight } from '@siafoundation/clusterd'
import { createLedgerWalletWithApi } from '../fixtures/ledger'
import { rescanWallets } from '../fixtures/wallet'
import { ledgerComposeSiafund } from '../fixtures/ledgerComposeSiafund'

// First wallet - sender (Ledger)
const wallet1Name = 'ledger-sender-wallet'
const wallet1Address0 =
  '3af8e2a77c4b666dfc3cf7f68dfabaf61fa9d7707cbcd4308a5b75b63a9452e3edc505af3c79'
const wallet1PublicKey0 =
  'ed25519:3926a0434232bba9eaca2041303a1039d4f65bf54d7bd4e2a9164ea2d778b714'

// Second wallet - receiver
const wallet2Address0 =
  '4e7e288504d86ae2234ffc6989aa96e70eb555ace205eb2d0afaaca650536fd1de3b5ff8f90c'

// Reason for the selected mining heights:
// test cluster: internal/cluster/cmd/clusterd/main.go#L131-L132
const v2AllowHeight = 400
const v2RequireHeight = 500

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    siafundAddr: wallet1Address0,
  })
  const walletdNode = clusterd.nodes.find((n) => n.type === 'walletd')
  if (!walletdNode) {
    throw new Error('Walletd node not found')
  }
  await createLedgerWalletWithApi({
    walletdNode,
    name: wallet1Name,
    address0: wallet1Address0,
    publicKey0: wallet1PublicKey0,
  })
  // Add initial funds to ledger wallet
  await sendSiacoinFromRenterd(
    wallet1Address0,
    toHastings(1_000_000).toString()
  )
  await page.reload()
})

test.afterEach(async () => {
  await afterTest()
})

test('compose siafund transaction with ledger wallet pre and post v2 fork allow height', async ({
  page,
  browserName,
}) => {
  testRequiresClipboardPermissions(browserName)
  testOnlyWorksOn(['chromium', 'webkit'], browserName)

  await rescanWallets(page)

  // Navigate to ledger wallet and verify initial balance.
  await navigateToWallet(page, wallet1Name)
  const navbar = page.getByTestId('navbar')
  await expect(navbar.getByText('1.000 MS')).toBeVisible({ timeout: 20_000 })
  await expect(navbar.getByText('10,000 SF')).toBeVisible()

  // Verify can compose v1 transaction.
  const amountV1 = random(1, 20)
  await ledgerComposeSiafund(page, {
    walletName: wallet1Name,
    receiveAddress: wallet2Address0,
    changeAddress: wallet1Address0,
    amount: amountV1,
    // v1 fee is 0.004
    expectedFee: 0.004,
    expectedVersion: 'v1',
    transactionVersionIndicator:
      'testCluster - constructing v1 transaction - switching to v2 at require height 500',
  })

  // Mine blocks to pass v2 fork allow height.
  await mineToHeight(v2AllowHeight + 1)
  await page.reload()

  // Verify still composes v1 transaction.
  const amountV12 = random(1, 20)
  await ledgerComposeSiafund(page, {
    walletName: wallet1Name,
    receiveAddress: wallet2Address0,
    changeAddress: wallet1Address0,
    amount: amountV12,
    // v1 fee is 0.004
    expectedFee: 0.004,
    expectedVersion: 'v1',
    transactionVersionIndicator:
      'testCluster - constructing v1 transaction - switching to v2 at require height 500',
  })

  // Mine blocks to pass v2 fork require height.
  await mineToHeight(v2RequireHeight + 1)
  await page.reload()

  // Verify can not compose v2 transaction.
  await navigateToWallet(page, wallet1Name)
  await page.getByLabel('send').click()
  await expect(
    page.getByText('Ledger wallets do not support sending v2 transactions')
  ).toBeVisible()
  await expect(
    page.getByText(
      'testCluster - constructing v2 transaction - switched to v2 at require height 500'
    )
  ).toBeVisible()
})
