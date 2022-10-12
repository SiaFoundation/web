import { getContentPath } from '../config/content'
import fs from 'fs'
import { getCacheValue } from './cache'

export function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    const data = fs.readFileSync(getContentPath(filePath), 'utf-8')
    const json = JSON.parse(data)
    return json
  } catch (e) {
    console.log(e)
    return defaultValue
  }
}

export async function readCacheJsonFile<T>(
  filePath: string,
  defaultValue: T,
  maxAge: number
): Promise<T> {
  return getCacheValue(
    filePath,
    async () => readJsonFile(filePath, defaultValue),
    maxAge
  )
}
