import { test, expect } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import {
  createBucket,
  deleteBucketIfExists,
  openBucket,
} from '../fixtures/buckets'
import path from 'path'
import {
  createDirectoryIfNotExists,
  deleteDirectoryIfExists,
  deleteFileIfExists,
  dragAndDropFile,
  fileInList,
  fileNotInList,
  getFileRowById,
  navigateToParentDirectory,
  openDirectory,
  openFileContextMenu,
} from '../fixtures/files'
import { fillTextInputByName } from '../fixtures/textInput'
import { clearToasts } from '../fixtures/clearToasts'
import { afterTest, beforeTest } from '../fixtures/beforeTest'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('can create directory, upload file, rename file, navigate, delete a file, delete a directory', async ({
  page,
}) => {
  test.setTimeout(80_000)
  const bucketName = 'files-test'
  const dirName = `test-dir-${Date.now()}`
  const originalFileName = 'sample.txt'
  const newFileName = 'renamed.txt'
  const dirPath = `${bucketName}/${dirName}/`
  const originalFilePath = `${bucketName}/${dirName}/${originalFileName}`
  const newFilePath = `${bucketName}/${dirName}/${newFileName}`

  await navigateToBuckets({ page })
  await deleteBucketIfExists(page, bucketName)
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await expect(
    page.getByText('bucket does not contain any files')
  ).toBeVisible()

  // Create directory.
  await createDirectoryIfNotExists(page, dirName)
  await fileInList(page, dirPath)
  await openDirectory(page, dirPath)
  await expect(
    page.getByText('The current directory does not contain any files yet')
  ).toBeVisible()
  await clearToasts({ page })

  // Upload.
  await dragAndDropFile(
    page,
    `[data-testid=filesDropzone]`,
    path.join(__dirname, originalFileName),
    originalFileName
  )
  await fileInList(page, originalFilePath)
  await expect(page.getByText('100%')).toBeVisible()

  // Rename file.
  await openFileContextMenu(page, originalFilePath)
  await page.getByRole('menuitem', { name: 'Rename file' }).click()
  await fillTextInputByName(page, 'name', 'renamed.txt')
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await fileInList(page, newFilePath)

  // Delete file.
  await deleteFileIfExists(page, newFilePath)
  await fileNotInList(page, newFilePath)
  await clearToasts({ page })

  // Upload the file again.
  await dragAndDropFile(
    page,
    `[data-testid=filesDropzone]`,
    path.join(__dirname, originalFileName),
    originalFileName
  )
  await fileInList(page, originalFilePath)
  await expect(page.getByText('100%')).toBeVisible()

  // Clean up the directory.
  await navigateToParentDirectory(page)
  await fileInList(page, dirPath)
  await deleteDirectoryIfExists(page, dirPath)
  await fileNotInList(page, dirPath)

  // Clean up the bucket.
  await navigateToBuckets({ page })
  await deleteBucketIfExists(page, bucketName)
})

test('shows a new intermediate directory when uploading nested files', async ({
  page,
}) => {
  test.setTimeout(80_000)
  const bucketName = 'files-test'
  const containerDir = `test-dir-${Date.now()}`
  const containerDirPath = `${bucketName}/${containerDir}/`
  const systemDir = 'nested-sample'
  const systemFile = 'sample.txt'
  const systemFilePath = `${systemDir}/${systemFile}`
  const dirPath = `${bucketName}/${containerDir}/${systemDir}/`
  const filePath = `${dirPath}${systemFile}`

  await navigateToBuckets({ page })
  await deleteBucketIfExists(page, bucketName)
  await createBucket(page, bucketName)
  await openBucket(page, bucketName)
  await expect(
    page.getByText('bucket does not contain any files')
  ).toBeVisible()

  // Create a container directory for the test.
  await createDirectoryIfNotExists(page, containerDir)
  await fileInList(page, containerDirPath)
  await openDirectory(page, containerDirPath)
  await expect(
    page.getByText('The current directory does not contain any files yet')
  ).toBeVisible()
  await clearToasts({ page })

  // Upload a nested file.
  await dragAndDropFile(
    page,
    `[data-testid=filesDropzone]`,
    path.join(__dirname, systemFilePath),
    '/' + systemFilePath
  )
  await fileInList(page, dirPath)
  const dirRow = await getFileRowById(page, dirPath)
  // The intermediate directory should show up before the file is finished uploading.
  await expect(dirRow.getByText('0 B')).toBeVisible()
  // Check that filtering the current directory works with the upload directory.
  const filterInput = page.getByLabel('filter files in current directory')
  await filterInput.fill(systemDir.slice(0, 2))
  await expect(dirRow).toBeVisible()
  await filterInput.fill('xxxxx')
  await expect(dirRow).toBeHidden()
  await filterInput.clear()
  await openDirectory(page, dirPath)
  const fileRow = await getFileRowById(page, filePath)
  await expect(fileRow.getByText('11 B')).toBeVisible()
  await navigateToParentDirectory(page)
  // The intermediate directory eventually updates to show the correct size.
  await expect(dirRow.getByText('11 B')).toBeVisible()

  // Clean up the container directory.
  await navigateToParentDirectory(page)
  await fileInList(page, containerDirPath)
  await deleteDirectoryIfExists(page, containerDirPath)
  await fileNotInList(page, containerDirPath)

  // Clean up the bucket.
  await navigateToBuckets({ page })
  await deleteBucketIfExists(page, bucketName)
})
