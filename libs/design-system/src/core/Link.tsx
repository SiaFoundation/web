import BaseNextLink from 'next/link'
import { Link as BaseRouterLink } from 'react-router-dom'
import { CSS, styled } from '../config/theme'
import { Box } from './Box'
import { Button } from './Button'
import { Text } from './Text'

export const Link = styled('a', {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  fontFamily: '$sans',
  outline: 'none',
  textDecorationLine: 'underline',
  textUnderlineOffset: '2px',
  lineHeight: 'inherit',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  cursor: 'pointer',

  fontSize: '$16',

  [`${Text} &`]: {
    color: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },

  variants: {
    underline: {
      none: {
        textDecorationLine: 'none',
        '@hover': {
          '&:hover': {
            textDecorationLine: 'none',
          },
        },
      },
      hover: {
        textDecorationLine: 'none',
        '@hover': {
          '&:hover': {
            textDecorationLine: 'underline',
          },
        },
      },
    },
    variant: {
      subtle: {
        color: '$textSubtle',
        textDecorationColor: '$textSubtle',
      },
      contrast: {
        color: '$textContrast',
        textDecorationColor: '$frame',
      },
      accent: {
        color: '$accent11',
        textDecorationColor: '$accent11',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
        '@hover': {
          '&:hover': {
            textDecorationLine: 'none',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'contrast',
  },
})

type NLinkProps = {
  id?: string
  href: string
  target?: string
  onClick?: () => void
  children?: React.ReactNode
  disabled?: boolean
  underline?: React.ComponentProps<typeof Link>['underline']
  variant?: React.ComponentProps<typeof Link>['variant']
  css?: CSS
}

// Next link
export function NextLink({
  id,
  href,
  target,
  children,
  onClick,
  underline,
  disabled,
  variant = 'contrast',
  css,
}: NLinkProps) {
  return (
    <BaseNextLink href={href} passHref>
      <Link
        id={id}
        target={target}
        underline={underline}
        variant={variant}
        disabled={disabled}
        css={css}
        onClick={onClick}
      >
        {children}
      </Link>
    </BaseNextLink>
  )
}

type NextLinkButtonProps = React.ComponentProps<typeof Button> & {
  id?: string
  href: string
  site?: boolean
  target?: string
  children: React.ReactNode
}

// Next link
export function NextLinkButton({
  id,
  href,
  target,
  children,
  site,
  variant,
  size,
  css,
}: NextLinkButtonProps) {
  return (
    <BaseNextLink href={href} passHref>
      <Button
        as="a"
        id={id}
        css={css}
        site={site}
        variant={variant}
        size={size}
        target={target}
      >
        {children}
      </Button>
    </BaseNextLink>
  )
}

type RouterLinkProps = {
  id?: string
  to: string
  target?: string
  children: React.ReactNode
  underline?: React.ComponentProps<typeof Link>['underline']
  variant?: React.ComponentProps<typeof Link>['variant']
  css?: CSS
}

// React Router link
export function RouterLink({
  id,
  to,
  target,
  children,
  underline,
  variant = 'contrast',
  css,
}: RouterLinkProps) {
  return (
    <Link
      as={BaseRouterLink}
      id={id}
      target={target}
      underline={underline}
      variant={variant}
      css={css}
      to={to}
    >
      {children}
    </Link>
  )
}

type RouterLinkButtonProps = {
  to: string
  target?: string
} & React.ComponentProps<typeof Button>

// React Router link
export function RouterLinkButton({
  to,
  target,
  css,
  ...props
}: RouterLinkButtonProps) {
  return (
    <Box
      as={BaseRouterLink}
      target={target}
      to={to}
      css={{ textDecoration: 'none', width: css?.width }}
    >
      <Button {...props} css={css} />
    </Box>
  )
}
