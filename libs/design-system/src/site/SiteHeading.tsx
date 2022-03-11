import { Flex, Heading, Paragraph, Text } from '..'
import { CSS } from '../config/theme'
import { Links } from './Links'

type Link = {
  title: string
  link: string
  newTab?: boolean
}

type Size = '1' | '2' | '3'

type Props = {
  id?: string
  size?: Size
  eyebrow?: string
  title: string
  description?: React.ReactNode
  links?: Link[]
  css?: CSS
}

const sizeToGap: Record<Size, React.ComponentProps<typeof Flex>['gap']> = {
  '1': '2',
  '2': '2',
  '3': '3',
}

const sizeToHeading: Record<
  Size,
  React.ComponentProps<typeof Heading>['size']
> = {
  '1': '1',
  '2': '2',
  '3': '3',
}

const sizeToParagraph: Record<
  Size,
  React.ComponentProps<typeof Paragraph>['size']
> = {
  '1': '1',
  '2': '2',
  '3': '3',
}

const sizeToLinks: Record<Size, React.ComponentProps<typeof Links>['size']> = {
  '1': '1',
  '2': '1',
  '3': '2',
}

const sizeToText: Record<Size, React.ComponentProps<typeof Text>['size']> = {
  '1': '0',
  '2': '0',
  '3': '1',
}

const sizeToPadding: Record<Size, CSS['padding']> = {
  '1': '0',
  '2': '$5 0',
  '3': '$5 0',
}

export function SiteHeading({
  id,
  title,
  eyebrow,
  description,
  links,
  size = '2',
  css,
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
          size={sizeToText[size]}
          color="subtle"
          css={{ textTransform: 'uppercase', fontWeight: 500 }}
        >
          {eyebrow}
        </Text>
      )}
      <Heading size={sizeToHeading[size]}>{title}</Heading>
      {description && (
        <Paragraph size={sizeToParagraph[size]}>{description}</Paragraph>
      )}
      <Links links={links} size={sizeToLinks[size]} />
    </Flex>
  )
}
