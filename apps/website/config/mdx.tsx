import { DotIcon } from '@radix-ui/react-icons'
import {
  Flex,
  Heading,
  NLink,
  Paragraph,
  Text,
} from '@siafoundation/design-system'

// Components used in mardown rendering
export const components = {
  h1: ({ children }) => <Heading size="2">{children}</Heading>,
  h2: ({ children }) => <Heading size="1">{children}</Heading>,
  h3: ({ children }) => <Heading size="1">{children}</Heading>,
  p: ({ children }) => (
    <Paragraph css={{ marginBottom: '$3' }}>{children}</Paragraph>
  ),
  a: (props) => <NLink {...props} target="_blank" />,
  ul: ({ children }) => (
    <Flex as="ul" direction="column" gap={2}>
      {children}
    </Flex>
  ),
  li: ({ children }) => (
    <Flex as="li" align="center" gap="1" css={{ lineHeight: '24px' }}>
      <DotIcon />
      <Text>{children}</Text>
    </Flex>
  ),
}
