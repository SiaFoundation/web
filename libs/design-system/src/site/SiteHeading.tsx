import { cx } from 'class-variance-authority'
import React from 'react'
import { Heading } from '../core/Heading'
import { Paragraph } from '../core/Paragraph'
import { Text } from '../core/Text'
import { LinkData } from '../lib/links'
import { Links } from './Links'

type Size = '20' | '24' | '32' | '64'

type Props = {
  id?: string
  size?: Size
  eyebrow?: string
  title: string
  description?: React.ReactNode
  links?: LinkData[]
  className?: string
  children?: React.ReactNode
}

const sizeToGap: Record<Size, string> = {
  '20': 'gap-2',
  '24': 'gap-3',
  '32': 'gap-3',
  '64': 'gap-8',
}

const sizeToParagraph: Record<
  Size,
  React.ComponentProps<typeof Paragraph>['size']
> = {
  '20': '14',
  '24': '16',
  '32': '18',
  '64': '20',
}

const sizeToLinks: Record<Size, React.ComponentProps<typeof Links>['size']> = {
  '20': '1',
  '24': '1',
  '32': '2',
  '64': '3',
}

const sizeToEyebrow: Record<Size, React.ComponentProps<typeof Text>['size']> = {
  '20': '12',
  '24': '12',
  '32': '12',
  '64': '14',
}

const sizeToLinkPadTop: Record<Size, string> = {
  '20': 'pt-2',
  '24': 'pt-2',
  '32': 'pt-2',
  '64': 'pt-4',
}

const sizeToPadding: Record<Size, string> = {
  '20': 'p-0',
  '24': 'p-0',
  '32': 'py-10',
  '64': 'py-10',
}

export function SiteHeading({
  id,
  eyebrow,
  title,
  description,
  links,
  size = '32',
  className,
  children,
}: Props) {
  return (
    <div
      id={id}
      className={cx(
        'flex flex-col',
        sizeToGap[size],
        sizeToPadding[size],
        className
      )}
    >
      {eyebrow && (
        <Text
          size={sizeToEyebrow[size]}
          color="subtle"
          font="mono"
          className="uppercase font-medium"
        >
          {eyebrow}
        </Text>
      )}
      <Heading size={size} className="pb-2">
        {title}
      </Heading>
      {description && (
        <Paragraph size={sizeToParagraph[size]}>{description}</Paragraph>
      )}
      <Links
        links={links}
        size={sizeToLinks[size]}
        className={sizeToLinkPadTop[size]}
      />
      {children}
    </div>
  )
}
