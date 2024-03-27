import { test, expect } from '@playwright/test'
import { mockApiDefaults } from '../../mocks/mock'
import { login } from '../../fixtures/login'
import { createWallet } from '../../fixtures/createWallet'
import { navigateToWallet } from '../../fixtures/navigateToWallet'
import {
  seed,
  newWallet,
  mockWalletAddressesResponse,
} from './seedGenerateAddresses.mock'
import { cloneDeep } from '@technically/lodash'

const defaultMockWalletResponses = {
  addresses: mockWalletAddressesResponse,
}

test('generate new addresses', async ({ page }) => {
  await mockApiDefaults({ page })
  await login({ page })

  const mockAddressesInvalid = cloneDeep(mockWalletAddressesResponse)
  mockAddressesInvalid.forEach((address) => {
    address.metadata.publicKey = undefined
  })
  await createWallet({
    page,
    newWallet,
    seed,
    responses: defaultMockWalletResponses,
  })
  await navigateToWallet({ page, wallet: newWallet })
  await page.getByLabel('view addresses').click()
  await page.getByRole('button', { name: 'Add addresses' }).click()
  await page.locator('input[name=count]').fill('5')
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(
    page.getByText('60838523a4bdeeec5b4f70a6678da48a77ad58fe...')
  ).toBeVisible()
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
})
