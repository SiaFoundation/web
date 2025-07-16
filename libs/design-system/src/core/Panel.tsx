import { cva, VariantProps } from 'class-variance-authority'

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
  }
)

export function Panel({
  className,
  color,
  ref,
  ...props
}: VariantProps<typeof panelStyles> &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.RefObject<HTMLDivElement>
  }) {
  return (
    <div ref={ref} className={panelStyles({ className, color })} {...props} />
  )
}
