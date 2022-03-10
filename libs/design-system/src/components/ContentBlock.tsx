import { Box, Flex, Heading, NLink, Paragraph, Text } from '../'
import { NLinkButton } from '../primitives/Link'

type Link = {
  title: string
  link: string
  newTab?: boolean
}

type Size = '1' | '2' | '3'
type GapSize = React.ComponentProps<typeof Flex>['gap']
type HeadingSize = React.ComponentProps<typeof Heading>['size']
type TextSize = React.ComponentProps<typeof Text>['size']
type ParagraphSize = React.ComponentProps<typeof Paragraph>['size']

type Props = {
  title: string
  icon?: React.ReactNode
  subtitle?: string
  description?: string
  links?: Link[]
  align?: React.ComponentProps<typeof Flex>['align']
  size?: Size
  children?: React.ReactNode
}

export function ContentBlock({
  title,
  icon,
  subtitle,
  description,
  children,
  align = 'start',
  size = '2',
  links,
}: Props) {
  return (
    <Flex gap="2" align="center">
      {icon && <Box>{icon}</Box>}
      <Flex
        direction="column"
        align={align}
        gap={gap[size]}
        css={{
          padding: `$5 0`,
        }}
      >
        <Heading size={titleSize[size]} css={{ fontWeight: '600' }}>
          {title}
        </Heading>
        {subtitle && <Text size={subtitleSize[size]}>{subtitle}</Text>}
        {description && (
          <Paragraph
            size={descriptionSize[size]}
            css={{ textAlign: align === 'center' ? 'center' : 'left' }}
          >
            {description}
          </Paragraph>
        )}
        {!!links?.length && (
          <Flex gap="3" wrap="wrap">
            {links.map((link) =>
              size === '3' ? (
                <NLinkButton
                  variant="green"
                  size="2"
                  href={link.link}
                  target={link.newTab ? '_blank' : undefined}
                >
                  {link.title} →
                </NLinkButton>
              ) : (
                <NLink
                  variant="contrast"
                  href={link.link}
                  target={link.newTab ? '_blank' : undefined}
                >
                  {link.title} →
                </NLink>
              )
            )}
          </Flex>
        )}
        {children}
      </Flex>
    </Flex>
  )
}

const gap: Record<Size, GapSize> = {
  '1': '2',
  '2': '5',
  '3': '5',
}

const titleSize: Record<Size, HeadingSize> = {
  '1': '1',
  '2': '3',
  '3': '4',
}

const subtitleSize: Record<Size, TextSize> = {
  '1': '2',
  '2': '3',
  '3': '3',
}

const descriptionSize: Record<Size, ParagraphSize> = {
  '1': '2',
  '2': '2',
  '3': '3',
}
