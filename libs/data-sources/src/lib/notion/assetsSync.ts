import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import { getAssetsDirectory } from '../assets'
import { Asset, fetchAllAssets } from './assets'

export async function syncAssets() {
  const assets = await fetchAllAssets()

  assets.forEach((asset) => {
    downloadFileAndSaveToContentDirectory(asset)
  })

  return {
    syncedAt: new Date(),
  }
}

async function downloadFileAndSaveToContentDirectory(nf: Asset) {
  try {
    const imageDir = path.join(getAssetsDirectory(), nf.folder || 'unknown')
    fs.mkdirSync(imageDir, { recursive: true })
    const response = await axios({
      url: nf.fileUrl,
      responseType: 'stream',
    })
    response.data
      .pipe(
        fs.createWriteStream(
          path.join(imageDir, `${nf.name}.${nf.fileType}`),
          {}
        )
      )
      .on('error', (e: Error) => console.log(e))
  } catch (e) {
    console.log(e)
  }
}
