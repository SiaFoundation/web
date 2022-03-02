import NextLink from 'next/link'
import { Link as RRLink } from 'react-router-dom'
import { CSS, styled } from '../config/theme'
import { Box } from './Box'
import { Button } from './Button'
import { Text } from './Text'

export const Link = styled('a', {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  outline: 'none',
  fontFamily: '$sans',
  textDecorationLine: 'none',
  textUnderlineOffset: '3px',
  textDecorationColor: '$slate4',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: 'inherit',
  '@hover': {
    '&:hover': {
      textDecorationLine: 'underline',
    },
  },
  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    textDecorationLine: 'none',
  },
  [`& ${Text}`]: {
    color: 'inherit',
  },
  variants: {
    variant: {
      green: {
        color: '$primary12',
        textDecorationColor: '$blue4',
        '&:focus': {
          outlineColor: '$blue8',
        },
      },
      subtle: {
        color: '$slate11',
        textDecorationColor: '$slate4',
        '&:focus': {
          outlineColor: '$accentActive',
        },
      },
      contrast: {
        color: '$hiContrast',
        textDecoration: 'underline',
        textDecorationColor: '$slate4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$accentInactive',
          },
        },
        '&:focus': {
          outlineColor: '$accentActive',
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
  children: React.ReactNode
  variant?: React.ComponentProps<typeof Link>['variant']
  css?: CSS
}

// Next link
export function NLink({
  id,
  href,
  target,
  children,
  variant = 'contrast',
  css,
}: NLinkProps) {
  return (
    <NextLink href={href} passHref>
      <Link id={id} target={target} variant={variant} css={css}>
        {children}
      </Link>
    </NextLink>
  )
}

type NLinkButtonProps = {
  id?: string
  href: string
  target?: string
  children: React.ReactNode
  variant?: React.ComponentProps<typeof Button>['variant']
  css?: CSS
}

// Next link
export function NLinkButton({
  id,
  href,
  target,
  children,
  variant,
  css,
}: NLinkButtonProps) {
  return (
    <NextLink href={href} passHref>
      <Button as="a" id={id} css={css} variant={variant} target={target}>
        {children}
      </Button>
    </NextLink>
  )
}

type RLinkProps = {
  id?: string
  to: string
  target?: string
  children: React.ReactNode
  variant?: 'green' | 'subtle' | 'contrast'
  css?: CSS
}

// React Router link
export function RLink({
  id,
  to,
  target,
  children,
  variant = 'contrast',
  css,
}: RLinkProps) {
  return (
    <Link
      as={RRLink}
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

type RLinkButtonProps = {
  to: string
  target?: string
} & React.ComponentProps<typeof Button>

// React Router link
export function RLinkButton({ to, target, css, ...props }: RLinkButtonProps) {
  return (
    <Box
      as={RRLink}
      target={target}
      to={to}
      css={{ textDecoration: 'none', width: css?.width }}
    >
      <Button {...props} css={css} />
    </Box>
  )
}
