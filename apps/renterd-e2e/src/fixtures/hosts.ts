import { Locator, Page, expect } from '@playwright/test'

export async function getHostRowById(page: Page, id: string) {
  return page.getByTestId('hostsTable').getByTestId(id)
}

export async function getHostsSummaryRow(page: Page) {
  return page.getByTestId('hostsTable').locator('thead').getByRole('row').nth(1)
}

export async function getHostRowByIndex(page: Page, index: number) {
  return page
    .getByTestId('hostsTable')
    .locator('tbody')
    .getByRole('row')
    .nth(index)
}

export async function getHostRows(page: Page) {
  return page.getByTestId('hostsTable').locator('tbody').getByRole('row').all()
}

export async function openHostContextMenu(page: Page, name: string) {
  await page
    .getByTestId('hostsTable')
    .locator('tbody')
    .getByRole('row', { name })
    .getByRole('button')
    .first()
    .click()
}

export async function openRowHostContextMenu(row: Locator) {
  await row.getByTestId('actions').getByRole('button').first().click()
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
