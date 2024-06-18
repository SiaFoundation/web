import { Page, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { fillTextInputByName } from './textInput'

export async function deleteFile(page: Page, path: string) {
  await openFileContextMenu(page, path)
  await page.getByRole('menuitem', { name: 'Delete file' }).click()
  await expect(page.getByRole('dialog').getByText('Delete file')).toBeVisible()
  await page.locator('form button[type=submit]').click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await fileNotInList(page, path)
}

export async function deleteFileIfExists(page: Page, path: string) {
  const exists = await page.getByRole('table').getByTestId(path).isVisible()
  if (exists) {
    await deleteFile(page, path)
  }
}

export async function deleteDirectory(page: Page, path: string) {
  await openDirectoryContextMenu(page, path)
  const deleteDirectoryItem = page.getByRole('menuitem', {
    name: 'Delete directory',
  })
  await expect(deleteDirectoryItem).toBeVisible()
  await deleteDirectoryItem.click()
  await expect(
    page.getByRole('dialog').getByText('Delete directory')
  ).toBeVisible()
  await page.locator('form button[type=submit]').click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await fileNotInList(page, path)
}

export async function deleteDirectoryIfExists(page: Page, path: string) {
  const exists = await page.getByRole('table').getByTestId(path).isVisible()
  if (exists) {
    await deleteDirectory(page, path)
  }
}

export async function openDirectoryContextMenu(page: Page, path: string) {
  const selector = page.getByTestId(path).getByLabel('Directory context menu')
  // Click doesn't work until animation is finished.
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(100)
  await expect(selector).toBeVisible()
  await selector.click()
}

export async function openFileContextMenu(page: Page, path: string) {
  const selector = page.getByTestId(path).getByLabel('File context menu')
  await expect(selector).toBeVisible()
  await selector.click()
}

export async function openDirectory(page: Page, path: string) {
  await page.getByRole('table').getByTestId(path).click()
  for (const dir of path.split('/').slice(0, -1)) {
    await expect(page.getByTestId('navbar').getByText(dir)).toBeVisible()
  }
}

export async function crateDirectory(page: Page, name: string) {
  await expect(page.getByLabel('Create directory')).toBeVisible()
  await page.getByLabel('Create directory').click()
  await fillTextInputByName(page, 'name', name)
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
}

export async function createDirectoryIfNotExists(page: Page, name: string) {
  const exists = await page.getByRole('table').getByTestId(name).isVisible()
  if (!exists) {
    await crateDirectory(page, name)
  }
}

export async function fileInList(page: Page, path: string) {
  await expect(page.getByRole('table').getByTestId(path)).toBeVisible()
}

export async function fileNotInList(page: Page, path: string) {
  await expect(page.getByRole('table').getByTestId(path)).toBeHidden()
}

export async function dragAndDropFile(
  page: Page,
  selector: string,
  filePath: string,
  fileName: string,
  fileType = ''
) {
  const buffer = readFileSync(filePath).toString('base64')

  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dt = new DataTransfer()

      const blobData = await fetch(bufferData).then((res) => res.blob())

      const file = new File([blobData], localFileName, { type: localFileType })
      dt.items.add(file)
      return dt
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: fileName,
      localFileType: fileType,
    }
  )

  await page.dispatchEvent(selector, 'drop', { dataTransfer })
}
