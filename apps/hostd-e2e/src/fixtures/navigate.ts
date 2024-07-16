import { type Page, expect } from '@playwright/test'

export async function navigateToDashboard({ page }: { page: Page }) {
  await page.getByLabel('Overview').click()
  await expect(page.getByTestId('navbar').getByText('Overview')).toBeVisible()
}

export async function navigateToConfig({ page }: { page: Page }) {
  await page.getByLabel('Configuration').click()
  await expect(
    page.getByTestId('navbar').getByText('Configuration'),
  ).toBeVisible()
}

export async function navigateToVolumes({ page }: { page: Page }) {
  await page.getByLabel('Volumes').click()
  await expect(page.getByTestId('navbar').getByText('Volumes')).toBeVisible()
}
