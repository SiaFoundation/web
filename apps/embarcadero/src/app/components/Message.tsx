import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Alert, Box, Flex, Text } from '@siafoundation/design-system'

type Props = {
  message: string
}

export function Message({ message }: Props) {
  return (
    <Alert>
      <Flex gap="2">
        <Box css={{ color: '$hiContrast', position: 'relative', top: '4px' }}>
          <InfoCircledIcon />
        </Box>
        <Text css={{ lineHeight: '20px' }}>{message}</Text>
      </Flex>
    </Alert>
  )
}
