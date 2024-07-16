import type { ContentItemProps } from '@siafoundation/design-system'

export function addNewTab(item: ContentItemProps) {
  return {
    ...item,
    newTab: true,
  }
}

export function allInNewTab(items: ContentItemProps[]) {
  return items.map(addNewTab)
}

// https://stackoverflow.com/questions/63141123/get-text-content-from-react-element-stored-in-a-variable
export function textContent(elem: React.ReactNode): string {
  if (!elem) {
    return ''
  }
  if (typeof elem === 'string') {
    return elem
  }
  const children =
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ((elem as any).props && (elem as any).props.children) || false

  if (children instanceof Array) {
    return children.map(textContent).join('')
  }
  return textContent(children)
}
