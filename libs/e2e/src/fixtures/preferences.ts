import { Page, expect } from '@playwright/test'
import { fillSelectInputByName } from './selectInput'
import { CurrencyId } from '@siafoundation/react-core'

export async function setCurrencyDisplay(
  page: Page,
  display: 'sc' | 'fiat' | 'bothPreferSc' | 'bothPreferFiat',
  currency?: CurrencyId
) {
  await page.getByTestId('sidenav').getByLabel('App preferences').click()
  await fillSelectInputByName(page, 'currencyDisplay', display)
  if (currency) {
    await fillSelectInputByName(page, 'currencyFiat', currency)
  }
  await page.getByRole('dialog').getByLabel('close').click()
}

export async function toggleColumnVisibility(
  page: Page,
  name: string,
  visible: boolean
) {
  await page.getByLabel('configure view').click()
  const configureView = page.getByRole('dialog')
  const columnToggle = configureView.getByRole('checkbox', {
    name,
  })

  if (visible) {
    await expect(columnToggle).toBeVisible()
    if (!(await columnToggle.isChecked())) {
      await columnToggle.click()
    }
  } else {
    await expect(columnToggle).toBeHidden()
    if (await columnToggle.isChecked()) {
      await columnToggle.click()
    }
  }
  await page.getByLabel('configure view').click()
}
