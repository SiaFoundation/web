import { Launch16 } from '../icons'
import { Box } from '../core/Box'
import { Flex } from '../core/Flex'
import { Text } from '../core/Text'

const localDomains = ['sia.tech', 'docs.sia.tech', 'blog.sia.tech']

type Props = {
  link: string
}

export function WebDomain({ link }: Props) {
  if (!link.startsWith('http')) {
    return null
  }

  const url = new URL(link)

  return (
    <Flex gap="0" align="center">
      <Text
        size="12"
        color="subtle"
        font="sans"
        css={{ textDecoration: 'none' }}
      >
        {url.host}
      </Text>
      {!localDomains.includes(url.host) && (
        <Box
          css={{
            transform: 'scale(0.75)',
            top: '1px',
            position: 'relative',
            color: '$textSubtle',
          }}
        >
          <Launch16 />
        </Box>
      )}
    </Flex>
  )
}
