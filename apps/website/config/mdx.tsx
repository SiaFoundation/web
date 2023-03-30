import {
  Code,
  Li,
  Link,
  Ol,
  Paragraph,
  SectionHeading,
  Ul,
} from '@siafoundation/design-system'

// Components used in mardown rendering
export const components = {
  h1: ({ children }) => (
    <SectionHeading size="40" className="pb-6 pt-20">
      {children}
    </SectionHeading>
  ),
  h2: ({ children }) => (
    <SectionHeading size="24" className="pb-3 pt-12">
      {children}
    </SectionHeading>
  ),
  h3: ({ children }) => (
    <SectionHeading size="20" className="pb-3 pt-10">
      {children}
    </SectionHeading>
  ),
  p: ({ children }) => (
    <Paragraph size="16" className="block py-2">
      {children}
    </Paragraph>
  ),
  a: (props) => <Link {...props} target="_blank" />,
  code: (props) => <Code {...props} />,
  ol: Ol,
  ul: Ul,
  li: Li,
}
