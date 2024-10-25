import { Page } from '@playwright/test'

export async function rebalancePrices(page: Page) {
  const spendingEstimate = page.getByTestId('spendingEstimate')
  const rebalanceButton = spendingEstimate.getByLabel('rebalance prices')
  await rebalanceButton.click()
}
