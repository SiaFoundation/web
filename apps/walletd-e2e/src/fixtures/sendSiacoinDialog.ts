import { Page } from 'playwright'

export async function fillComposeTransactionSiacoin({
  page,
  receiveAddress,
  changeAddress,
  amount,
}: {
  page: Page
  receiveAddress: string
  changeAddress: string
  amount: string
}) {
  await page.locator('input[name=receiveAddress]').click()
  await page.locator('input[name=receiveAddress]').fill(receiveAddress)
  await page.getByLabel('customChangeAddress').click()
  await page.locator('input[name=changeAddress]').click()
  await page.locator('input[name=changeAddress]').fill(changeAddress)
  await page.locator('input[name=siacoin]').click()
  await page.locator('input[name=siacoin]').fill(amount)
  await page.getByRole('button', { name: 'Generate transaction' }).click()
}
