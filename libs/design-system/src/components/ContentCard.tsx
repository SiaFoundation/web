import {
  LocalBackdrop,
  Box,
  CSS,
  Flex,
  Heading,
  NLink,
  Panel,
  Paragraph,
  Text,
} from '../'

export type ContentItemProps = {
  title: string
  subtitle?: string
  description?: string
  tags?: string[]
  link: string
  newTab?: boolean
  size?: React.ComponentProps<typeof Heading>['size']
  css?: CSS
}

type Props = ContentItemProps

export function ContentCard({
  title,
  subtitle,
  description,
  link,
  newTab,
  css,
}: Props) {
  return (
    <Panel key={link} css={{ position: 'relative', padding: '$4', ...css }}>
      <Box
        css={{
          zIndex: 0,
          overflow: 'hidden',
          position: 'absolute',
          borderRadius: '$2',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        <LocalBackdrop />
      </Box>
      <Flex direction="column" gap="2" css={{ position: 'relative' }}>
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
          <NLink
            href={link}
            target={newTab ? '_blank' : undefined}
            variant="subtle"
          >
            {new URL(link).host}
          </NLink>
        )}
        {subtitle && <Text size="2">{subtitle}</Text>}
        {description && <Paragraph size="1">{description}</Paragraph>}
      </Flex>
    </Panel>
  )
}
