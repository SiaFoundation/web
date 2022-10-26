import { Flex } from '../core/Flex'
import { ScrollArea } from '../core/ScrollArea'
import { Box } from '../core/Box'

type Props = {
  children: React.ReactNode
  bleed?: boolean
}

export function DatumScrollArea({ children, bleed }: Props) {
  return (
    <Box
      css={{
        overflow: 'hidden',
        ...(bleed && {
          margin: '0 -$3-5 0 -$3-5',
          width: 'calc(100% + $3-5 * 2)',
        }),
      }}
    >
      <ScrollArea>
        <Flex
          gap="2"
          css={
            bleed
              ? { padding: '0 $3-5 0 $3-5', width: 'fit-content' }
              : undefined
          }
        >
          {children}
        </Flex>
      </ScrollArea>
    </Box>
  )
}
