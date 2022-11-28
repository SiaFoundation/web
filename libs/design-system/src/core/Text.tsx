import { cva, cx } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'

// // avoid clipping decenders when overflow is hidden
// padding: '0.14em 0',
export const textStyles = cva(['inline-block', 'font-sans'], {
  variants: {
    font: {
      mono: 'font-mono',
      sans: 'font-sans',
    },
    color: {
      verySubtle: 'text-gray-700 dark:text-graydark-700',
      subtle: 'text-gray-1000 dark:text-graydark-1000',
      contrast: 'text-gray-1100 dark:text-white',
      lo: 'text-white dark:text-graydark-50',
      accent: 'text-accent-1100 dark:text-accentdark-1100',
      red: 'text-red-700 dark:text-red-500',
      green: 'text-green-700 dark:text-green-500',
      amber: 'text-amber-600 dark:text-amber-500',
      none: '',
    },
    weight: {
      extrabold: 'font-extrabold',
      bold: 'font-bold',
      medium: 'font-medium',
      semibold: 'font-semibold',
      regular: 'font-normal',
      normal: 'font-normal',
      light: 'font-light',
      none: '',
    },
    size: {
      '10': 'text-2xs',
      '12': 'text-xs',
      '14': 'text-sm',
      '16': 'text-base',
      '18': 'text-lg',
      '20': 'text-xl',
      '24': 'text-2xl',
      '30': 'text-3xl',
      '36': 'text-4xl',
      '40': 'text-5xl', // 48
      '48': 'text-5xl',
      '60': 'text-6xl',
      '64': 'text-6xl', // 60
    },
    scaleSize: {
      '12': 'text-xxs md:text-xs',
      '14': 'text-xs md:text-sm',
      '16': 'text-sm md:text-base',
      '18': 'text-base md:text-lg',
      '20': 'text-base md:text-xl',
      '24': 'text-xl md:text-2xl',
      '30': 'text-2xl md:text-3xl',
      '36': 'text-3xl md:text-4xl',
      '40': 'text-4xl md:text-5xl', // 48
      '48': 'text-4xl md:text-5xl',
      '60': 'text-5xl md:text-6xl',
      '64': 'text-5xl md:text-6xl', // 60
    },
    noWrap: {
      true: 'whitespace-nowrap',
    },
    ellipsis: {
      true: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
  },
  defaultVariants: {
    weight: 'regular',
    font: 'sans',
    color: 'contrast',
  },
})

export const Text = React.forwardRef<
  HTMLSpanElement,
  VariantProps<typeof textStyles> & {
    tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  } & React.HTMLAttributes<HTMLSpanElement>
>(
  (
    {
      tag = 'span',
      className,
      font,
      color,
      weight,
      size,
      scaleSize,
      noWrap,
      ellipsis,
      ...props
    },
    ref
  ) => {
    const Tag = tag
    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cx(
          className,
          textStyles({
            font,
            color,
            weight,
            size,
            scaleSize,
            noWrap,
            ellipsis,
          })
        )}
        {...props}
      />
    )
  }
)
