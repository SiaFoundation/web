'use client'

import { cx } from 'class-variance-authority'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { textStyles } from './Text'
import { VariantProps } from '../types'

export function Tabs({
  className,
  ref,
  ...props
}: TabsPrimitive.TabsProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cx('flex flex-col', className)}
      {...props}
    />
  )
}

export function TabsList({
  className,
  ref,
  ...props
}: TabsPrimitive.TabsListProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cx(
        'flex flex-shrink-0 border-b border-gray-500 dark:border-graydark-500',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({
  font,
  size = '16',
  weight = 'medium',
  className,
  ref,
  ...props
}: VariantProps<typeof textStyles> &
  TabsPrimitive.TabsTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      type="button"
      className={cx(
        'px-10 h-12',
        'flex-1 flex items-center justify-center',
        'outline-none',
        'select-none cursor-pointer',
        'border-b-3',
        'text-gray-1000 dark:text-graydark-1000',
        'hover:text-gray-1100 hover:dark:text-white',
        'border-transparent',
        'data-[state=active]:text-accent-1100 data-[state=active]:dark:text-accentdark-1100',
        'data-[state=active]:border-green-600 data-[state=active]:dark:border-green-500',
        textStyles({ font, size, weight, ellipsis: true }),
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({
  className,
  ref,
  ...props
}: VariantProps<typeof textStyles> &
  TabsPrimitive.TabsContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cx('flex-grow-1 pt-6 outline-none', className)}
      {...props}
    />
  )
}
