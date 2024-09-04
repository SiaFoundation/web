import { test } from '@playwright/test'
import { navigateToVolumes } from '../fixtures/navigate'
import {
  createVolume,
  deleteVolume,
  deleteVolumeIfExists,
} from '../fixtures/volumes'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import fs from 'fs'
import os from 'os'

let dirPath = '/'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
  // Create a temporary directory.
  dirPath = fs.mkdtempSync(process.env.GITHUB_WORKSPACE || os.tmpdir())
})

test.afterEach(async () => {
  await afterTest()
  fs.rmSync(dirPath, { recursive: true })
})

test('can create and delete a volume', async ({ page }) => {
  const name = 'my-new-volume'
  await navigateToVolumes({ page })
  await deleteVolumeIfExists(page, name, dirPath)
  await createVolume(page, name, dirPath)
  await deleteVolume(page, name, dirPath)
})
