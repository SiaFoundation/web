import { Page, expect } from '@playwright/test'
import { fillSelectInputByName } from './selectInput'
import { CurrencyId } from '@siafoundation/react-core'
import { step } from './step'

export const setCurrencyDisplay = step(
  'set currency display',
  async (
    page: Page,
    display: 'sc' | 'fiat' | 'bothPreferSc' | 'bothPreferFiat',
    currency?: CurrencyId
  ) => {
    await page.getByTestId('sidenav').getByLabel('App preferences').click()
    await fillSelectInputByName(page, 'currencyDisplay', display)
    if (currency) {
      await fillSelectInputByName(page, 'currencyFiat', currency)
    }
    await page.getByRole('dialog').getByLabel('close').click()
  }
)

export const toggleColumnVisibility = step(
  'toggle column visibility',
  async (page: Page, name: string, visible: boolean) => {
    await page.getByLabel('configure view').click()
    const configureView = page.getByRole('dialog')
    const columnToggle = configureView.getByRole('checkbox', {
      name,
      exact: true,
    })

    if (visible) {
      await expect(columnToggle).toBeVisible()
      if (!(await columnToggle.isChecked())) {
        await columnToggle.click({ force: true })
      }
    } else {
      await expect(columnToggle).toBeHidden()
      if (await columnToggle.isChecked()) {
        await columnToggle.click({ force: true })
      }
    }
    await page.getByLabel('configure view').click()
  }
)

export const setSortField = step(
  'set sort field',
  async (page: Page, field: string) => {
    await page.getByLabel('configure view').click()
    await fillSelectInputByName(page, 'sortField', field)
    await page.getByLabel('configure view').click()
  }
)

export const setSortDirection = step(
  'set sort direction',
  async (page: Page, direction: 'asc' | 'desc') => {
    await page.getByLabel('configure view').click()
    await fillSelectInputByName(page, 'sortDirection', direction)
    await page.getByLabel('configure view').click()
  }
)
