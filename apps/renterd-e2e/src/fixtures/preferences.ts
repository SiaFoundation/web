import { Page } from 'playwright'
import { fillSelectInputByName } from './selectInput'

export async function setCurrencyDisplay(
  page: Page,
  display: 'sc' | 'fiat' | 'bothPreferSc' | 'bothPreferFiat'
) {
  await page.getByLabel('App preferences').click()
  await fillSelectInputByName(page, 'currencyDisplay', display)
  await page.getByRole('dialog').getByLabel('close').click()
}
