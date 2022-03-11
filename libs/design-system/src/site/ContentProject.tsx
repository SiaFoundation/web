import { Flex, NextLink, Text } from '..'
import { Paragraph } from '../core/Paragraph'
import { ContentItemProps } from './ContentItem'
import { WebDomain } from './WebDomain'
import { Image } from '../core/Image'
import { Box } from '../core/Box'

export type ContentProjectProps = ContentItemProps & {
  logo: string
  subtitle: string
  link: string
  tags: string[]
}

export function ContentProject({
  title,
  logo,
  subtitle,
  link,
  newTab,
  css,
}: ContentProjectProps) {
  return (
    <Flex direction="column" gap="2" css={css}>
      <Flex direction="column" gap="1">
        <NextLink
          href={link}
          target={newTab ? '_blank' : undefined}
          variant="contrast"
        >
          <Box
            css={{
              position: 'relative',
              height: '40px',
            }}
          >
            {/* NextImage was having issues loading the file */}
            <Image src={`/logos/${logo}.png`} alt={title} height="40px" />
          </Box>
        </NextLink>
        {subtitle && (
          <Paragraph color="subtle" size="1">
            {subtitle}
          </Paragraph>
        )}
      </Flex>
      <Text size="1" font="mono">
        {link && (
          <NextLink
            href={link}
            target={newTab ? '_blank' : undefined}
            variant="contrast"
          >
            Learn more about {title}
          </NextLink>
        )}
      </Text>
      <WebDomain link={link} />
    </Flex>
  )
}
