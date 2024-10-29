import { test } from '@playwright/test'
import { navigateToBuckets } from '../fixtures/navigate'
import { createBucket, openBucket } from '../fixtures/buckets'
import {
  getFileRowById,
  openDirectory,
  createFilesMap,
  expectFilesMap,
  navigateToParentDirectory,
} from '../fixtures/files'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { hoverMouseOver, moveMouseOver } from '@siafoundation/e2e'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('move two files by selecting and dragging from one directory out to another', async ({
  page,
}) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    'file1.txt': null,
    dir1: {
      'file2.txt': null,
    },
    dir2: {
      'file3.txt': null,
      'file4.txt': null,
      dir3: {
        'file5.txt': null,
        'file6.txt': null,
      },
    },
  })
  await navigateToBuckets({ page })
  await openBucket(page, bucketName)

  await openDirectory(page, 'bucket1/dir2/')

  // Select file3 and entire dir3.
  const file3 = await getFileRowById(page, 'bucket1/dir2/file3.txt', true)
  await file3.click()
  const dir3 = await getFileRowById(page, 'bucket1/dir2/dir3/', true)
  await dir3.click()

  // Move all selected files by dragging one of them.
  await moveMouseOver(page, file3)
  await page.mouse.down()

  const parentDir = await getFileRowById(page, '..', true)
  await hoverMouseOver(page, parentDir)

  const file1 = await getFileRowById(page, 'bucket1/file1.txt', true)
  await moveMouseOver(page, file1)
  await page.mouse.up()

  await expectFilesMap(page, bucketName, {
    'file1.txt': 'visible',
    'file3.txt': 'visible',
    dir3: {
      'file5.txt': 'visible',
      'file6.txt': 'visible',
    },
    dir1: {
      'file2.txt': 'visible',
    },
    dir2: {
      'file3.txt': 'hidden',
      'file4.txt': 'visible',
      dir3: 'hidden',
    },
  })
})

test('move a file via drag and drop while leaving a separate set of selected files in place', async ({
  page,
}) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    'file0.txt': null,
    'file1.txt': null,
    dir1: {
      'file2.txt': null,
    },
    dir2: {
      'file3.txt': null,
      'file4.txt': null,
      'file5.txt': null,
    },
  })
  await navigateToBuckets({ page })
  await openBucket(page, bucketName)

  await openDirectory(page, 'bucket1/dir2/')

  // Select file3 and file4.
  const file3 = await getFileRowById(page, 'bucket1/dir2/file3.txt', true)
  await file3.click()
  const file4 = await getFileRowById(page, 'bucket1/dir2/file4.txt', true)
  await file4.click()

  // Move file5 which is not in the selection.
  const file5 = await getFileRowById(page, 'bucket1/dir2/file5.txt', true)
  await moveMouseOver(page, file5)
  await page.mouse.down()

  const parentDir = await getFileRowById(page, '..', true)
  await hoverMouseOver(page, parentDir)

  const file1 = await getFileRowById(page, 'bucket1/file1.txt', true)
  await hoverMouseOver(page, file1, 500)
  await page.mouse.up()

  await expectFilesMap(page, bucketName, {
    'file0.txt': 'visible',
    'file1.txt': 'visible',
    'file5.txt': 'visible',
    dir1: {
      'file2.txt': 'visible',
    },
    dir2: {
      'file3.txt': 'visible',
      'file4.txt': 'visible',
    },
  })
})

test('move files by selecting and using the docked menu batch action', async ({
  page,
}) => {
  const bucketName = 'bucket1'
  await navigateToBuckets({ page })
  await createBucket(page, bucketName)
  await createFilesMap(page, bucketName, {
    'file1.txt': null,
    dir1: {
      'file2.txt': null,
    },
    dir2: {
      'file3.txt': null,
      'file4.txt': null,
      dir3: {
        'file5.txt': null,
        'file6.txt': null,
      },
    },
  })
  await navigateToBuckets({ page })
  await openBucket(page, bucketName)

  await openDirectory(page, 'bucket1/dir2/')

  // Select file3 and entire dir3.
  const file3 = await getFileRowById(page, 'bucket1/dir2/file3.txt', true)
  await file3.click()
  const dir3 = await getFileRowById(page, 'bucket1/dir2/dir3/', true)
  await dir3.click()

  await navigateToParentDirectory(page)

  const menu = page.getByLabel('file multi-select menu')

  // Delete selected files.
  await menu.getByLabel('move selected files to the current directory').click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Move' }).click()

  await expectFilesMap(page, bucketName, {
    'file1.txt': 'visible',
    'file3.txt': 'visible',
    dir3: {
      'file5.txt': 'visible',
      'file6.txt': 'visible',
    },
    dir1: {
      'file2.txt': 'visible',
    },
    dir2: {
      'file3.txt': 'hidden',
      'file4.txt': 'visible',
      dir3: 'hidden',
    },
  })
})
