import { Page } from 'playwright'

export async function getEventRowByIndex(page: Page, index: number) {
  return page
    .getByTestId('eventsTable')
    .locator('tbody')
    .getByRole('row')
    .nth(index)
}
