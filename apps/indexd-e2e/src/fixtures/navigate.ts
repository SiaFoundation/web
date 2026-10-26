import { Page, expect } from '@playwright/test'
import { step } from '@siafoundation/e2e'

// The indexd pages do not set a navbar title, so navigation is confirmed by
// the route instead.
function navigateTo(label: string, route: string) {
  return step(`navigate to ${label}`, async (page: Page) => {
    await page.getByTestId('sidenav').getByLabel(label, { exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${route}(\\?|$)`))
  })
}

export const navigateToHosts = navigateTo('Hosts', '/hosts')
export const navigateToContracts = navigateTo('Contracts', '/contracts')
export const navigateToKeys = navigateTo('Connect keys', '/keys')
export const navigateToQuotas = navigateTo('Quotas', '/quotas')
export const navigateToAccounts = navigateTo('Accounts', '/accounts')
export const navigateToAlerts = navigateTo('Alerts', '/alerts')
export const navigateToConfig = navigateTo('Configuration', '/config')
export const navigateToMetrics = navigateTo('Metrics', '/metrics')
export const navigateToWallet = navigateTo('Wallet', '/wallet')
export const navigateToNode = navigateTo('Blockchain node', '/node')
