import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'

const styles = cva(
  [
    'bg-gray-300 dark:bg-graydark-300',
    'relative',
    'overflow-hidden',
    'animate-pulse',
  ],
  {
    variants: {
      variant: {
        text: 'h-4 rounded',
      },
    },
  }
)

type Props = VariantProps<typeof styles>

export function Skeleton({ variant, className }: Props) {
  return <div className={styles({ variant, className })} />
}
