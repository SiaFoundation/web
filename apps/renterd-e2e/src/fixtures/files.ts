import { Page, expect } from '@playwright/test'
import {
  fillTextInputByName,
  maybeExpectAndReturn,
  step,
} from '@siafoundation/e2e'
import { navigateToBuckets } from './navigate'
import { openBucket } from './buckets'

export const deleteFile = step(
  'delete file',
  async (page: Page, path: string) => {
    await openFileContextMenu(page, path)
    await page.getByRole('menuitem', { name: 'Delete file' }).click()
    await expect(
      page.getByRole('dialog').getByText('Delete file')
    ).toBeVisible()
    await page.locator('form button[type=submit]').click()
    await expect(page.getByRole('dialog')).toBeHidden()
    await fileNotInList(page, path)
  }
)

export const deleteFileIfExists = step(
  'delete file if exists',
  async (page: Page, path: string) => {
    const exists = await page
      .getByTestId('filesTable')
      .getByTestId(path)
      .isVisible()
    if (exists) {
      await deleteFile(page, path)
    }
  }
)

export const deleteDirectory = step(
  'delete directory',
  async (page: Page, path: string) => {
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
)

export const deleteDirectoryIfExists = step(
  'delete directory if exists',
  async (page: Page, path: string) => {
    const exists = await page
      .getByTestId('filesTable')
      .getByTestId(path)
      .isVisible()
    if (exists) {
      await deleteDirectory(page, path)
    }
  }
)

export const openDirectoryContextMenu = step(
  'open directory context menu',
  async (page: Page, path: string) => {
    const selector = page.getByTestId(path).getByLabel('Directory context menu')
    // // Click doesn't work until animation is finished.
    // // eslint-disable-next-line playwright/no-wait-for-timeout
    // await page.waitForTimeout(100)
    await expect(selector).toBeVisible()
    await selector.click()
  }
)

export const openFileContextMenu = step(
  'open file context menu',
  async (page: Page, path: string) => {
    const selector = page.getByTestId(path).getByLabel('File context menu')
    await expect(selector).toBeVisible()
    await selector.click()
  }
)

export const openDirectory = step(
  'open directory',
  async (page: Page, path: string) => {
    const parts = path.split('/')
    const name = parts[parts.length - 2] + '/'
    await page
      .getByTestId('filesTable')
      .getByTestId(path)
      .getByText(name)
      .click()
    for (const dir of path.split('/').slice(0, -1)) {
      await expect(
        page.getByTestId('navbar').getByText(dir, { exact: true })
      ).toBeVisible()
    }
  }
)

export const openDirectoryFromAnywhere = step(
  'open directory from anywhere',
  async (page: Page, path: string) => {
    const bucket = path.split('/')[0]
    const dirParts = path.split('/').slice(1)
    await navigateToBuckets({ page })
    await openBucket(page, path.split('/')[0])
    let currentPath = bucket + '/'
    for (const dir of dirParts) {
      currentPath += dir + '/'
      await openDirectory(page, currentPath)
    }
  }
)

export const navigateToParentDirectory = step(
  'navigate to parent directory',
  async (page: Page) => {
    const isEmpty = await page
      .getByText('The current directory does not contain any files yet')
      .isVisible()
    if (isEmpty) {
      await page.getByRole('button', { name: 'Back' }).click()
    } else {
      await page.getByRole('cell', { name: '..' }).click()
    }
  }
)

export const createDirectory = step(
  'create directory',
  async (page: Page, name: string) => {
    await expect(page.getByLabel('Create directory')).toBeVisible()
    await page.getByLabel('Create directory').click()
    await fillTextInputByName(page, 'name', name)
    await page.locator('input[name=name]').press('Enter')
    await expect(page.getByRole('dialog')).toBeHidden()
  }
)

export const createDirectoryIfNotExists = step(
  'create directory if not exists',
  async (page: Page, name: string) => {
    const exists = await page
      .getByTestId('filesTable')
      .getByTestId(name)
      .isVisible()
    if (!exists) {
      await createDirectory(page, name)
    }
  }
)

export const fileInList = step(
  'expect file in list',
  async (page: Page, path: string, timeout?: number) => {
    await expect(page.getByTestId('filesTable').getByTestId(path)).toBeVisible({
      timeout,
    })
  }
)

export const fileNotInList = step(
  'expect file not in list',
  async (page: Page, path: string) => {
    await expect(page.getByTestId('filesTable').getByTestId(path)).toBeHidden()
  }
)

export const getFileRowById = step(
  'get file row by ID',
  async (page: Page, id: string, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page.getByTestId('filesTable').getByTestId(id),
      shouldExpect
    )
  }
)

export const expectFileRowById = step(
  'expect file row by ID',
  async (page: Page, id: string) => {
    return expect(page.getByTestId('filesTable').getByTestId(id)).toBeVisible()
  }
)

export const changeExplorerMode = step(
  'change explorer mode',
  async (page: Page, mode: 'directory' | 'all files' | 'uploads') => {
    const changeMode = page.getByRole('button', {
      name: 'change explorer mode',
    })
    const modeButton = page
      .getByRole('menu')
      .getByRole('menuitem', { name: mode })
    await expect(changeMode).toBeVisible()
    await changeMode.click()
    await expect(modeButton).toBeVisible()
    await modeButton.click()

    if (mode === 'uploads') {
      await expect(page.getByTestId('uploadsTable')).toBeVisible()
    }
    if (mode === 'all files') {
      await expect(page.getByTestId('filesTable')).toBeVisible()
      await expect(
        page.getByTestId('navbar').getByText('All files')
      ).toBeVisible()
    }
    if (mode === 'directory') {
      await expect(page.getByTestId('filesTable')).toBeVisible()
      await expect(
        page.getByTestId('navbar').getByText('All files')
      ).toBeHidden()
    }
  }
)

function generateDummyFile(sizeInBytes: number): Buffer {
  return Buffer.alloc(sizeInBytes, 'a')
}

async function simulateDragAndDropFile(
  page: Page,
  selector: string,
  fileName: string,
  sizeInBytes: number
) {
  const buffer = generateDummyFile(sizeInBytes).toString('base64')

  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dt = new DataTransfer()

      const blobData = await fetch(bufferData).then((res) => res.blob())

      const file = new File([blobData], localFileName, {
        type: localFileType,
      })
      dt.items.add(file)
      return dt
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: fileName,
      localFileType: '',
    }
  )

  await page.dispatchEvent(selector, 'drop', { dataTransfer })
}

export const dragAndDropFileFromSystem = step(
  'drag and drop file from system',
  async (page: Page, localFilePath: string, sizeInBytes = 10) => {
    await simulateDragAndDropFile(
      page,
      `[data-testid=filesDropzone]`,
      '/' + localFilePath,
      sizeInBytes
    )
  }
)

export type FileMap = {
  [key: string]: number | FileMap
}

// Iterate through the file map and create files/directories.
export const createFilesMap = step(
  'create files map',
  async (page: Page, bucketName: string, map: FileMap) => {
    const create = async (map: FileMap, stack: string[]) => {
      for (const name in map) {
        await openDirectoryFromAnywhere(page, stack.join('/'))
        const currentDirPath = stack.join('/')
        const path = `${currentDirPath}/${name}`
        if (!!map[name] && typeof map[name] === 'object') {
          await createDirectory(page, name)
          await fileInList(page, path + '/')
          await create(map[name] as FileMap, stack.concat(name))
        } else {
          const size = (map[name] as number) || 10
          await dragAndDropFileFromSystem(page, name, size)
          await fileInList(page, path)
        }
      }
    }
    await create(map, [bucketName])
    await navigateToBuckets({ page })
    await openBucket(page, bucketName)
  }
)

type FileExpectMap = {
  [key: string]: 'visible' | 'hidden' | FileExpectMap
}

// Check each file and directory in the map exists.
export const expectFilesMap = step(
  'expect files map',
  async (page: Page, bucketName: string, map: FileExpectMap) => {
    const check = async (map: FileExpectMap, stack: string[]) => {
      for (const name in map) {
        await openDirectoryFromAnywhere(page, stack.join('/'))
        const currentDirPath = stack.join('/')
        const path = `${currentDirPath}/${name}`
        if (typeof map[name] === 'string') {
          const state = map[name] as 'visible' | 'hidden'
          if (state === 'visible') {
            await fileInList(page, path)
          } else {
            await fileNotInList(page, path)
          }
        } else {
          await fileInList(page, path + '/')
          await check(map[name], stack.concat(name))
        }
      }
    }
    await check(map, [bucketName])
  }
)
