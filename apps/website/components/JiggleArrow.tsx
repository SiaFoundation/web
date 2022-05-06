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
  onClick: () => void
  direction: 'up' | 'down'
  css?: CSS
}

export function JiggleArrow({ title, direction, onClick, css }: Props) {
  return (
    <Flex
      align="center"
      gap="0-5"
      onClick={onClick}
      css={{
        position: 'relative',
        animation: `${jiggle} 3s infinite`,
        cursor: 'pointer',
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
