import { throttle as _throttle } from '@technically/lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrapperRegistry = new Map<string, (...args: any[]) => any>()

/**
 * Executes a function with throttling. Creates and caches the throttled version
 * of the function based on the key and delay.
 *
 * @param key - Unique identifier for the throttled function
 * @param delay - Throttle delay in ms
 * @param fn - Function to throttle
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  key: string,
  delay: number,
  fn: T,
  edge: 'leading' | 'trailing' | 'both' = 'both'
): (...args: Parameters<T>) => ReturnType<T> {
  const fullKey = key + edge + String(delay)
  if (!wrapperRegistry.has(fullKey)) {
    wrapperRegistry.set(
      fullKey,
      _throttle((func: T, ...args: Parameters<T>) => func(...args), delay, {
        leading: edge === 'leading' || edge === 'both',
        trailing: edge === 'trailing' || edge === 'both',
      })
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return wrapperRegistry.get(fullKey)!(fn)
}
