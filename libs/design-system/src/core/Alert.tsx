import { cva } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'

const styles = cva(
  'border border-gray-500 dark:border-graydark-500 bg-gray-100 dark:bg-graydark-100 rounded p-4'
)

export const Alert = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof styles> & React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div {...props} className={styles({ className })} ref={ref} />
))
