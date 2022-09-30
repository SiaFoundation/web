import { Flex } from '../core/Flex'
import { NextLink } from '../core/Link'
import { Text } from '../core/Text'
import { CSS } from '../config/theme'
import { NextLinkButton } from '../core/Link'
import { LinkData } from '../lib/links'

type Props = {
  links?: LinkData[]
  size?: '1' | '2' | '3'
  css?: CSS
}

export function Links({ links = [], size = '1', css }: Props) {
  if (!links.length) {
    return null
  }

  if (size === '3') {
    return (
      <Flex gap="1-5" wrap="wrap" css={css}>
        {links.map((link) => (
          <NextLinkButton
            key={link.title + link.link}
            variant="accent"
            size={{
              '@initial': '1',
              '@bp2': '2',
            }}
            href={link.link}
            target={link.newTab ? '_blank' : undefined}
            site
          >
            {link.title}
          </NextLinkButton>
        ))}
      </Flex>
    )
  }

  return (
    <Flex gap="3" wrap="wrap" css={css}>
      {links.map((link) => (
        <Text
          size={size === '2' ? '16' : '14'}
          font="mono"
          key={link.title + link.link}
        >
          <NextLink
            variant="contrast"
            href={link.link}
            target={link.newTab ? '_blank' : undefined}
          >
            {link.title}
          </NextLink>
        </Text>
      ))}
    </Flex>
  )
}
