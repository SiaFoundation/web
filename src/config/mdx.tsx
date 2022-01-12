import { Heading } from '../system/Heading'
import { Link } from '../system/Link'
import { Paragraph } from '../system/Paragraph'

// Components used in mardown rendering
export const components = {
  h1: Heading,
  p: Paragraph,
  a: (props) => <Link {...props} target="_blank" />,
}
