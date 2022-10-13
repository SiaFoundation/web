import { readJsonFile } from '@siafoundation/env'
import { formatDistance } from 'date-fns'

type Seconds = number

type Item<T> = {
  value: T
  updatedAt: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: Record<string, Item<any>> = {}

export async function getCacheValue<T>(
  key: string,
  func: () => Promise<T>,
  maxAge: Seconds
): Promise<T> {
  const updateCache = async (lastUpdatedAt?: number) => {
    const value = await func()
    cache[key] = {
      value,
      updatedAt: new Date().getTime(),
    } as Item<T>
    if (lastUpdatedAt) {
      console.log(
        `cache refreshed key: ${key}, prev update: ${formatDistance(
          lastUpdatedAt,
          new Date(),
          {
            addSuffix: true,
          }
        )}`
      )
    }
    return value
  }

  // Get current value
  const currentItem = cache[key] as Item<T>

  // Value not in cache
  if (!currentItem) {
    const value = await updateCache()
    return value
  }

  // Value still fresh
  if (new Date().getTime() - currentItem.updatedAt < maxAge * 1000) {
    return currentItem.value
  }

  // Value stale, update the cache but immediately return stale value
  updateCache(currentItem.updatedAt)
  return currentItem.value
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
