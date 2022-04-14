import { Box } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
}

export default function Italic({ children }: Props) {
  return (
    <Box as="span" css={{ fontStyle: 'italic' }}>
      {children}
    </Box>
  )
}
