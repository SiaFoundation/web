import { format } from 'date-fns'
import { Box, Flex, NextLink, Text } from '..'
import { CSS } from '../config/theme'
import { Paragraph } from '../core/Paragraph'
import { WebDomain } from './WebDomain'

export type ContentItemProps = {
  title: string
  date?: string | number
  location?: string
  icon?: React.ReactNode
  logo?: string
  subtitle?: string | React.ReactFragment
  link?: string
  tags?: string[]
  sections?: string[]
  newTab?: boolean
  css?: CSS
}

export function ContentItem({
  title,
  icon,
  date,
  subtitle,
  link,
  newTab,
  css,
}: ContentItemProps) {
  const externalLink = link && link.startsWith('http')

  return (
    <Flex gap="2" align="start">
      {icon && (
        <Box css={{ paddingTop: '$1', color: '$textContrast' }}>{icon}</Box>
      )}
      <Box key={link} css={css}>
        <Flex direction="column" gap="1">
          <Flex direction="column" gap="1">
            <Paragraph size="3" font="mono" css={{ color: '$brandGray12' }}>
              {link ? (
                <NextLink
                  href={link}
                  target={newTab ? '_blank' : undefined}
                  variant="contrast"
                >
                  {title}
                </NextLink>
              ) : (
                title
              )}
            </Paragraph>
            {(date || externalLink) && (
              <Flex gap="1" align="center">
                {date && (
                  <Text size="12" color="subtle">
                    {format(new Date(date), 'PP')}
                  </Text>
                )}
                {date && externalLink && (
                  <Text size="12" color="subtle">
                    •
                  </Text>
                )}
                {externalLink && <WebDomain link={link} />}
              </Flex>
            )}
          </Flex>
          {subtitle && (
            <Paragraph color="subtle" size="1">
              {subtitle}
            </Paragraph>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}
