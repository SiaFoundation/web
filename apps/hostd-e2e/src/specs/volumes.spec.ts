import { test } from '@playwright/test'
import { navigateToVolumes } from '../fixtures/navigate'
import { login } from '../fixtures/login'
import {
  createVolume,
  deleteVolume,
  deleteVolumeIfExists,
} from '../fixtures/volumes'

test('can create and delete a volume', async ({ page }) => {
  const name = 'my-new-volume'
  const path = '/data'
  await login({ page })
  await navigateToVolumes({ page })
  await deleteVolumeIfExists(page, name, path)
  await createVolume(page, name, path)
  await deleteVolume(page, name, path)
})
