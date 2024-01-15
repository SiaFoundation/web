import { usePeers } from '../../../contexts/peers'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

export function EmptyState() {
  const { dataState } = usePeers()

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
