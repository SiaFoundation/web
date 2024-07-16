import {
  Archive24,
  CenterCircle24,
  Code24,
  Currency24,
  Development24,
  EventSchedule24,
  EventsAlt24,
  Finance24,
  IbmSecurity24,
  Idea24,
  Industry24,
  Integration24,
  ListChecked24,
  MailAll24,
  Microscope24,
  Money24,
  Password24,
  Policy24,
  TestToolIcon,
  TreeViewAlt24,
  Wallet24,
  WindGusts24,
} from '@siafoundation/react-icons'
import { format } from 'date-fns'
import type React from 'react'
import { Link } from '../core/Link'
import { Paragraph } from '../core/Paragraph'
import { Text } from '../core/Text'
import { WebDomain } from './WebDomain'

export type ContentItemProps = {
  title: string
  date?: string
  location?: string
  icon?: string
  logo?: string
  image?: string
  background?: string
  subtitle?: React.ReactNode
  children?: React.ReactNode
  link?: string
  linkText?: string
  tags?: string[]
  idea?: boolean
  sections?: string[]
  newTab?: boolean
  className?: string
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
  Integration: <Integration24 />,
  Microscope: <Microscope24 />,
}

export function ContentItem({
  title,
  icon,
  date,
  subtitle,
  link,
  children,
  newTab,
  className,
}: ContentItemProps) {
  const externalLink = link && link.startsWith('http')
  const iconEl = icon && icons[icon]
  return (
    <div className="flex gap-4 items-start">
      {iconEl && (
        <Text className="pt-1" color="accent">
          {iconEl}
        </Text>
      )}
      <div key={link} className={className}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {link ? (
              <Link
                scaleSize="20"
                font="mono"
                href={link}
                target={newTab ? '_blank' : undefined}
                color="contrast"
                className="text-base md:text-xl"
              >
                {title}
              </Link>
            ) : (
              <Text scaleSize="20" font="mono" className="text-base md:text-xl">
                {title}
              </Text>
            )}
            {(date || externalLink) && (
              <div className="flex gap-1 items-center">
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
              </div>
            )}
          </div>
          {subtitle && <Paragraph size="14">{subtitle}</Paragraph>}
          {children}
        </div>
      </div>
    </div>
  )
}
