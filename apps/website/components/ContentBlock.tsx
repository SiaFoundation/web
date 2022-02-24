import {
  Container,
  Flex,
  Heading,
  NLink,
  Paragraph,
  Text,
} from '@siafoundation/design-system'
import { SimpleBlock } from './SimpleBlock'

type Link = {
  title: string
  link: string
  newTab?: boolean
}

type Props = {
  title: string
  subtitle?: string
  description: string
  links?: Link[]
  align?: React.ComponentProps<typeof Flex>['align']
  size?: '1' | '2' | '3'
}

export function ContentBlock({
  title,
  subtitle,
  description,
  align = 'center',
  size = '3',
  links,
}: Props) {
  return (
    <Container size="2">
      <SimpleBlock title={title} subtitle={subtitle} size={size} align={align}>
        <Paragraph
          size="1"
          css={{ textAlign: align === 'center' ? 'center' : 'left' }}
        >
          {description}
        </Paragraph>
        {!!links?.length && (
          <Flex gap="3" wrap="wrap">
            {links.map((link) => (
              <Text key={link.link} size={size}>
                <NLink
                  href={link.link}
                  target={link.newTab ? '_blank' : undefined}
                >
                  {link.title} →
                </NLink>
              </Text>
            ))}
          </Flex>
        )}
      </SimpleBlock>
    </Container>
  )
}
