import { Heading, Link, Paragraph } from '@siafoundation/design-system'

// Components used in mardown rendering
export const components = {
  h1: Heading,
  p: Paragraph,
  a: (props) => <Link {...props} target="_blank" />,
}
