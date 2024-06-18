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
  openDirectory,
  openFileContextMenu,
} from '../fixtures/files'
import { fillTextInputByName } from '../fixtures/textInput'
import { clearToasts } from '../fixtures/clearToasts'
import { beforeTest } from '../fixtures/beforeTest'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
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

  // create directory
  await createDirectoryIfNotExists(page, dirName)
  await fileInList(page, dirPath)
  await openDirectory(page, dirPath)
  await expect(
    page.getByText('The current directory does not contain any files yet')
  ).toBeVisible()
  await clearToasts({ page })

  // upload
  await dragAndDropFile(
    page,
    `[data-testid=filesDropzone]`,
    path.join(__dirname, originalFileName),
    originalFileName
  )
  await fileInList(page, originalFilePath)
  await expect(page.getByText('100%')).toBeVisible()

  // rename
  await openFileContextMenu(page, originalFilePath)
  await page.getByRole('menuitem', { name: 'Rename file' }).click()
  await fillTextInputByName(page, 'name', 'renamed.txt')
  await page.locator('input[name=name]').press('Enter')
  await expect(page.getByRole('dialog')).toBeHidden()
  await fileInList(page, newFilePath)

  // delete
  await deleteFileIfExists(page, newFilePath)
  await fileNotInList(page, newFilePath)
  await clearToasts({ page })

  // upload again
  await dragAndDropFile(
    page,
    `[data-testid=filesDropzone]`,
    path.join(__dirname, originalFileName),
    originalFileName
  )
  await fileInList(page, originalFilePath)
  await expect(page.getByText('100%')).toBeVisible()

  // navigate back to root
  await page.getByRole('cell', { name: '..' }).click()
  await fileInList(page, dirPath)

  // delete directory
  await deleteDirectoryIfExists(page, dirPath)
  await fileNotInList(page, dirPath)

  // delete bucket
  await navigateToBuckets({ page })
  await deleteBucketIfExists(page, bucketName)
})
