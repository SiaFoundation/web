import { Maybe, Nullish } from '@siafoundation/types'

/**
 * Ensure the data is an empty array if the response returns null.
 * This makes responses consistent and allows other methods to distinguish
 * between a loading state and an empty state.
 * @param data Nullish<T[]>
 * @returns Maybe<T[]>
 */
export function maybeFromNullishArrayResponse<T>(
  data: Nullish<T[]>
): Maybe<T[]> {
  if (data) {
    return data
  }
  if (data === null) {
    return []
  }
  return undefined
}
