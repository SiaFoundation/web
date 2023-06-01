import { cx } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'
import { textStyles } from './Text'

export const Codeblock = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & VariantProps<typeof textStyles>
>(({ className, size, color, ...props }, forwardedRef) => {
  return (
    <pre>
      <code
        className={cx(
          textStyles({ font: 'mono', size, color }),
          'block',
          'w-full',
          'overflow-auto',
          'p-3',
          'bg-white dark:bg-graydark-200',
          'border border-gray-400 dark:border-graydark-400',
          'rounded',
          className
        )}
        {...props}
        ref={forwardedRef}
      />
    </pre>
  )
})
