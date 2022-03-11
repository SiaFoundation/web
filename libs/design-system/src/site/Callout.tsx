import {
  LocalBackdrop,
  Box,
  Flex,
  Heading,
  NextLinkButton,
  Panel,
  Paragraph,
  Text,
} from '..'
import { CSS } from '../config/theme'

type Props = {
  eyebrow?: string
  title: string
  description: React.ReactNode
  actionTitle: string
  actionLink: string
  actionNewTab?: boolean
  size?: '1' | '2'
  css?: CSS
}

export function Callout({
  eyebrow,
  title,
  description,
  actionTitle,
  actionLink,
  actionNewTab,
  size = '1',
  css,
}: Props) {
  return (
    <Panel
      css={{
        position: 'relative',
        background: 'none',
        border: '2px solid $frame',
        // maxWidth: size === '1' ? '300px' : 'inherit',
        ...css,
      }}
    >
      <Box
        css={{
          zIndex: 0,
          overflow: 'hidden',
          position: 'absolute',
          borderRadius: '$2',
          width: '100%',
          height: '100%',
        }}
      >
        <LocalBackdrop />
      </Box>
      <Flex
        direction="column"
        align="start"
        justify="end"
        gap="3"
        css={{
          position: 'relative',
          height: '100%',
          padding: size === '2' ? '$13 $8' : '$13 $5 $6 $5',
        }}
      >
        {eyebrow && (
          <Text size="1" color="subtle" css={{ textTransform: 'uppercase' }}>
            {eyebrow}
          </Text>
        )}
        <Text size="5" font="mono">
          {title}
        </Text>
        <Paragraph>{description}</Paragraph>
        <NextLinkButton
          size="2"
          variant="accent"
          href={actionLink}
          css={{ display: 'inline' }}
          target={actionNewTab ? '_blank' : undefined}
        >
          {actionTitle}
        </NextLinkButton>
      </Flex>
    </Panel>
  )
}
