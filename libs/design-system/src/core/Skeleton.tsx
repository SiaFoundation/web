import { cva } from 'class-variance-authority'
import type { VariantProps } from '../types'

const styles = cva([
  'bg-gray-300 dark:bg-graydark-300',
  'relative',
  'overflow-hidden',
  'animate-pulse',
  'rounded',
])

type Props = VariantProps<typeof styles>

export function Skeleton({ className }: Props) {
  return <div className={styles({ className })} />
}
