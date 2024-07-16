'use client'

import { cx } from 'class-variance-authority'
import { useTheme } from 'next-themes'
import { Link } from '../core/Link'
import { Paragraph } from '../core/Paragraph'
import { Text } from '../core/Text'
import type { ContentItemProps } from './ContentItem'
import { WebDomain } from './WebDomain'

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
  className,
}: ContentProjectProps) {
  const { resolvedTheme } = useTheme()
  return (
    <div className={cx('flex flex-col', className)}>
      <Link
        href={link}
        target={newTab ? '_blank' : undefined}
        color="contrast"
        className="mb-5"
      >
        <div
          className="relative"
          style={{
            filter: `grayscale(1) invert(${resolvedTheme === 'dark' ? 1 : 0})`,
          }}
        >
          {/* NextImage was having issues loading the file */}
          <img
            src={`/logos/${logo}.png`}
            loading="lazy"
            alt={title}
            className="h-[30px] md:h-[50px]"
          />
        </div>
      </Link>
      {subtitle && (
        <Paragraph color="subtle" size="14" className="mb-3">
          {subtitle}
        </Paragraph>
      )}
      <Text size="14" font="mono" className="mb-1">
        {link && (
          <Link
            href={link}
            target={newTab ? '_blank' : undefined}
            color="contrast"
          >
            Learn more about {title}
          </Link>
        )}
      </Text>
      <WebDomain link={link} />
    </div>
  )
}
