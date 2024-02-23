import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { useUploads } from '../../../contexts/uploads'

export function EmptyState() {
  const { dataState } = useUploads()

  if (dataState === 'noneMatchingFilters') {
    return <StateNoneMatching />
  }

  if (dataState === 'error') {
    return <StateError />
  }

  if (dataState === 'noneYet') {
    return <StateNoneYet />
  }

  return null
}
