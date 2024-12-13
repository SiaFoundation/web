import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { useFilesFlat } from '../../../contexts/filesFlat'
import { StateNoneOnPage } from '@siafoundation/design-system'

export function EmptyState() {
  const { datasetState } = useFilesFlat()

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
