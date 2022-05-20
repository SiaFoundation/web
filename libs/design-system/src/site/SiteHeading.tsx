import { Flex, Heading, Paragraph, Text } from '..'
import { CSS } from '../config/theme'
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
  css?: CSS
  children?: React.ReactNode
}

const sizeToGap: Record<Size, React.ComponentProps<typeof Flex>['gap']> = {
  '20': '2',
  '24': '2',
  '32': '2',
  '64': '2',
}

const sizeToHeading: Record<
  Size,
  React.ComponentProps<typeof Heading>['size']
> = {
  '20': '20',
  '24': '24',
  '32': '32',
  '64': '64',
}

const sizeToParagraph: Record<
  Size,
  React.ComponentProps<typeof Paragraph>['size']
> = {
  '20': '14',
  '24': '18',
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

const sizeToPadding: Record<Size, CSS['padding']> = {
  '20': '0',
  '24': '0',
  '32': '$5 0',
  '64': '$5 0',
}

export function SiteHeading({
  id,
  title,
  eyebrow,
  description,
  links,
  size = '32',
  css,
  children,
}: Props) {
  return (
    <Flex
      id={id}
      direction="column"
      gap={sizeToGap[size]}
      css={{
        paddingBottom: sizeToPadding[size],
        ...css,
      }}
    >
      {eyebrow && (
        <Text
          size={sizeToEyebrow[size]}
          color="subtle"
          font="mono"
          css={{ textTransform: 'uppercase', fontWeight: 500 }}
        >
          {eyebrow}
        </Text>
      )}
      <Heading size={sizeToHeading[size]}>{title}</Heading>
      {description && (
        <Paragraph size={sizeToParagraph[size]}>{description}</Paragraph>
      )}
      <Links
        links={links}
        size={sizeToLinks[size]}
        css={{ paddingTop: size === '64' ? '$2' : '0' }}
      />
      {children}
    </Flex>
  )
}
