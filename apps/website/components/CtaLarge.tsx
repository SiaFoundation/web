import {
  Flex,
  Heading,
  NLinkButton,
  Panel,
  Paragraph,
  Text,
} from '@siafoundation/design-system'

type Props = {
  slogan?: string
  title: string
  description: string
  actionTitle: string
  actionLink: string
  actionNewTab?: boolean
}

export function CtaLarge({
  slogan,
  title,
  description,
  actionTitle,
  actionLink,
  actionNewTab,
}: Props) {
  return (
    <Panel>
      <Flex
        direction="column"
        align="start"
        gap="3"
        css={{
          padding: '$8 $3',
        }}
      >
        {slogan && (
          <Text color="subtle" css={{ textTransform: 'uppercase' }}>
            {slogan}
          </Text>
        )}
        <Heading size="3">{title}</Heading>
        <Paragraph>{description}</Paragraph>
        <NLinkButton
          href={actionLink}
          css={{ display: 'inline' }}
          target={actionNewTab ? '_blank' : undefined}
        >
          {actionTitle}
        </NLinkButton>
      </Flex>
    </Panel>
  )
}
