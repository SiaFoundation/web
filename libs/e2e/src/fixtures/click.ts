import { Locator, expect } from '@playwright/test'
import { step } from './step'

export const clickIfEnabledAndWait = step(
  'click if enabled and wait',
  async (locator: Locator, waitForLocator?: Locator) => {
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
)

export const clickAndWait = step(
  'click and wait',
  async (locator: Locator, waitForLocator?: Locator) => {
    await locator.click()
    if (waitForLocator) {
      await expect(waitForLocator).toBeVisible()
    }
  }
)

export const clickIf = step(
  'click if',
  async (locator: Locator, clickIf: 'isVisible' | 'isDisabled') => {
    const click = await locator[clickIf]()
    if (click) {
      await locator.click()
      return true
    }
    return false
  }
)

export const clickTwice = step('click twice', async (locator: Locator) => {
  await locator.click()
  await locator.click()
})
