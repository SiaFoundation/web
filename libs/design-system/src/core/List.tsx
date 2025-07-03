import { Text, textStyles } from './Text'
import React from 'react'
import { cx } from 'class-variance-authority'

type Props = {
  children: React.ReactNode
  className?: string
}

export function Ol({ children, className }: Props) {
  return (
    <ol className={cx('list-decimal flex flex-col pl-4 py-1 gap-1', className)}>
      {children}
    </ol>
  )
}

export function Ul({ children, className }: Props) {
  return (
    <ul className={cx('list-disc flex flex-col pl-4 py-1 gap-1', className)}>
      {children}
    </ul>
  )
}

type LiProps = React.ComponentProps<typeof Text>

export function Li({
  children,
  size = '16',
  className,
  color = 'subtle',
  scaleSize,
  font,
  weight,
  noWrap,
  ellipsis,
  underline,
}: LiProps) {
  return (
    <li
      className={cx(
        textStyles({
          display: 'none',
          scaleSize,
          size,
          font,
          color,
          weight,
          noWrap,
          ellipsis,
          underline,
        }),
        // The className removes vertical padding from p tags, this was added
        // because when Li is used in mdx rendering there is always a nested p tag
        '[&>p]:!py-0',
        className
      )}
    >
      {children}
    </li>
  )
}
