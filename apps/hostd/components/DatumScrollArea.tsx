import { Flex, ScrollArea, Box } from '@siafoundation/design-system'

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
          css={bleed && { padding: '0 $3-5 0 $3-5', width: 'fit-content' }}
        >
          {children}
        </Flex>
      </ScrollArea>
    </Box>
  )
}
