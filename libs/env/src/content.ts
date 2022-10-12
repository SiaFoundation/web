import * as path from 'path'
import * as fs from 'fs'

export function getContentPath(filePath: string) {
  return path.join(getContentDirectory(), filePath)
}

export function getContentDirectory() {
  return process.env.CONTENT || './'
}

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
