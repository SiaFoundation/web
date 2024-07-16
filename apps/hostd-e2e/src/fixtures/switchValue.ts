import { type Page, expect } from '@playwright/test'

export async function setSwitchByLabel(
  page: Page,
  label: string,
  state: boolean,
) {
  const { el, value } = await getSwitchByLabel(page, label)
  if (state !== value) {
    await el.click()
  }
  await expect(el).toHaveAttribute(
    'data-state',
    state ? 'checked' : 'unchecked',
  )
}

export async function expectSwitchVisible(page: Page, label: string) {
  const el = page.getByLabel(label)
  await expect(el).toBeVisible()
}

export async function expectSwitchNotVisible(page: Page, label: string) {
  const el = page.getByLabel(label)
  await expect(el).toBeHidden()
}

export async function getSwitchByLabel(page: Page, label: string) {
  const el = page.getByLabel(label)
  const value = (await el.getAttribute('data-state')) as 'checked' | 'unchecked'
  return {
    el,
    value: value === 'checked',
  }
}

export async function expectSwitchByLabel(
  page: Page,
  label: string,
  value: boolean,
) {
  const { value: actualValue } = await getSwitchByLabel(page, label)
  expect(actualValue).toBe(value)
}
