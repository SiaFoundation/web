import { expect, Locator } from '@playwright/test'

export async function maybeExpectAndReturn(
  locator: Locator,
  shouldExpect?: boolean
) {
  if (shouldExpect) {
    await expect(locator).toBeVisible()
  }
  return locator
}
