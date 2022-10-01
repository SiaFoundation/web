import { NextLinkButton } from '../core/Link'
import { Text } from '../core/Text'
import { Paragraph } from '../core/Paragraph'
import { Flex } from '../core/Flex'
import { CSS } from '../config/theme'
import { AnimatedPanel } from './AnimatedPanel'
import { Heading } from '../core'

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
    <AnimatedPanel startTime={startTime} css={css} variant="subtle">
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
        <Heading size="40" font="mono" css={{ fontWeight: '500' }}>
          {title}
        </Heading>
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
    </AnimatedPanel>
  )
}
