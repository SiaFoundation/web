import type { Page } from '@playwright/test'

export async function waitForTableToReload(page: Page, tableTestId: string) {
  await page
    .locator(`[data-testid=${tableTestId}][data-loading=true]`)
    .isVisible()
  await page
    .locator(`[data-testid=${tableTestId}][data-loading=false]`)
    .isVisible()
}
