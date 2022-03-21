import { ContentItemProps } from '@siafoundation/design-system'

export function addNewTab(item: ContentItemProps) {
  return {
    ...item,
    newTab: true,
  }
}

export function allInNewTab(items: ContentItemProps[]) {
  return items.map(addNewTab)
}
