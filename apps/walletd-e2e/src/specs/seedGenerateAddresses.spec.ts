import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import { createWallet } from '../fixtures/createWallet'
import { navigateToWallet } from '../fixtures/navigateToWallet'
import {
  getMockScenarioSeedWallet,
  mockApiDefaults,
  getMockRescanResponse,
} from '@siafoundation/walletd-mock'
import { WalletAddressesResponse } from '@siafoundation/walletd-react'

function getMockWalletAddressesResponse(): WalletAddressesResponse {
  return []
}

function getDefaultMockWalletResponses() {
  return {
    addresses: getMockWalletAddressesResponse(),
  }
}

test('generate new addresses', async ({ page }) => {
  const rescanResponse = getMockRescanResponse()
  await mockApiDefaults({
    page,
    responses: {
      rescan: rescanResponse,
    },
  })
  await login({ page })

  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic } = mocks
  await createWallet({
    page,
    newWallet,
    mnemonic,
    responses: getDefaultMockWalletResponses(),
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('view addresses').click()
  await page.getByRole('button', { name: 'Add addresses' }).click()
  await page.locator('input[name=count]').fill('5')
  await page.getByRole('button', { name: 'Generate addresses' }).click()
  await expect(
    page.getByText('65b40f6a720352ad5b9546b9f5077209672914cc...')
  ).toBeVisible()
  await expect(
    page.getByText('e94e8113563a549f95ff3904dccf77f1b8fbaad4...')
  ).toBeVisible()
  await expect(
    page.getByText('cc7241334772c6d10d47882b06b21a60242a19c3...')
  ).toBeVisible()
  await expect(
    page.getByText('170173c40ca0f39f9618da30af14c390c7ce7024...')
  ).toBeVisible()
  await expect(
    page.getByText('90c6057cdd2463eca61f83796e83152dbba28b6c...')
  ).toBeVisible()
})

test('generate new addresses and rescan', async ({ page }) => {
  const rescanResponse = getMockRescanResponse()
  await mockApiDefaults({
    page,
    responses: {
      rescan: rescanResponse,
    },
  })
  await login({ page })

  const mocks = getMockScenarioSeedWallet()
  const { newWallet, mnemonic } = mocks
  await createWallet({
    page,
    newWallet,
    mnemonic,
    responses: getDefaultMockWalletResponses(),
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('view addresses').click()
  await page.getByRole('button', { name: 'Add addresses' }).click()
  await page.locator('input[name=count]').fill('5')
  await page.getByLabel('shouldRescan').click()
  await expect(page.locator('input[name=rescanStartHeight]')).toHaveValue(
    '61,676'
  )
  rescanResponse.index.height = 30_000
  await page
    .getByRole('button', { name: 'Generate addresses and rescan' })
    .click()
  await expect(page.getByText('Rescanning the blockchain')).toBeVisible()
  await expect(
    page.getByText('65b40f6a720352ad5b9546b9f5077209672914cc...')
  ).toBeVisible()
  await expect(
    page.getByText('e94e8113563a549f95ff3904dccf77f1b8fbaad4...')
  ).toBeVisible()
  await expect(
    page.getByText('cc7241334772c6d10d47882b06b21a60242a19c3...')
  ).toBeVisible()
  await expect(
    page.getByText('170173c40ca0f39f9618da30af14c390c7ce7024...')
  ).toBeVisible()
  await expect(
    page.getByText('90c6057cdd2463eca61f83796e83152dbba28b6c...')
  ).toBeVisible()
  await expect(page.getByText('Scanning...')).toBeVisible()
})
