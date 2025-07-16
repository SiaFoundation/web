import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'

const styles = cva([
  'flex',
  'relative',
  '[&>*]:rounded-none [&>*:last-child]:rounded-r [&>*:first-child]:rounded-l',
  '[&>*]:border-r-0 [&>*]:border-l [&>*:first-child]:border-l [&>*:last-child]:border-r',
])

export function ControlGroup({
  ref,
  className,
  ...props
}: VariantProps<typeof styles> &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.RefObject<HTMLDivElement>
  }) {
  return <div ref={ref} className={styles({ className })} {...props} />
}
