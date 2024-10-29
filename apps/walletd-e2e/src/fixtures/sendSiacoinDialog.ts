import { Page } from 'playwright'
import { fillTextInputByName, step } from '@siafoundation/e2e'

export const fillComposeTransactionSiacoin = step(
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
    amount: string
  }) => {
    await fillTextInputByName(page, 'receiveAddress', receiveAddress)
    await page.getByLabel('customChangeAddress').click()
    await fillTextInputByName(page, 'changeAddress', changeAddress)
    await fillTextInputByName(page, 'siacoin', amount)
    await page.getByRole('button', { name: 'Generate transaction' }).click()
  }
)
