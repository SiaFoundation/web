import {
  Box,
  Button,
  copyToClipboard,
  Flex,
  Panel,
  Paragraph,
} from '@siafoundation/design-system'
import { useCallback } from 'react'

type Props = {
  children: React.ReactNode
  icon: React.ReactNode
  description: React.ReactNode
  seed: string
}

export function SeedLayout({ children, icon, description, seed }: Props) {
  const copySeed = useCallback(() => {
    copyToClipboard(seed, 'seed')
  }, [seed])

  return (
    <Box>
      <Panel css={{ mb: '$3' }}>
        <Flex align="center" gap="3" css={{ p: '$2 $4' }}>
          <Box>{icon}</Box>
          <Flex direction="column" gap="1">
            <Paragraph size="14">{description}</Paragraph>
            <Box>
              <Button onClick={copySeed}>Copy Seed to Clipboard</Button>
            </Box>
          </Flex>
        </Flex>
      </Panel>
      {children}
    </Box>
  )
}
