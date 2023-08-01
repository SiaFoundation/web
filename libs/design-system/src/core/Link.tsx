import { cva, cx } from 'class-variance-authority'
import BaseNextLink from 'next/link'
import React from 'react'
import { textStyles } from './Text'
import { buttonStyles } from './Button'
import { VariantProps } from '../types'
import { Tooltip } from './Tooltip'
import { UrlObject } from 'url'

const linkVariants = cva(['cursor-pointer'], {
  variants: {
    disabled: {
      true: 'opacity-50 pointer-events-none',
    },
    underline: {
      accent:
        'underline underline-offset-4 decoration-2 decoration-accentdark-900 dark:decoration-accentdark-900',
      default: 'underline underline-offset-4',
      hover: 'hover:underline underline-offset-4',
      none: '',
    },
  },
  defaultVariants: {
    disabled: false,
    underline: 'default',
  },
})

export type LinkVariants = VariantProps<typeof textStyles> &
  VariantProps<typeof linkVariants>

export const linkStyles = ({
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
    textStyles({
      scaleSize,
      size,
      font,
      color,
      weight,
      noWrap,
      ellipsis,
      underline,
    }),
    linkVariants({ disabled, underline }),
    className
  )

export const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.ComponentProps<typeof BaseNextLink>, 'href'> &
    LinkVariants & {
      href?: string | UrlObject
    }
>(
  (
    {
      href = '#',
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
        href={href}
        ref={ref}
        className={linkStyles({
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
  Omit<React.ComponentProps<typeof BaseNextLink>, 'href'> &
    VariantProps<typeof buttonStyles> & {
      href?: string | UrlObject
      tip?: React.ReactNode
    }
>(
  (
    {
      href = '#',
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
            href={href}
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
        href={href}
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
