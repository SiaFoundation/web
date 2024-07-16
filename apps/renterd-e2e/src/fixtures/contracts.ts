import { type Page, expect } from '@playwright/test'

export async function getContractRowById(page: Page, id: string) {
  return page.getByTestId('contractsTable').getByTestId(id)
}

export async function getContractsSummaryRow(page: Page) {
  return page
    .getByTestId('contractsTable')
    .locator('thead')
    .getByRole('row')
    .nth(1)
}

export async function getContractRowByIndex(page: Page, index: number) {
  return page
    .getByTestId('contractsTable')
    .locator('tbody')
    .getByRole('row')
    .nth(index)
}

export async function getContractRows(page: Page) {
  return page
    .getByTestId('contractsTable')
    .locator('tbody')
    .getByRole('row')
    .all()
}

export async function toggleColumnVisibility(
  page: Page,
  name: string,
  visible: boolean,
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
