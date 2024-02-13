import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { useFilesFlat } from '../../../contexts/filesFlat'

export function EmptyState() {
  const { dataState } = useFilesFlat()

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
