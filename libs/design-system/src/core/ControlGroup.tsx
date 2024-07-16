import { cva } from 'class-variance-authority'
import React from 'react'
import type { VariantProps } from '../types'

const styles = cva([
  'flex',
  'relative',
  '[&>*]:rounded-none [&>*:last-child]:rounded-r [&>*:first-child]:rounded-l',
  '[&>*]:border-r-0 [&>*]:border-l [&>*:first-child]:border-l [&>*:last-child]:border-r',
])

export const ControlGroup = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof styles> & React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={styles({ className })} {...props} />
})
