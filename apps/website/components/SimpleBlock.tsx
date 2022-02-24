import { Flex, Heading, Text } from '@siafoundation/design-system'

type Size = '1' | '2' | '3'
type GapSize = React.ComponentProps<typeof Flex>['gap']
type HeadingSize = React.ComponentProps<typeof Heading>['size']
type TextSize = React.ComponentProps<typeof Text>['size']

type Props = {
  title?: string
  subtitle?: string
  align?: React.ComponentProps<typeof Flex>['align']
  size?: Size
  children?: React.ReactNode
}

const gap: Record<Size, GapSize> = {
  '1': '2',
  '2': '3',
  '3': '5',
}

const titleSize: Record<Size, HeadingSize> = {
  '1': '1',
  '2': '2',
  '3': '3',
}

const subtitleSize: Record<Size, TextSize> = {
  '1': '2',
  '2': '3',
  '3': '3',
}

export function SimpleBlock({
  title,
  subtitle,
  size = '3',
  align,
  children,
}: Props) {
  return (
    <Flex
      direction="column"
      align={align}
      gap={gap[size]}
      css={{
        padding: `$5 0`,
      }}
    >
      {title && <Heading size={titleSize[size]}>{title}</Heading>}
      {subtitle && <Text size={subtitleSize[size]}>{subtitle}</Text>}
      {children}
    </Flex>
  )
}
