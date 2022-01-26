import NLink from 'next/link'
import { styled } from '../config/theme'

export const SLink = styled('a', {
  fontFamily: '$sans',
  textDecoration: 'none',
  '&:hover': {
    color: '$siaGreen',
  },
})

type Props = {
  href: string
  target?: string
  children: React.ReactNode
}

export function Link({ href, target, children }: Props) {
  return (
    <NLink href={href} passHref>
      <SLink target={target}>{children}</SLink>
    </NLink>
  )
}
