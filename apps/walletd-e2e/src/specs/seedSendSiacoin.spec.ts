import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import { createWallet } from '../fixtures/createWallet'
import { navigateToWallet } from '../fixtures/navigateToWallet'
import { fillComposeTransactionSiacoin } from '../fixtures/sendSiacoinDialog'
import {
  getMockScenarioSeedWallet,
  mockApiDefaults,
} from '@siafoundation/mock-walletd'

function getDefaultMockWalletResponses(
  mocks: ReturnType<typeof getMockScenarioSeedWallet>
) {
  return {
    fund: mocks.walletFundResponse,
    outputsSiacoin: mocks.walletOutputsSiacoinResponse,
    addresses: mocks.walletAddressesResponse,
  }
}

test('send siacoin with a seed wallet', async ({ page }) => {
  await mockApiDefaults({ page })
  await login({ page })
  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic, receiveAddress, changeAddress } = mocks
  await createWallet({
    page,
    newWallet,
    mnemonic,
    responses: getDefaultMockWalletResponses(mocks),
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('send').click()
  await fillComposeTransactionSiacoin({
    page,
    receiveAddress: mocks.receiveAddress,
    changeAddress: mocks.changeAddress,
    amount: '1',
  })
  await expect(page.getByText('The wallet is currently unlocked')).toBeVisible()
  await expect(page.getByText('Total')).toBeVisible()
  await expect(page.getByText('1.004 SC')).toBeVisible()

  await page
    .getByRole('button', { name: 'Sign and broadcast transaction' })
    .click()
  await expect(
    page.getByText('Transaction successfully broadcast')
  ).toBeVisible()
  await expect(page.getByText(receiveAddress.slice(0, 5))).toBeVisible()
  await expect(page.getByText(changeAddress.slice(0, 5))).toBeVisible()
  await expect(page.getByText('Total')).toBeVisible()
  await expect(page.getByText('1.004 SC')).toBeVisible()
})

test('errors if the input to sign is not found on the transaction', async ({
  page,
}) => {
  await mockApiDefaults({ page })
  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic, receiveAddress, changeAddress } = mocks
  const mockFundInvalid = mocks.walletFundResponse
  mockFundInvalid.transaction.siacoinInputs[0].parentID =
    'scoid:bb3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb'
  await login({ page })
  await createWallet({
    page,
    newWallet,
    mnemonic,
    responses: {
      ...getDefaultMockWalletResponses(mocks),
      fund: mockFundInvalid,
    },
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('send').click()
  await fillComposeTransactionSiacoin({
    page,
    receiveAddress,
    changeAddress,
    amount: '1',
  })
  await expect(page.getByText('The wallet is currently unlocked')).toBeVisible()
  await expect(page.getByText('Total')).toBeVisible()
  await expect(page.getByText('1.004 SC')).toBeVisible()

  await page
    .getByRole('button', { name: 'Sign and broadcast transaction' })
    .click()
  await expect(page.getByText('Missing input')).toBeVisible()
})

test('errors if the inputs matching utxo is not found', async ({ page }) => {
  await mockApiDefaults({ page })
  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic, receiveAddress, changeAddress } = mocks
  const mockOutputsInvalid = mocks.walletOutputsSiacoinResponse
  mockOutputsInvalid.forEach((output) => {
    output.id = 'not the matching id'
  })
  await login({ page })
  await createWallet({
    page,
    newWallet,
    mnemonic: mnemonic,
    responses: {
      ...getDefaultMockWalletResponses(mocks),
      outputsSiacoin: mockOutputsInvalid,
    },
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('send').click()
  await fillComposeTransactionSiacoin({
    page,
    receiveAddress,
    changeAddress,
    amount: '1',
  })
  await expect(page.getByText('The wallet is currently unlocked')).toBeVisible()
  await expect(page.getByText('Total')).toBeVisible()
  await expect(page.getByText('1.004 SC')).toBeVisible()

  await page
    .getByRole('button', { name: 'Sign and broadcast transaction' })
    .click()
  await expect(page.getByText('Missing utxo')).toBeVisible()
})

test('errors if the address is missing its index', async ({ page }) => {
  await mockApiDefaults({ page })
  await login({ page })

  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic, receiveAddress, changeAddress } = mocks
  const mockAddressesInvalid = mocks.walletAddressesResponse
  mockAddressesInvalid.forEach((address) => {
    address.metadata.index = undefined
  })
  await createWallet({
    page,
    newWallet,
    mnemonic: mnemonic,
    responses: {
      ...getDefaultMockWalletResponses(mocks),
      addresses: mockAddressesInvalid,
    },
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('send').click()
  await fillComposeTransactionSiacoin({
    page,
    receiveAddress,
    changeAddress,
    amount: '1',
  })
  await expect(page.getByText('The wallet is currently unlocked')).toBeVisible()
  await expect(page.getByText('Total')).toBeVisible()
  await expect(page.getByText('1.004 SC')).toBeVisible()

  await page
    .getByRole('button', { name: 'Sign and broadcast transaction' })
    .click()
  await expect(page.getByText('Missing address index')).toBeVisible()
})

test('errors if the address is missing its public key', async ({ page }) => {
  await mockApiDefaults({ page })
  await login({ page })

  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic, receiveAddress, changeAddress } = mocks
  const mockAddressesInvalid = mocks.walletAddressesResponse
  mockAddressesInvalid.forEach((address) => {
    address.metadata.unlockConditions.publicKeys[0] = undefined
  })
  await createWallet({
    page,
    newWallet,
    mnemonic: mnemonic,
    responses: {
      ...getDefaultMockWalletResponses(mocks),
      addresses: mockAddressesInvalid,
    },
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('send').click()
  await fillComposeTransactionSiacoin({
    page,
    receiveAddress,
    changeAddress,
    amount: '1',
  })
  await expect(page.getByText('The wallet is currently unlocked')).toBeVisible()
  await expect(page.getByText('Total')).toBeVisible()
  await expect(page.getByText('1.004 SC')).toBeVisible()

  await page
    .getByRole('button', { name: 'Sign and broadcast transaction' })
    .click()
  await expect(page.getByText('Missing address public key')).toBeVisible()
})
