import { routes } from '../config/routes'
import {
  getNvgEntityTypeInitials,
  getNvgEntityTypeLabel,
  NvgEntityType,
  nvgEntityTypes,
} from '../config/navigatorTypes'
import { EntityListItemProps } from '@siafoundation/design-system'

const linkableTypes = nvgEntityTypes

export function getHrefForType(type: string, value: string) {
  if (linkableTypes.includes(type)) {
    const route = routes[type] || routes.tx
    return route.view.replace('[id]', value)
  } else {
    return undefined
  }
}

export function getTitleId(title: string, id: string, limit?: number) {
  if (id) {
    return `${title} ${id.slice(0, limit)}`
  }
  return `${title}`
}

export function getNvgEntityItemProps(
  type: NvgEntityType,
  props: EntityListItemProps
): EntityListItemProps {
  return {
    label: getNvgEntityTypeLabel(type),
    initials: getNvgEntityTypeInitials(type),
    href: getHrefForType(type, props.hash),
    avatarShape: type === 'address' || type === 'block' ? 'square' : 'circle',
    blockHref: props.height
      ? getHrefForType('block', String(props.height))
      : undefined,
    ...props,
  }
}
