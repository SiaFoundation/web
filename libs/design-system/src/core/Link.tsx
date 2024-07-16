'use client'

import { Link as BaseNextLink } from '@siafoundation/next'
import { cva, cx } from 'class-variance-authority'
import React, { useCallback } from 'react'
import type { VariantProps } from '../types'
import { buttonStyles } from './Button'
import { textStyles } from './Text'
import { Tooltip } from './Tooltip'

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
    className,
  )

export const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.ComponentProps<typeof BaseNextLink>, 'href'> &
    LinkVariants & {
      href?: string | URL
    }
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
      onClick,
      ...props
    },
    ref,
  ) => {
    const rel = _rel || (target === '_blank' ? 'noopener' : undefined)
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (onClick) {
          if (!href) {
            e.preventDefault()
          }
          onClick(e)
        }
      },
      [onClick, href],
    )
    return (
      <BaseNextLink
        href={href || '#'}
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
        onClick={handleClick}
        rel={rel}
        target={target}
      />
    )
  },
)

export const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.ComponentProps<typeof BaseNextLink>, 'href' | 'tip'> &
    VariantProps<typeof buttonStyles> & {
      href?: string | URL
      tip?: React.ReactNode
      foo?: string
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
      onClick,
      ...props
    },
    ref,
  ) => {
    const rel = _rel || (target === '_blank' ? 'noopener' : undefined)
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (onClick) {
          if (!href) {
            e.preventDefault()
          }
          onClick(e)
        }
      },
      [onClick, href],
    )
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
            onClick={handleClick}
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
        onClick={handleClick}
        {...props}
        rel={rel}
        target={target}
      />
    )
  },
)
