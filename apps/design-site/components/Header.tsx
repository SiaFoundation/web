import { SunIcon } from '@radix-ui/react-icons'
import {
  AppBar,
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  useTheme,
} from '@siafoundation/design-system'

export function Header() {
  const { toggleTheme } = useTheme()

  return (
    <Box>
      <AppBar
        sticky
        glass
        css={{
          zIndex: 2,
        }}
      >
        <Container size="3">
          <Flex align="center" justify="between" css={{ height: '50px' }}>
            <Heading size="2">@siafoundation/design-system</Heading>
            <IconButton onClick={toggleTheme}>
              <SunIcon />
            </IconButton>
          </Flex>
        </Container>
      </AppBar>
      <Box css={{ height: '50px' }} />
    </Box>
  )
}
