import React from 'react'
import { Text } from './Text'
import { cx, VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { Link20 } from '../icons/carbon'

const DEFAULT_TAG = 'h1'

// This is the mapping of Heading to Text size variants
const textTag: Record<HeadingSizeVariants, string> = {
  20: 'h3',
  24: 'h3',
  32: 'h2',
  40: 'h2',
  64: 'h1',
}

const textStyles: Record<HeadingSizeVariants, string> = {
  20: 'font-semibold text-base md:text-xl',
  24: 'font-bold text-xl md:text-2xl',
  32: 'font-semibold text-2xl md:text-3xl',
  40: 'font-semibold text-3xl md:text-4xl',
  64: 'font-semibold text-4xl md:text-6xl',
}

type HeadingSizeVariants = '20' | '24' | '32' | '40' | '64'
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & {
    className?: string
    as?: string
    anchorLink?: boolean
    showAnchor?: boolean
  }

export const Heading = React.forwardRef<
  React.ElementRef<typeof DEFAULT_TAG>,
  HeadingProps
>((props, forwardedRef) => {
  const {
    size = '24',
    className,
    id,
    children,
    anchorLink,
    showAnchor,
    ...textProps
  } = props

  const tag = textTag[size]

  if (anchorLink) {
    const cId =
      id ||
      (typeof children === 'string'
        ? encodeURI(children.toLowerCase().replace(/ /g, '-'))
        : '')

    return (
      <div className={cx('flex flex-col gap-6 items-start', className)}>
        <div className="relative">
          <div id={cId} className="absolute -top-[100px]" />
        </div>
        <Link href={`#${cId}`} className="relative group">
          <Text className="hidden group-hover:block">
            <Link20 className="absolute top-1 -left-7 hidden md:block" />
          </Text>
          <Text
            as={tag}
            {...textProps}
            ref={forwardedRef}
            weight="none"
            className={cx('proportional-nums inline-block', textStyles[size])}
          >
            {children}
          </Text>
        </Link>
      </div>
    )
  }

  return (
    <div className={cx('flex flex-col gap-6 items-start', className)}>
      <Text
        as={tag}
        {...textProps}
        ref={forwardedRef}
        weight="none"
        className={cx(
          'proportional-nums inline-block',
          textStyles[size],
          className
        )}
      >
        {children}
      </Text>
    </div>
  )
})
