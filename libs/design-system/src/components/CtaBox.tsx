import {
  LocalBackdrop,
  Box,
  Flex,
  Heading,
  NLinkButton,
  Panel,
  Paragraph,
  Text,
} from '../'

type Props = {
  slogan?: string
  title: string
  description: string
  actionTitle: string
  actionLink: string
  actionNewTab?: boolean
  size?: '1' | '2'
}

export function CtaBox({
  slogan,
  title,
  description,
  actionTitle,
  actionLink,
  actionNewTab,
  size = '1',
}: Props) {
  return (
    <Panel
      css={{
        position: 'relative',
        background: 'none',
        border: '2px solid $frame',
        maxWidth: size === '1' ? '300px' : 'inherit',
      }}
    >
      <Box
        css={{
          zIndex: 0,
          overflow: 'hidden',
          position: 'absolute',
          // borderRadius: '$2',
          width: '100%',
          height: '100%',
        }}
      >
        <LocalBackdrop />
      </Box>
      <Flex
        direction="column"
        align="start"
        gap="3"
        css={{
          position: 'relative',
          padding: size === '2' ? '$8 $8' : '$8 $5',
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
          size="2"
          variant="green"
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
