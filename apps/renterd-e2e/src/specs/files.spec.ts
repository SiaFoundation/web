import { test, expect, Page } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import { createBucket, deleteBucket, openBucket } from '../fixtures/buckets'
import {
  deleteDirectory,
  deleteFile,
  fileInList,
  fileNotInList,
  getFileRowById,
  navigateToParentDirectory,
  openDirectory,
  openFileContextMenu,
  createDirectory,
  dragAndDropFileFromSystem,
  createFilesMap,
  expectFilesMap,
  openDirectoryContextMenu,
  changeExplorerMode,
  getFileRowByIndex,
} from '../fixtures/files'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  clearToasts,
  fillTextInputByName,
  setSortDirection,
  setSortField,
} from '@siafoundation/e2e'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('can create directory and delete a directory', async ({ page }) => {
  const bucketName = 'files-test'
  const dirName1 = 'test-dir'
  const dirName2 = 'test-dir-2-same-prefix'
  const dirPath1 = `${bucketName}/${dirName1}/`
  const dirPath2 = `${bucketName}/${dirName2}/`

  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await expect(
    page.getByText('bucket does not contain any files')
  ).toBeVisible()

  // Create directory.
  await createDirectory(page, dirName1)
  await createDirectory(page, dirName2)
  await openDirectory(page, dirPath1)
  await navigateToParentDirectory(page)
  await deleteDirectory(page, dirPath1)
  await fileNotInList(page, dirPath1)
  await fileInList(page, dirPath2)
})

test('can see full file paths in the all files view mode', async ({ page }) => {
  const bucketName = 'bucket1'
  const dirName1 = 'dir1'
  const dirName2 = 'dir2'
  const dirPath1 = `${bucketName}/${dirName1}/`
  const dirPath2 = `${bucketName}/${dirName1}/${dirName2}/`
  const visiblePath = `${dirName1}/${dirName2}/`

  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await createDirectory(page, dirName1)
  await openDirectory(page, dirPath1)
  await createDirectory(page, dirName2)
  await fileInList(page, dirPath2)
  await changeExplorerMode(page, 'all files')
  await expect(page.getByText(visiblePath)).toBeVisible()
})

test('can sort files in both modes', async ({ page }) => {
  const bucketName = 'bucket1'
  const fileA = 'a.txt'
  const fileB = 'b.txt'
  const filePathA = `${bucketName}/${fileA}`
  const filePathB = `${bucketName}/${fileB}`

  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)

  await createFilesMap(page, bucketName, {
    [fileA]: 10,
    [fileB]: 20,
  })

  let mode: 'directory' | 'all files' = 'directory'

  await setSortField(page, 'name')
  await setSortDirection(page, 'asc')

  function getRow(
    page: Page,
    index: number,
    mode: 'directory' | 'all files',
    path: string
  ) {
    return getFileRowByIndex(page, index, mode).and(page.getByTestId(path))
  }

  await expect(getRow(page, 0, mode, filePathA)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathB)).toBeVisible()

  await setSortDirection(page, 'desc')

  await expect(getRow(page, 0, mode, filePathB)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathA)).toBeVisible()

  await setSortField(page, 'size')

  await expect(getRow(page, 0, mode, filePathB)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathA)).toBeVisible()

  await setSortDirection(page, 'asc')

  await expect(getRow(page, 0, mode, filePathA)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathB)).toBeVisible()

  mode = 'all files'
  await changeExplorerMode(page, mode)

  await expect(getRow(page, 0, mode, filePathA)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathB)).toBeVisible()

  await setSortDirection(page, 'desc')

  await expect(getRow(page, 0, mode, filePathB)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathA)).toBeVisible()

  await setSortField(page, 'name')

  await expect(getRow(page, 0, mode, filePathB)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathA)).toBeVisible()

  await setSortDirection(page, 'asc')

  await expect(getRow(page, 0, mode, filePathA)).toBeVisible()
  await expect(getRow(page, 1, mode, filePathB)).toBeVisible()
})

test('can upload, rename, and delete files', async ({ page }) => {
  const bucketName = 'files-test'
  const dirName = 'test-dir'
  const originalFileName = 'sample.txt'
  const newFileName = 'renamed.txt'
  const dirPath = `${bucketName}/${dirName}/`
  const originalFilePath = `${bucketName}/${dirName}/${originalFileName}`
  const newFilePath = `${bucketName}/${dirName}/${newFileName}`

  // Create bucket and directory.
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await createDirectory(page, dirName)
  await fileInList(page, dirPath)
  await openDirectory(page, dirPath)
  await expect(
    page.getByText('The current directory does not contain any files yet')
  ).toBeVisible()
  await clearToasts({ page })

  // Upload.
  await dragAndDropFileFromSystem(page, originalFileName)
  await expect(page.getByText('100%')).toBeVisible()
  await fileInList(page, originalFilePath)

  // Rename file.
  await openFileContextMenu(page, originalFilePath)
  await page.getByRole('menuitem', { name: 'Rename file' }).click()
  await fillTextInputByName(page, 'name', newFileName)
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await fileInList(page, newFilePath)

  // Upload the file again.
  await dragAndDropFileFromSystem(page, originalFileName)
  await expect(page.getByText('100%')).toBeVisible()

  // Both files exist.
  await fileInList(page, originalFilePath)
  await fileInList(page, newFilePath)

  // Delete one of the files.
  await deleteFile(page, newFilePath)
  await fileNotInList(page, newFilePath)
  await clearToasts({ page })

  // Clean up the directory.
  await navigateToParentDirectory(page)
  await fileInList(page, dirPath)
  await deleteDirectory(page, dirPath)
  await fileNotInList(page, dirPath)

  // Clean up the bucket.
  await navigateToBuckets({ page })
  await deleteBucket(page, bucketName)
})

test('can upload and download a file', async ({ page, context }) => {
  const bucketName = 'files-test'
  const fileName = 'sample.txt'
  const filePath = `${bucketName}/${fileName}`

  // Create bucket.
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)

  // Upload.
  await dragAndDropFileFromSystem(page, fileName)
  await expect(page.getByText('100%')).toBeVisible()
  await fileInList(page, filePath)

  // Download.
  const pagePromise = context.waitForEvent('page')
  await openFileContextMenu(page, filePath)
  await expect(
    page.getByRole('menuitem', { name: 'Download file' })
  ).toBeVisible()
  await page.getByRole('menuitem', { name: 'Download file' }).click()
  const newPage = await pagePromise
  expect(newPage.url()).toContain(
    '/api/worker/object/sample.txt?bucket=files-test'
  )
})

test('can rename and delete a directory with contents', async ({ page }) => {
  test.setTimeout(120_000)
  const bucketName = 'files-test'
  const dirName = 'a'
  const newDirName = 'b'
  const fileName = 'sample.txt'
  const dirPath = `${bucketName}/${dirName}/`
  const newDirPath = `${bucketName}/${newDirName}/`
  const originalFilePath = `${bucketName}/${dirName}/${fileName}`
  const newFilePath = `${bucketName}/${newDirName}/${fileName}`

  // Create bucket and directory.
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await createDirectory(page, dirName)
  await fileInList(page, dirPath)
  await openDirectory(page, dirPath)
  await expect(
    page.getByText('The current directory does not contain any files yet')
  ).toBeVisible()
  await clearToasts({ page })

  // Upload a file.
  await dragAndDropFileFromSystem(page, fileName)
  await expect(page.getByText('100%')).toBeVisible()
  await fileInList(page, originalFilePath)

  // Rename directory.
  await navigateToParentDirectory(page)
  await openDirectoryContextMenu(page, dirPath)
  await page.getByRole('menuitem', { name: 'Rename directory' }).click()
  await fillTextInputByName(page, 'name', newDirName)
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await fileInList(page, newDirPath)

  // File still inside renamed directory.
  await openDirectory(page, newDirPath)
  await fileInList(page, newFilePath)
  await navigateToParentDirectory(page)

  // Delete directory.
  await deleteDirectory(page, newDirPath)
  await fileNotInList(page, newDirPath)

  // Confirm no files or directories remain.
  await expect(
    page.getByText('bucket does not contain any files')
  ).toBeVisible()
})

test('shows a new intermediate directory when uploading nested files', async ({
  page,
}) => {
  const bucketName = 'files-test'
  const containerDir = 'test-dir'
  const containerDirPath = `${bucketName}/${containerDir}/`
  const nestedDir = 'nested-files'
  const fileName = 'sample.txt'
  const nestedFilePath = `${nestedDir}/${fileName}`
  const dirPath = `${bucketName}/${containerDir}/${nestedDir}/`
  const filePath = `${dirPath}${fileName}`

  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await expect(
    page.getByText('bucket does not contain any files')
  ).toBeVisible()

  // Create a container directory for the test.
  await createDirectory(page, containerDir)
  await fileInList(page, containerDirPath)
  await openDirectory(page, containerDirPath)
  await expect(
    page.getByText('The current directory does not contain any files yet')
  ).toBeVisible()
  await clearToasts({ page })

  // Upload a nested file.
  await dragAndDropFileFromSystem(page, nestedFilePath)
  await fileInList(page, dirPath)
  const dirRow = await getFileRowById(page, dirPath)
  // The intermediate directory should show up before the file is finished uploading.
  await expect(dirRow.getByText('0 B')).toBeVisible()
  // Check that filtering the current directory works with the upload directory.
  const filterInput = page.getByLabel('filter files in current directory')
  await filterInput.fill(nestedDir.slice(0, 2))
  await expect(dirRow).toBeVisible()
  await filterInput.fill('xxxxx')
  await expect(dirRow).toBeHidden()
  await filterInput.clear()
  await openDirectory(page, dirPath)
  const fileRow = await getFileRowById(page, filePath)
  await expect(fileRow.getByText('10 B')).toBeVisible()
  await navigateToParentDirectory(page)
  // The intermediate directory eventually updates to show the correct size.
  await expect(dirRow.getByText('10 B')).toBeVisible()

  // Clean up the container directory.
  await navigateToParentDirectory(page)
  await fileInList(page, containerDirPath)
  await deleteDirectory(page, containerDirPath)
  await fileNotInList(page, containerDirPath)

  // Delete the bucket once its empty.
  await navigateToBuckets({ page })
  await deleteBucket(page, bucketName)
})

test('bulk delete across nested directories', async ({ page }) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    dir1: {
      'file1.txt': 10,
      'file2.txt': 10,
    },
    dir2: {
      'file3.txt': 10,
      'file4.txt': 10,
      'file5.txt': 10,
    },
  })
  await navigateToBuckets({ page })
  await openBucket(page, bucketName)

  // Select entire dir1.
  const dir1 = await getFileRowById(page, 'bucket1/dir1/')
  await dir1.click({ modifiers: ['ControlOrMeta'] })
  await openDirectory(page, 'bucket1/dir2/')

  // Select file3 and file4.
  const file3 = await getFileRowById(page, 'bucket1/dir2/file3.txt')
  await file3.click({ modifiers: ['ControlOrMeta'] })
  const file4 = await getFileRowById(page, 'bucket1/dir2/file4.txt')
  await file4.click({ modifiers: ['ControlOrMeta'] })
  const menu = page.getByLabel('file multi-select menu')

  // Delete selected files.
  await menu.getByLabel('delete selected files').click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Delete' }).click()

  await expectFilesMap(page, bucketName, {
    'dir1/': 'hidden',
    dir2: {
      'file3.txt': 'hidden',
      'file4.txt': 'hidden',
      'file5.txt': 'visible',
    },
  })
})

test('bulk delete using the all files explorer mode', async ({ page }) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    dir1: {
      'file1.txt': 10,
      'file2.txt': 10,
    },
    dir2: {
      'file3.txt': 10,
      'file4.txt': 10,
      'file5.txt': 10,
    },
  })
  await navigateToBuckets({ page })
  await openBucket(page, bucketName)
  await page.getByLabel('change explorer mode').click()
  await page.getByRole('menuitem', { name: 'All files' }).click()

  // Select entire dir1.
  const dir1 = await getFileRowById(page, 'bucket1/dir1/')
  await dir1.click({ modifiers: ['ControlOrMeta'] })
  // Select file3 and file4.
  const file3 = await getFileRowById(page, 'bucket1/dir2/file3.txt')
  await file3.click({ modifiers: ['ControlOrMeta'] })
  const file4 = await getFileRowById(page, 'bucket1/dir2/file4.txt')
  await file4.click({ modifiers: ['ControlOrMeta'] })
  const menu = page.getByLabel('file multi-select menu')

  // Delete selected files.
  await menu.getByLabel('delete selected files').click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Delete' }).click()

  // Change back to directory mode to validate.
  await page.getByLabel('change explorer mode').click()
  await page.getByRole('menuitem', { name: 'Directory' }).click()

  await expectFilesMap(page, bucketName, {
    'dir1/': 'hidden',
    dir2: {
      'file3.txt': 'hidden',
      'file4.txt': 'hidden',
      'file5.txt': 'visible',
    },
  })
})

test('bulk selecting the entire page ignores the .. parent directory nav row', async ({
  page,
}) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    'file1.txt': 10,
    'file2.txt': 10,
    'file3.txt': 10,
    'file4.txt': 10,
    'file5.txt': 10,
  })
  await navigateToBuckets({ page })
  await openBucket(page, bucketName)

  await page.getByRole('checkbox', { name: 'select all files' }).check()
  const menu = page.getByLabel('file multi-select menu')
  await expect(menu.getByText('5 files selected')).toBeVisible()
})
