import { Flex, NextLink, Text } from '..'
import { NextLinkButton } from '../core/Link'
import { Link } from '../lib/links'

type Props = {
  links?: Link[]
  size?: '1' | '2'
}

export function Links({ links = [], size = '1' }: Props) {
  if (!links.length) {
    return null
  }

  if (size === '2') {
    return (
      <Flex gap="3" wrap="wrap">
        {links.map((link) => (
          <NextLinkButton
            key={link.title + link.link}
            variant="accent"
            size="2"
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
    <Flex gap="3" wrap="wrap">
      {links.map((link) => (
        <Text size="14" font="mono" key={link.title + link.link}>
          <NextLink
            variant="contrast"
            href={link.link}
            site
            target={link.newTab ? '_blank' : undefined}
          >
            {link.title}
          </NextLink>
        </Text>
      ))}
    </Flex>
  )
}
