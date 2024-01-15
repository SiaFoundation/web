import { useFiles } from '../../../contexts/files'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

export function EmptyState() {
  const { dataState } = useFiles()

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
