/* eslint-disable react/jsx-pascal-case */
import { Text } from './Text'
import {
  DotMark16,
  Number_132,
  Number_232,
  Number_332,
  Number_432,
  Number_532,
  Number_632,
  Number_732,
} from '../icons/carbon'
import React from 'react'
import { Paragraph } from './Paragraph'
import { cx } from 'class-variance-authority'

type Props = {
  children: React.ReactNode
  className?: string
  gapClassName?: string
}

export function Ol({ children, className, gapClassName }: Props) {
  return (
    <ol className={cx('flex flex-col p-0', gapClassName || 'gap-4', className)}>
      {children}
    </ol>
  )
}

export function Ul({ children, className, gapClassName }: Props) {
  return (
    <ul className={cx('flex flex-col p-0', gapClassName || 'gap-4', className)}>
      {children}
    </ul>
  )
}

const numMap: Record<number, React.ReactNode> = {
  1: <Number_132 />,
  2: <Number_232 />,
  3: <Number_332 />,
  4: <Number_432 />,
  5: <Number_532 />,
  6: <Number_632 />,
  7: <Number_732 />,
}

type LiProps = {
  children: React.ReactNode
  subList?: React.ReactNode
  className?: string
  index?: number
  size?: React.ComponentProps<typeof Paragraph>['size']
}

export function Li({
  children,
  index = 0,
  size = '18',
  subList,
  className,
}: LiProps) {
  const numEl = numMap[index]

  return (
    <li className={cx('flex items-start gap-2', className)}>
      <div
        className={cx(
          'flex relative w-6 h-8',
          numEl
            ? Number(size) < 18
              ? 'top-[-5px] md:top[-3px]'
              : 'top[-3px] md:top-0'
            : Number(size) < 18
            ? 'top-[-4px] md:top-[-2px]'
            : 'top-[-2px] md:top-0'
        )}
      >
        <div className="flex absolute w-full h-full items-center justify-center">
          <Text color="contrast">{numEl || <DotMark16 />}</Text>
        </div>
      </div>
      <div className="flex-1">
        <Paragraph color="contrast" size={size}>
          {children}
        </Paragraph>
        {subList}
      </div>
    </li>
  )
}
