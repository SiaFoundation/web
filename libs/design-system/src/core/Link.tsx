import { cva, cx } from 'class-variance-authority'
import BaseNextLink from 'next/link'
import React from 'react'
import { textStyles } from './Text'
import { buttonStyles } from './Button'
import { VariantProps } from '../types'
import { Tooltip } from './Tooltip'

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
      rel: _rel,
      target,
      ...props
    },
    ref
  ) => {
    const rel = _rel || (target === '_blank' ? 'noopener' : undefined)
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
        rel={rel}
        target={target}
      />
    )
  }
)

export const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof BaseNextLink> &
    VariantProps<typeof buttonStyles> & {
      tip?: React.ReactNode
    }
>(
  (
    {
      href,
      disabled,
      variant,
      size,
      state,
      rounded,
      icon,
      className,
      tip,
      rel: _rel,
      target,
      ...props
    },
    ref
  ) => {
    const rel = _rel || (target === '_blank' ? 'noopener' : undefined)
    if (tip) {
      return (
        <Tooltip content={tip}>
          <BaseNextLink
            href={href || '#'}
            ref={ref}
            className={buttonStyles({
              variant,
              size,
              state,
              rounded,
              disabled,
              icon,
              className,
            })}
            {...props}
            rel={rel}
            target={target}
          />
        </Tooltip>
      )
    }
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
          icon,
          className,
        })}
        {...props}
        rel={rel}
        target={target}
      />
    )
  }
)
