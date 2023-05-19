import { cx } from 'class-variance-authority'

export function TransparentGradient({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        'absolute h-full w-full -z-10 top-0 left-0',
        'bg-gradient-to-b',
        'from-white via-white/95 to-white',
        'dark:from-graydark-50 dark:via-graydark-100/95 dark:to-graydark-50',
        className
      )}
    />
  )
}
