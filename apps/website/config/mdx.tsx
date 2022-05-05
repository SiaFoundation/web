import { DotIcon } from '@radix-ui/react-icons'
import {
  Flex,
  Heading,
  NextLink,
  Paragraph,
  Text,
} from '@siafoundation/design-system'

// Components used in mardown rendering
export const components = {
  h1: ({ children }) => (
    <Heading size="64" css={{ display: 'block', margin: '$4 0' }}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading size="32" css={{ display: 'block', margin: '$4 0' }}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading size="24" css={{ display: 'block', margin: '$4 0' }}>
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Paragraph css={{ display: 'block', margin: '$2 0' }}>{children}</Paragraph>
  ),
  a: (props) => <NextLink {...props} target="_blank" />,
  ul: ({ children }) => (
    <Flex as="ul" direction="column" gap={2}>
      {children}
    </Flex>
  ),
  li: ({ children }) => (
    <Flex as="li" align="center" gap="1" css={{ lineHeight: '24px' }}>
      <Flex>
        <DotIcon />
      </Flex>
      <Text>{children}</Text>
    </Flex>
  ),
}
