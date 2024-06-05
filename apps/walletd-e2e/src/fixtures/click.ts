import { Locator, expect } from '@playwright/test'

export async function clickIfEnabledAndWait(
  locator: Locator,
  waitForLocator?: Locator
) {
  const isDisabled = await locator.isDisabled()
  if (!isDisabled) {
    await locator.click()
    if (waitForLocator) {
      await expect(waitForLocator).toBeVisible()
    }
    return true
  }
  return false
}

export async function clickAndWait(locator: Locator, waitForLocator?: Locator) {
  await locator.click()
  if (waitForLocator) {
    await expect(waitForLocator).toBeVisible()
  }
}

export async function clickIf(
  locator: Locator,
  clickIf: 'isVisible' | 'isDisabled'
) {
  const click = await locator[clickIf]()
  if (click) {
    await locator.click()
    return true
  }
  return false
}
