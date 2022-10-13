import { format } from 'date-fns'
import {
  WindGusts24,
  Finance24,
  Wallet24,
  Currency24,
  Industry24,
  Archive24,
  IbmSecurity24,
  Development24,
  CenterCircle24,
  Code24,
  Money24,
  ListChecked24,
  MailAll24,
  TreeViewAlt24,
  Password24,
  Idea24,
  EventSchedule24,
  Policy24,
  TestToolIcon,
  EventsAlt24,
} from '../icons'
import { Box } from '../core/Box'
import { Flex } from '../core/Flex'
import { NextLink } from '../core/Link'
import { Text } from '../core/Text'
import { CSS } from '../config/theme'
import { Paragraph } from '../core/Paragraph'
import { WebDomain } from './WebDomain'
import React from 'react'

export type ContentItemProps = {
  title: string
  date?: string
  location?: string
  icon?: string
  logo?: string
  subtitle?: React.ReactNode
  children?: React.ReactNode
  link?: string
  tags?: string[]
  sections?: string[]
  newTab?: boolean
  css?: CSS
}

// Icon selection is mapped from strings so that component prop data is serializable
const icons: Record<string, React.ReactNode> = {
  WindGusts: <WindGusts24 />,
  Archive: <Archive24 />,
  Wallet: <Wallet24 />,
  Currency: <Currency24 />,
  Industry: <Industry24 />,
  Finance: <Finance24 />,
  EventsAlt: <EventsAlt24 />,
  Security: <IbmSecurity24 />,
  Development: <Development24 />,
  Code: <Code24 />,
  Money: <Money24 />,
  ListChecked: <ListChecked24 />,
  MailAll: <MailAll24 />,
  TestTool: <TestToolIcon size={24} />,
  TreeViewAlt: <TreeViewAlt24 />,
  Password: <Password24 />,
  Idea: <Idea24 />,
  EventSchedule: <EventSchedule24 />,
  CenterCircle: <CenterCircle24 />,
  Policy: <Policy24 />,
}

export function ContentItem({
  title,
  icon,
  date,
  subtitle,
  link,
  children,
  newTab,
  css,
}: ContentItemProps) {
  const externalLink = link && link.startsWith('http')
  const iconEl = icon && icons[icon]
  return (
    <Flex gap="2" align="start">
      {iconEl && (
        <Box css={{ paddingTop: '$1', color: '$textContrast' }}>{iconEl}</Box>
      )}
      <Box key={link} css={css}>
        <Flex direction="column" gap="1">
          <Flex direction="column" gap="1">
            <Text size="20" font="mono" css={{ lineHeight: '150%' }}>
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
            </Text>
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
          {subtitle && <Paragraph size="14">{subtitle}</Paragraph>}
          {children}
        </Flex>
      </Box>
    </Flex>
  )
}
