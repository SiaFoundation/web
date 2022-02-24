import {
  CSS,
  Flex,
  Grid,
  Heading,
  NLink,
  Panel,
  Paragraph,
  Text,
} from '@siafoundation/design-system'

export type Item = {
  title: string
  subtitle?: string
  description?: string
  link: string
  newTab?: boolean
  size?: React.ComponentProps<typeof Heading>['size']
  css?: CSS
}

type Props = Item

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
          <NLink href={link} target={newTab ? '_blank' : undefined}>
            {title}
          </NLink>
        </Heading>
        {subtitle && <Text size="2">{subtitle}</Text>}
        {description && <Paragraph size="1">{description}</Paragraph>}
      </Flex>
    </Panel>
  )
}
