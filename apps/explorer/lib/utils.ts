import type { EntityType } from '@siafoundation/design-system'
import type { Metadata } from 'next'
import { siteName } from '../config'
import { routes } from '../config/routes'

export function getHref(type: EntityType, value: string) {
  // block accepts blockhash as a value.
  const coercedType = type === 'blockHash' ? 'block' : type
  return routes[coercedType].view.replace(':id', value)
}

export function buildMetadata({
  title,
  description,
  url,
}: {
  title: string
  description: string
  url: string
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteName,
    },
  }
}
