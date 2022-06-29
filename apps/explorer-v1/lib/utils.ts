import { humanNumber, toSiacoins } from '@siafoundation/sia-js'
import { routes } from '../config/routes'
import { entityTypes } from '../config/types'

export function formatSc(num: number) {
  return humanNumber(toSiacoins(num), { fixed: 4, units: 'SC' })
}

const linkableTypes = entityTypes

export function getHrefForType(type: string, value: string) {
  if (linkableTypes.includes(type)) {
    const route = routes[type] || routes.tx
    return route.view.replace('[id]', value)
  } else {
    return undefined
  }
}

export function getTitle(title: string, id: string, limit?: number) {
  if (id) {
    return `${title} ${id.slice(0, limit)}`
  }
  return `${title}`
}
