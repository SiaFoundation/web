import { Locator, Page } from 'playwright'
import { step } from './step'

export const moveMouseOver = step(
  'move mouse over',
  async (page: Page, locator: Locator) => {
    const box = await locator.boundingBox()
    if (!box) {
      throw new Error(`Element not found: ${locator}`)
    }
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    return { x, y }
  }
)

export const hoverMouseOver = step(
  'hover mouse over',
  async (page: Page, locator: Locator, hoverDuration = 1000) => {
    const { x, y } = await moveMouseOver(page, locator)
    // Hover with micro-movements to keep the drag state active.
    // Move every 100ms.
    const hoverStep = 100
    for (let i = 0; i < hoverDuration / hoverStep; i++) {
      // Slight wiggle to maintain drag.
      await page.mouse.move(x + (i % 2), y + (i % 2))
      await page.waitForTimeout(hoverStep)
    }
  }
)
