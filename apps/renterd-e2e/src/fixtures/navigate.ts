import { Page, expect } from '@playwright/test'
import { step } from '@siafoundation/e2e'

export const navigateToBuckets = step(
  'navigate to buckets',
  async ({ page }: { page: Page }) => {
    await page.getByTestId('sidenav').getByLabel('Files').click()
    await expect(page.getByTestId('navbar').getByText('Buckets')).toBeVisible()
  },
)

export const navigateToAlerts = step(
  'navigate to alerts',
  async ({ page }: { page: Page }) => {
    await page.getByTestId('sidenav').getByLabel('Alerts').click()
    await expect(page.getByTestId('navbar').getByText('Alerts')).toBeVisible()
  },
)

export const navigateToContracts = step(
  'navigate to contracts',
  async ({ page }: { page: Page }) => {
    await page.getByTestId('sidenav').getByLabel('Contracts').click()
    await expect(
      page.getByTestId('navbar').getByText('Active contracts'),
    ).toBeVisible()
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

export const navigateToWallet = step(
  'navigate to wallet',
  async (page: Page) => {
    await page.getByTestId('sidenav').getByLabel('Wallet').click()
    await expect(page.getByTestId('navbar').getByText('Wallet')).toBeVisible()
  },
)

export const navigateToHosts = step(
  'navigate to hosts',
  async ({ page }: { page: Page }) => {
    await page.getByTestId('sidenav').getByLabel('Hosts').click()
    await expect(page.getByTestId('navbar').getByText('Hosts')).toBeVisible()
  },
)

export const navigateToKeys = step(
  'navigate to keys',
  async ({ page }: { page: Page }) => {
    await page
      .getByTestId('sidenav')
      .getByLabel('S3 authentication keypairs')
      .click()
    await expect(page.getByTestId('navbar').getByText('Keys')).toBeVisible()
  },
)
