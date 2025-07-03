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

export const continueToClickUntil = step(
  'continue to click until',
  async (clickLocator: Locator, waitForLocator: Locator, timeout = 5000) => {
    const startTime = Date.now()
    let clickCount = 0
    while (Date.now() - startTime < timeout) {
      // Check if the target locator is already visible.
      const isTargetVisible = await waitForLocator
        .isVisible({ timeout: 100 })
        .catch(() => false)
      if (isTargetVisible) {
        console.log('Target is visible, breaking...')
        break
      }

      // Check if the click locator still exists.
      const isClickable = await clickLocator
        .isVisible({ timeout: 100 })
        .catch(() => false)
      if (!isClickable) {
        console.log('Click locator is not visible, breaking...')
        continue
      }

      clickCount++
      try {
        console.log(`Attempting a click (${clickCount})...`)
        await clickLocator.click({ timeout: 100 })
      } catch {
        console.log('Click failed, breaking...')
        break
      }

      // Small delay to prevent too rapid clicking.
      await new Promise((resolve) => setTimeout(resolve, 500))
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

export const expectThenClick = step(
  'expect then click',
  async (locator: Locator) => {
    await expect(locator).toBeVisible()
    await locator.click()
  }
)
