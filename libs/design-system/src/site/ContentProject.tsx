import { Flex, NextLink, Text } from '..'
import { Paragraph } from '../core/Paragraph'
import { ContentItemProps } from './ContentItem'
import { WebDomain } from './WebDomain'
import { Image } from '../core/Image'
import { Box } from '../core/Box'
import { useTheme } from '../hooks/useTheme'

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
  const { activeTheme } = useTheme()
  return (
    <Flex direction="column" gap="1-5" css={css}>
      <Flex direction="column" gap="1">
        <NextLink
          href={link}
          target={newTab ? '_blank' : undefined}
          variant="contrast"
        >
          <Box
            css={{
              position: 'relative',
              height: '50px',
              width: '300px',
              overflow: 'hidden',
              filter: `grayscale(1) invert(${activeTheme === 'dark' ? 1 : 0})`,
            }}
          >
            {/* NextImage was having issues loading the file */}
            <Image
              src={`/logos/${logo}.png`}
              loading="lazy"
              alt={title}
              height="50px"
              width="300px"
            />
          </Box>
        </NextLink>
        {subtitle && (
          <Paragraph color="subtle" size="14">
            {subtitle}
          </Paragraph>
        )}
      </Flex>
      <Text size="14" font="mono">
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
