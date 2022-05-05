import {
  Flex,
  Text,
  Box,
  ArrowUp16,
  keyframes,
  ArrowDown16,
  CSS,
} from '@siafoundation/design-system'

const jiggle = keyframes({
  '0%': { top: '0' },
  '10%': { top: '0' },
  '15%': { top: '5px' },
  '20%': { top: '0' },
  '30%': { top: '0' },
  '35%': { top: '5px' },
  '40%': { top: '0' },
  '100%': { top: '0' },
})

type Props = {
  title: string
  direction: 'up' | 'down'
  css?: CSS
}

export function JiggleArrow({ title, direction, css }: Props) {
  return (
    <Flex
      align="center"
      gap="0-5"
      css={{
        position: 'relative',
        animation: `${jiggle} 3s infinite`,
        ...css,
      }}
    >
      <Box css={{ color: '$textSubtle' }}>
        {direction === 'up' ? <ArrowUp16 /> : <ArrowDown16 />}
      </Box>
      <Text color="subtle">{title}</Text>
    </Flex>
  )
}
