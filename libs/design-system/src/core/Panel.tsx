import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

export const panelStyles = cva(
  [
    'transition-shadow ease-in-out duration-300',
    'shadow-sm hover:shadow',
    'rounded',
    'border',
  ],
  {
    variants: {
      color: {
        default: [
          'bg-white dark:bg-graydark-200',
          'border-gray-400 dark:border-graydark-400',
        ],
        subtle: ['border-gray-200 dark:border-graydark-200'],
      },
    },
    defaultVariants: {
      color: 'default',
    },
  },
)

export const Panel = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof panelStyles> & React.HTMLAttributes<HTMLDivElement>
>(({ className, color, ...props }, ref) => {
  return (
    <div ref={ref} className={panelStyles({ className, color })} {...props} />
  )
})
