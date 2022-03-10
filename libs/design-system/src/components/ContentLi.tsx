import {
  Box,
  Flex,
  Heading,
  NLink,
  Paragraph,
  Text,
  ContentItemProps,
} from '../'

type Props = ContentItemProps

export function ContentLi({
  title,
  subtitle,
  description,
  link,
  newTab,
  css,
}: Props) {
  return (
    <Box key={link} css={{ padding: '$4 0', ...css }}>
      <Flex direction="column" gap="2" css={{ position: 'relative' }}>
        <Heading size="1">
          {link ? (
            <NLink
              href={link}
              target={newTab ? '_blank' : undefined}
              variant="contrast"
            >
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
    </Box>
  )
}
