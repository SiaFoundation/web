import { test } from '@playwright/test'
import { navigateToVolumes } from '../fixtures/navigate'
import {
  createVolume,
  deleteVolume,
  deleteVolumeIfExists,
} from '../fixtures/volumes'
import { beforeTest } from '../fixtures/beforeTest'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, false)
})

test('can create and delete a volume', async ({ page }) => {
  const name = 'my-new-volume'
  const path = '/data'
  await navigateToVolumes({ page })
  await deleteVolumeIfExists(page, name, path)
  await createVolume(page, name, path)
  await deleteVolume(page, name, path)
})
