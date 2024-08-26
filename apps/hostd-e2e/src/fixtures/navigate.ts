import { Page, expect } from '@playwright/test'

export async function navigateToDashboard({ page }: { page: Page }) {
  await page.getByTestId('sidenav').getByLabel('Overview').click()
  await expect(page.getByTestId('navbar').getByText('Overview')).toBeVisible()
}

export async function navigateToConfig({ page }: { page: Page }) {
  await page.getByTestId('sidenav').getByLabel('Configuration').click()
  await expect(
    page.getByTestId('navbar').getByText('Configuration')
  ).toBeVisible()
}

export async function navigateToVolumes({ page }: { page: Page }) {
  await page.getByTestId('sidenav').getByLabel('Volumes').click()
  await expect(page.getByTestId('navbar').getByText('Volumes')).toBeVisible()
}

export async function navigateToWallet(page: Page) {
  await page.getByTestId('sidenav').getByLabel('Wallet').click()
  await expect(page.getByTestId('navbar').getByText('Wallet')).toBeVisible()
}
