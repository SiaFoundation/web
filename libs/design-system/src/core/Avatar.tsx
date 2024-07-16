'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, cx } from 'class-variance-authority'
import React from 'react'
import type { VariantProps } from '../types'

const avatarStyles = cva(
  [
    'items-center justify-center align-middle flex flex-shrink-0 relative',
    'overflow-hidden select-none outline-none',
    'font-sans font-medium text-sm',
    'border',
  ],
  {
    variants: {
      size: {
        '1': 'w-6 h-6',
        '2': 'w-12 h-12',
        '3': 'w-16 h-16',
        '4': 'w-28 h-28',
      },
      variant: {
        filter: 'bg-transparent',
        hiContrast: [
          'bg-gray-900 dark:bg-white text-white dark:text-gray-1100',
          'border-gray-900 dark:border-white text-white dark:text-gray-1100',
        ],
        gray: [
          'bg-gray-500 dark:bg-gray-800 text-gray-1100 dark:text-white',
          'border-gray-500 dark:border-gray-800 text-gray-1100 dark:text-white',
        ],
      },
      shape: {
        square: 'rounded',
        circle: 'rounded-full',
      },
      inactive: {
        true: 'opacity-30',
      },
      interactive: {
        true: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: '2',
      variant: 'gray',
      shape: 'circle',
    },
  },
)

const fallbackStyles = cva('uppercase', {
  variants: {
    size: {
      '1': 'text-sm',
      '2': 'text-base',
      '3': 'text-lg',
      '4': 'text-lg',
    },
  },
  defaultVariants: {
    size: '2',
  },
})

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  VariantProps<typeof avatarStyles> &
    AvatarPrimitive.AvatarProps &
    AvatarPrimitive.AvatarImageProps & {
      fallback?: string
    }
>(
  (
    {
      alt,
      src,
      fallback,
      size,
      variant,
      shape,
      interactive,
      inactive,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cx('relative h-fit w-fit', className)}>
        <AvatarPrimitive.Root
          {...props}
          ref={ref}
          className={avatarStyles({
            className,
            size,
            variant,
            interactive,
            inactive,
            shape,
          })}
        >
          {variant === 'filter' && (
            <div
              className="absolute w-full h-full z-10"
              style={{
                backgroundColor: 'rgba(30, 169, 76, 0.3)',
              }}
            />
          )}
          <AvatarPrimitive.Image
            alt={alt}
            src={src}
            className="flex object-cover h-full align-middle w-full"
          />
          <AvatarPrimitive.Fallback className={fallbackStyles({ size })}>
            {fallback}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
      </div>
    )
  },
)
