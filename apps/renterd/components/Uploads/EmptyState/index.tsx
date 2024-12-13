import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { useUploads } from '../../../contexts/uploads'
import { StateNoneOnPage } from '@siafoundation/design-system'

export function EmptyState() {
  const { datasetState } = useUploads()

  if (datasetState === 'noneOnPage') {
    return <StateNoneOnPage />
  }

  if (datasetState === 'noneMatchingFilters') {
    return <StateNoneMatching />
  }

  if (datasetState === 'error') {
    return <StateError />
  }

  if (datasetState === 'noneYet') {
    return <StateNoneYet />
  }

  return null
}
