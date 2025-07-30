import { Page, expect } from '@playwright/test'
import { step } from './step'

export const setSwitchByLabel = step(
  'set switch by label',
  async (page: Page, label: string, state: boolean) => {
    const { el, value } = await getSwitchByLabel(page, label)
    if (state !== value) {
      await el.click()
    }
    await expect(el).toHaveAttribute(
      'data-state',
      state ? 'checked' : 'unchecked',
    )
  },
)

export const expectSwitchVisible = step(
  'expect switch visible',
  async (page: Page, label: string) => {
    const el = page.getByLabel(label)
    await expect(el).toBeVisible()
  },
)

export const expectSwitchNotVisible = step(
  'expect switch not visible',
  async (page: Page, label: string) => {
    const el = page.getByLabel(label)
    await expect(el).toBeHidden()
  },
)

export const getSwitchByLabel = step(
  'get switch by label',
  async (page: Page, label: string) => {
    const el = page.getByLabel(label)
    const value = (await el.getAttribute('data-state')) as
      | 'checked'
      | 'unchecked'
    return {
      el,
      value: value === 'checked',
    }
  },
)

export const expectSwitchByLabel = step(
  'expect switch by label',
  async (page: Page, label: string, value: boolean) => {
    const { value: actualValue } = await getSwitchByLabel(page, label)
    expect(actualValue).toBe(value)
  },
)
