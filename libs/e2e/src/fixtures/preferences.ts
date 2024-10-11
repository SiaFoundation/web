import { Page } from 'playwright'
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
