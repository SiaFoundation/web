import { maybeExpectAndReturn, step } from '@siafoundation/e2e'
import { Page } from 'playwright'

export const getEventRowByIndex = step(
  'get event row by index',
  async (page: Page, index: number, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page
        .getByTestId('eventsTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index),
      shouldExpect,
    )
  },
)
