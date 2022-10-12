import path from 'path'
import { getContentDirectory } from '@siafoundation/env'

const contentDirectory = getContentDirectory()

export function getContentPath(filePath: string) {
  return path.join(contentDirectory, filePath)
}
