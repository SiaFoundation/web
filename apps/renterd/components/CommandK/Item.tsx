import { itemStyles } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import { Command, useCommandState } from 'cmdk'
import React from 'react'

export function CommandItemRootSearchAndPage({
  currentPage,
  commandPage,
  className,
  ...props
}: React.ComponentProps<typeof Command.Item> & {
  currentPage?: string
  commandPage: string
}) {
  const search = useCommandState((state) => state.search)
  // show if user is searching on the root page, or we are on the commands page
  if ((!currentPage && search) || commandPage === currentPage)
    return (
      <Command.Item
        className={cx(itemStyles(), className)}
        value={`${commandPage} ${props.children.toString()}`}
        {...props}
      />
    )
}

export function CommandItemRootAndPage({
  currentPage,
  commandPage,
  className,
  ...props
}: React.ComponentProps<typeof Command.Item> & {
  currentPage?: string
  commandPage: string
}) {
  // show if user is on the root page, or we are on the commands page
  if (!currentPage || commandPage === currentPage)
    return (
      <Command.Item
        className={cx(itemStyles(), className)}
        value={`${commandPage} ${props.children}`}
        {...props}
      />
    )
}

export function CommandItemRootInitialOnly({
  currentPage,
  className,
  ...props
}: React.ComponentProps<typeof Command.Item> & {
  currentPage?: string
}) {
  const search = useCommandState((state) => state.search)
  // only show on the root page when no search is active
  if (!currentPage && !search)
    return <Command.Item className={cx(itemStyles(), className)} {...props} />
}
export function CommandGroup({
  heading,
  currentPage,
  commandPage,
  ...props
}: React.ComponentProps<typeof Command.Group> & {
  currentPage?: string
  commandPage: string
}) {
  const search = useCommandState((state) => state.search)
  // show headings on root page when search is active, do not show if current page
  return (
    <Command.Group
      heading={search && currentPage !== commandPage && heading}
      {...props}
    />
  )
}
