import {
  LocalBackdrop,
  Box,
  Flex,
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
  startTime?: number
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
  startTime,
  size = '1',
  css,
}: Props) {
  return (
    <Panel
      radius="0"
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
        <LocalBackdrop startTime={startTime} />
      </Box>
      <Flex
        direction="column"
        align="start"
        justify="end"
        gap="2"
        css={{
          position: 'relative',
          height: '100%',
          padding: size === '2' ? '$max $3' : '$max $3 $4 $3',
          '@bp3': {
            padding: size === '2' ? '$max $9' : '$max $3 $4 $3',
          },
        }}
      >
        {eyebrow && (
          <Text
            size="14"
            color="subtle"
            font="mono"
            css={{ textTransform: 'uppercase' }}
          >
            {eyebrow}
          </Text>
        )}
        <Text size="40" font="mono">
          {title}
        </Text>
        <Paragraph>{description}</Paragraph>
        <NextLinkButton
          size="2"
          variant="accent"
          site
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
