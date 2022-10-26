import { Launch16 } from '../icons/carbon'
import { Box } from '../core/Box'
import { Flex } from '../core/Flex'
import { Text } from '../core/Text'
import { useIsExternalDomain } from '../hooks/useIsExternalDomain'

type Props = {
  link: string
}

export function WebDomain({ link }: Props) {
  const isExternal = useIsExternalDomain(link)
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
      {isExternal && (
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
