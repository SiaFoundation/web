import { Page } from 'playwright'
import {
  fillSelectInputByName,
  fillTextInputByName,
  step,
} from '@siafoundation/e2e'

export const fillComposeTransactionSiafund = step(
  'fill compose transaction siacoin',
  async ({
    page,
    receiveAddress,
    changeAddress,
    amount,
  }: {
    page: Page
    receiveAddress: string
    changeAddress: string
    amount: number
  }) => {
    await fillTextInputByName(page, 'receiveAddress', receiveAddress)
    await fillSelectInputByName(page, 'mode', 'siafund')
    await page.getByLabel('customChangeAddress').click()
    await fillTextInputByName(page, 'changeAddress', changeAddress)
    await fillTextInputByName(page, 'siafund', String(amount))
    await page.getByRole('button', { name: 'Generate transaction' }).click()
  }
)
