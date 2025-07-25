'use client'

import NextLink from 'next/link'
import * as NavMenuPrimitives from '@radix-ui/react-navigation-menu'
import { cx } from 'class-variance-authority'
import { linkStyles, LinkVariants } from './Link'
import { UrlObject } from 'url'

type Props = {
  rootProps?: React.ComponentProps<typeof NavMenuPrimitives.Item>
  contentProps?: React.ComponentProps<typeof NavMenuPrimitives.Content>
  trigger?: React.ReactNode
  children: React.ReactNode
  ref?: React.RefObject<HTMLDivElement>
}

export function NavMenuItem({
  ref,
  trigger,
  children,
  rootProps,
  contentProps: _contentProps,
}: Props) {
  const { className: contentClassName, ...contentProps } = _contentProps || {}
  return (
    <NavMenuPrimitives.Item {...rootProps}>
      {trigger && (
        <NavMenuPrimitives.Trigger>{trigger}</NavMenuPrimitives.Trigger>
      )}
      <NavMenuPrimitives.Content
        ref={ref}
        className={cx(
          'absolute top-0 left-0 w-full sm:w-auto',
          'data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight',
          'data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight'
        )}
        {...contentProps}
      >
        {children}
      </NavMenuPrimitives.Content>
    </NavMenuPrimitives.Item>
  )
}

export const NavMenuRoot = NavMenuPrimitives.Root
export const NavMenuList = NavMenuPrimitives.List
export const NavMenuViewport = NavMenuPrimitives.Viewport
export const NavMenuIndicator = NavMenuPrimitives.Indicator

type NavMenuLinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> &
  LinkVariants & {
    href?: string | UrlObject
  } & {
    ref?: React.RefObject<HTMLAnchorElement>
  }

export function NavMenuLink({
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
  ref,
  ...props
}: NavMenuLinkProps) {
  const rel = _rel || (target === '_blank' ? 'noopener' : undefined)
  return (
    <NavMenuPrimitives.Link asChild>
      <NextLink
        ref={ref}
        href={href}
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
        rel={rel}
        {...props}
      />
    </NavMenuPrimitives.Link>
  )
}
