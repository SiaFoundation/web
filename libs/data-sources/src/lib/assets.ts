import * as path from 'path'

export function getAssetPath(filePath: string) {
  return path.join(getAssetsDirectory(), filePath)
}

export function getAssetsDirectory() {
  return process.env['ASSETS'] || './'
}
