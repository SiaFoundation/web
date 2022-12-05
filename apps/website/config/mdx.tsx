import {
  Heading,
  Li,
  Link,
  Ol,
  Paragraph,
  Ul,
} from '@siafoundation/design-system'

// Components used in mardown rendering
export const components = {
  h1: ({ children }) => (
    <Heading size="64" className="block pb-5 pt-10">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading size="32" className="block pb-5 pt-10">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading size="24" className="block pb-5 pt-10">
      {children}
    </Heading>
  ),
  p: ({ children }) => <Paragraph className="block py-4">{children}</Paragraph>,
  a: (props) => <Link {...props} target="_blank" />,
  ol: Ol,
  ul: Ul,
  li: Li,
}
