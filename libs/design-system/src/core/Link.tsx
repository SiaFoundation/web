import { cva, cx } from 'class-variance-authority'
import BaseNextLink from 'next/link'
import React from 'react'
import { textStyles } from './Text'
import { buttonStyles } from './Button'
import { VariantProps } from '../types'

const linkStyles = cva(['cursor-pointer'], {
  variants: {
    disabled: {
      true: 'opacity-50',
    },
    underline: {
      default: 'underline underline-offset-2',
      hover: 'hover:underline underline-offset-2',
      none: '',
    },
  },
  defaultVariants: {
    disabled: false,
    underline: 'default',
  },
})

type LinkVariants = VariantProps<typeof textStyles> &
  VariantProps<typeof linkStyles>

const styles = ({
  font,
  size,
  scaleSize,
  color,
  weight,
  noWrap,
  ellipsis,
  underline,
  disabled,
  className,
}: LinkVariants) =>
  cx(
    textStyles({ scaleSize, size, font, color, weight, noWrap, ellipsis }),
    linkStyles({ disabled, underline }),
    className
  )

export const Link = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof BaseNextLink> & LinkVariants
>(
  (
    {
      href,
      font,
      size,
      scaleSize,
      color,
      weight,
      noWrap,
      ellipsis,
      underline,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <BaseNextLink
        href={href || '#'}
        ref={ref}
        className={styles({
          font,
          scaleSize,
          size,
          color,
          weight,
          noWrap,
          ellipsis,
          underline,
          disabled,
          className,
        })}
        {...props}
      />
    )
  }
)

export const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof BaseNextLink> & VariantProps<typeof buttonStyles>
>(
  (
    { href, disabled, variant, size, state, rounded, className, ...props },
    ref
  ) => {
    return (
      <BaseNextLink
        href={href || '#'}
        ref={ref}
        className={buttonStyles({
          variant,
          size,
          state,
          rounded,
          disabled,
          className,
        })}
        {...props}
      />
    )
  }
)
