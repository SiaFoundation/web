import { Flex, NextLink, Text, LinkData } from '@siafoundation/design-system'

type Props = {
  links?: LinkData[]
}

export function DownloadLinks({ links = [] }: Props) {
  if (!links.length) {
    return null
  }

  return (
    <Flex gap="2" wrap="wrap">
      {links.map((link) => (
        <Text size="14" font="mono" key={link.title + link.link}>
          <NextLink
            variant="contrast"
            href={link.link}
            underline="hover"
            target={link.newTab ? '_blank' : undefined}
          >
            {link.title}
          </NextLink>
        </Text>
      ))}
    </Flex>
  )
}
