import { Box, NImage, ScrollArea } from '@siafoundation/design-system'
import { LeftNavbar } from './LeftNavbar'
import jungle from '../../../libs/design-system/src/assets/light.png'

const frameThickness = 4

export function Layout({ children }) {
  return (
    <Box
      as="main"
      css={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        border: `${frameThickness}px solid $frame`,
        background: '$loContrast',
      }}
    >
      <ScrollArea>
        <Box
          css={{
            position: 'relative',
            flex: 2,
            '@inital': {
              marginRight: '0%',
            },
            '@bp1': {
              marginRight: '10%',
            },
            '@bp2': {
              marginRight: '30%',
            },
          }}
        >
          <LeftNavbar />
          <Box
            css={{
              position: 'relative',
              flex: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </ScrollArea>
      {/* <Box
        css={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 1,
        }}
      >
        <RightNavbar />
      </Box> */}
      <Box
        css={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
          height: '100%',
          borderLeft: `${frameThickness}px solid $frame`,
          '@inital': {
            width: '0%',
          },
          '@bp1': {
            width: '10%',
          },
          '@bp2': {
            width: '30%',
          },
        }}
      >
        <NImage {...jungle} layout="fill" radius="0" alt="Jungle" />
      </Box>
    </Box>
  )
}
