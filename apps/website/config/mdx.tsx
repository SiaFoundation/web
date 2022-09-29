import {
  Heading,
  Li,
  NextLink,
  Ol,
  Paragraph,
  Ul,
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
  ol: Ol,
  ul: Ul,
  li: Li,
}
