import { Heading, NLink, Paragraph } from '@siafoundation/design-system'

// Components used in mardown rendering
export const components = {
  h1: Heading,
  p: Paragraph,
  a: (props) => <NLink {...props} target="_blank" />,
}
