import { itemStyles, Label } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import { Command, useCommandState } from 'cmdk'
import React from 'react'
import { Page } from './types'

export function CommandItemNav({
  currentPage,
  parentPage,
  commandPage,
  className,
  ...props
}: React.ComponentProps<typeof Command.Item> & {
  currentPage?: Page
  parentPage?: Page
  commandPage?: Page
}) {
  const search = useCommandState((state) => state.search)
  // show if user is on parent page and not searching
  if (parentPage?.namespace === currentPage?.namespace && !search)
    return (
      <Command.Item
        className={cx(itemStyles(), 'group', className)}
        value={`${commandPage?.label} ${props.children?.toString() || ''}`}
        {...props}
      />
    )
}

export function CommandItemSearch({
  currentPage,
  commandPage,
  className,
  ...props
}: React.ComponentProps<typeof Command.Item> & {
  currentPage: Page | undefined
  commandPage: Page
}) {
  const search = useCommandState((state) => state.search)
  // show if user is searching, or we are on the commands page
  const withinSearchSpace = commandPage.namespace.startsWith(
    currentPage?.namespace || ''
  )
  if (
    (search && withinSearchSpace) ||
    commandPage.namespace === currentPage?.namespace
  )
    return (
      <Command.Item
        className={cx(itemStyles(), 'group', className)}
        value={`${commandPage.label} ${props.children?.toString() || ''}`}
        {...props}
      />
    )
}

export function CommandItemRootAndSearch({
  currentPage,
  commandPage,
  className,
  ...props
}: React.ComponentProps<typeof Command.Item> & {
  currentPage?: Page
  commandPage: Page
}) {
  const search = useCommandState((state) => state.search)
  // show if user is searching, or we are on the root or commands page
  const withinSearchSpace = commandPage.namespace.startsWith(
    currentPage?.namespace || ''
  )
  if (
    (search && withinSearchSpace) ||
    !currentPage ||
    commandPage.namespace === currentPage?.namespace
  )
    return (
      <Command.Item
        className={cx(itemStyles(), 'group', className)}
        value={`${commandPage.label} ${props.children?.toString() || ''}`}
        {...props}
      />
    )
}

export function CommandGroup({
  heading,
  currentPage,
  commandPage,
  ...props
}: React.ComponentProps<typeof Command.Group> & {
  currentPage?: Page
  commandPage: Page
}) {
  const search = useCommandState((state) => state.search)
  // show headings on root page when search is active, do not show if current page
  return (
    <Command.Group
      heading={
        search &&
        currentPage?.namespace !== commandPage.namespace && (
          <Label className="px-1" size="12">
            {commandPage.label}
          </Label>
        )
      }
      {...props}
    />
  )
}
