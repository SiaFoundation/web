import NextLink from 'next/link'
import { Link as RRLink } from 'react-router-dom'
import { CSS, styled } from '../config/theme'
import { Text } from './Text'

export const StyledLink = styled('a', {
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
        color: '$siaGreenA12',
        textDecorationColor: '$blue4',
        '&:focus': {
          outlineColor: '$blue8',
        },
      },
      subtle: {
        color: '$slate11',
        textDecorationColor: '$slate4',
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
      contrast: {
        color: '$hiContrast',
        textDecoration: 'underline',
        textDecorationColor: '$slate4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$slate7',
          },
        },
        '&:focus': {
          outlineColor: '$slate8',
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
  variant?: 'green' | 'subtle' | 'contrast'
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
      <StyledLink id={id} target={target} variant={variant} css={css}>
        {children}
      </StyledLink>
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
    <StyledLink
      as={RRLink}
      id={id}
      target={target}
      variant={variant}
      css={css}
      to={to}
    >
      {children}
    </StyledLink>
  )
}
