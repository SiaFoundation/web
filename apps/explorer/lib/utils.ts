import { EntityType } from '@siafoundation/design-system'
import { routes } from '../config/routes'
import { Metadata } from 'next'
import { siteName } from '../config'

export function getHref(type: EntityType, value: string) {
  return routes[type].view.replace(':id', value)
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
