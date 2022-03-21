import BaseNextLink from 'next/link'
import { Link as BaseRRLink } from 'react-router-dom'
import { CSS, styled } from '../config/theme'
import { Box } from './Box'
import { Button } from './Button'
import { Text } from './Text'

export const Link = styled('a', {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  fontFamily: '$mono',
  outline: 'none',
  textDecorationLine: 'underline',
  textUnderlineOffset: '2px',
  lineHeight: 'inherit',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  fontSize: '$16',

  [`${Text} &`]: {
    color: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },

  variants: {
    variant: {
      subtle: {
        color: '$textSubtle',
        textDecorationColor: '$textSubtle',
      },
      contrast: {
        color: '$textContrast',
        textDecorationColor: '$textContrast',
      },
      accent: {
        color: '$brandAccent11',
        textDecorationColor: '$brandAccent11',
      },
      light: {
        color: '$whiteA12',
        textDecorationLine: 'none',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$whiteA12',
            textDecorationLine: 'underline',
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
  children?: React.ReactNode
  variant?: React.ComponentProps<typeof Link>['variant']
  css?: CSS
}

// Next link
export function NextLink({
  id,
  href,
  target,
  children,
  variant = 'contrast',
  css,
}: NLinkProps) {
  return (
    <BaseNextLink href={href} passHref>
      <Link id={id} target={target} variant={variant} css={css}>
        {children}
      </Link>
    </BaseNextLink>
  )
}

type NextLinkButtonProps = {
  id?: string
  href: string
  target?: string
} & React.ComponentProps<typeof Button>

// Next link
export function NextLinkButton({
  id,
  href,
  target,
  children,
  variant,
  flat,
  size,
  css,
}: NextLinkButtonProps) {
  return (
    <BaseNextLink href={href} passHref>
      <Button
        as="a"
        id={id}
        css={css}
        variant={variant}
        flat={flat}
        size={size}
        target={target}
      >
        {children}
      </Button>
    </BaseNextLink>
  )
}

type RRLinkProps = {
  id?: string
  to: string
  target?: string
  children: React.ReactNode
  variant?: React.ComponentProps<typeof Link>['variant']
  css?: CSS
}

// React Router link
export function RRLink({
  id,
  to,
  target,
  children,
  variant = 'contrast',
  css,
}: RRLinkProps) {
  return (
    <Link
      as={BaseRRLink}
      id={id}
      target={target}
      variant={variant}
      css={css}
      to={to}
    >
      {children}
    </Link>
  )
}

type RRLinkButtonProps = {
  to: string
  target?: string
} & React.ComponentProps<typeof Button>

// React Router link
export function RRLinkButton({ to, target, css, ...props }: RRLinkButtonProps) {
  return (
    <Box
      as={BaseRRLink}
      target={target}
      to={to}
      css={{ textDecoration: 'none', width: css?.width }}
    >
      <Button {...props} css={css} />
    </Box>
  )
}
