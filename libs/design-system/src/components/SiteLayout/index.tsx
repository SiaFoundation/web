import { LeftNavbar } from './LeftNavbar'
import image from '../../assets/light.png'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'
import { NImage } from '../../primitives/Image'

const frameThickness = 4

// The image imports have different behaviour when the consuming is app is CRA vs Next
// CRA returns a URL string whereas Next returns an object with multiple image attributes.
const imageProps = typeof image === 'string' ? { src: image } : image

type Props = {
  title?: string
  header?: boolean
  children: React.ReactNode
}

export function SiteLayout({ title, header, children }: Props) {
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
          {header && <LeftNavbar title={title} />}
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
          '@inital': {
            width: '0%',
          },
          '@bp1': {
            width: '10%',
            borderLeft: `${frameThickness}px solid $frame`,
          },
          '@bp2': {
            width: '30%',
          },
        }}
      >
        <NImage {...imageProps} layout="fill" radius="0" alt="Jungle" />
      </Box>
    </Box>
  )
}
