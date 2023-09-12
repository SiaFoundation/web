'use client'

import { cx } from 'class-variance-authority'
import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { textStyles } from './Text'
import { VariantProps } from '../types'

export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsPrimitive.TabsProps
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cx('flex flex-col', className)}
      {...props}
    />
  )
})

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsPrimitive.TabsListProps
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cx(
        'flex flex-shrink-0 border-b border-gray-500 dark:border-graydark-500',
        className
      )}
      {...props}
    />
  )
})

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  VariantProps<typeof textStyles> & TabsPrimitive.TabsTriggerProps
>(({ font, size = '16', weight = 'medium', className, ...props }, ref) => {
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
        className
      )}
      {...props}
    />
  )
})

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  VariantProps<typeof textStyles> & TabsPrimitive.TabsContentProps
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cx('flex-grow-1 pt-6 outline-none', className)}
      {...props}
    />
  )
})
