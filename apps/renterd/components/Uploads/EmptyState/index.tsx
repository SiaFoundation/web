import { useUploads } from '../../../contexts/uploads'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

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
