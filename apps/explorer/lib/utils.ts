import { routes } from '../config/routes'
import { Metadata } from 'next'
import { siteName } from '../config'
import { EntityType } from '@siafoundation/units'

export function getHref(type: EntityType, value: string) {
  // Block accepts blockhash as a value.
  const coercedType = type === 'blockHash' ? 'block' : type

  switch (coercedType) {
    case 'output':
    case 'ip':
    case 'hostIp':
      return routes['home'].index

    case 'hostPublicKey':
      return routes['host'].view.replace(':id', value)

    default:
      return routes[coercedType]?.view.replace(':id', value) || ''
  }
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
