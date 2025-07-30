import { Page, expect } from '@playwright/test'
import { step } from '@siafoundation/e2e'

export const navigateToDashboard = step(
  'navigate to dashboard',
  async ({ page }: { page: Page }) => {
    await page.getByTestId('sidenav').getByLabel('Overview').click()
    await expect(page.getByTestId('navbar').getByText('Overview')).toBeVisible()
  },
)

export const navigateToConfig = step(
  'navigate to config',
  async ({ page }: { page: Page }) => {
    await page.getByTestId('sidenav').getByLabel('Configuration').click()
    await expect(
      page.getByTestId('navbar').getByText('Configuration'),
    ).toBeVisible()
  },
)

export const navigateToVolumes = step(
  'navigate to volumes',
  async ({ page }: { page: Page }) => {
    await page.getByTestId('sidenav').getByLabel('Volumes').click()
    await expect(page.getByTestId('navbar').getByText('Volumes')).toBeVisible()
  },
)

export const navigateToWallet = step(
  'navigate to wallet',
  async (page: Page) => {
    await page.getByTestId('sidenav').getByLabel('Wallet').click()
    await expect(page.getByTestId('navbar').getByText('Wallet')).toBeVisible()
  },
)

export const navigateToContracts = step(
  'navigate to contracts',
  async (page: Page) => {
    await page.getByTestId('sidenav').getByLabel('Contracts').click()
    await expect(
      page.getByTestId('navbar').getByText('Contracts'),
    ).toBeVisible()
  },
)

export const navigateToAlerts = step(
  'navigate to alerts',
  async (page: Page) => {
    await page.getByTestId('sidenav').getByLabel('Alerts').click()
    await expect(page.getByTestId('navbar').getByText('Alerts')).toBeVisible()
  },
)
