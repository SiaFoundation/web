import React from 'react'
import { cx } from 'class-variance-authority'

export function SelectCard({
  ref,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      {...props}
      ref={ref}
      className={cx(
        'select-none flex items-center gap-4 rounded py-4 px-4',

        'focus:ring ring-blue-500 dark:ring-blue-200',
        'border',
        'bg-gray-200 dark:bg-graydark-50',
        'border-gray-400 dark:border-graydark-400',
        'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
        'disabled:cursor-default',
        'disabled:opacity-50'
      )}
    />
  )
}
