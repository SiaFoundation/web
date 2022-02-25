import {
  CSS,
  Flex,
  Heading,
  NLink,
  Panel,
  Paragraph,
  Text,
} from '@siafoundation/design-system'

export type ContentCardProps = {
  title: string
  subtitle?: string
  description?: string
  tags?: string[]
  link: string
  newTab?: boolean
  size?: React.ComponentProps<typeof Heading>['size']
  css?: CSS
}

type Props = ContentCardProps

export function ContentCard({
  title,
  subtitle,
  description,
  link,
  newTab,
  css,
}: Props) {
  return (
    <Panel key={link} css={{ padding: '$4', ...css }}>
      <Flex direction="column" gap="2">
        <Heading size="1">
          {link ? (
            <NLink href={link} target={newTab ? '_blank' : undefined}>
              {title}
            </NLink>
          ) : (
            title
          )}
        </Heading>
        {link && link.startsWith('http') && (
          <Text size="1" color="subtle">
            <NLink href={link} target={newTab ? '_blank' : undefined}>
              {new URL(link).host}
            </NLink>
          </Text>
        )}
        {subtitle && <Text size="2">{subtitle}</Text>}
        {description && <Paragraph size="1">{description}</Paragraph>}
      </Flex>
    </Panel>
  )
}
