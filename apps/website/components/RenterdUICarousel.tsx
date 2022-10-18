import { Box, NextImage, getImageProps } from '@siafoundation/design-system'
import { useInView } from 'react-intersection-observer'
import { useCarousel, CarouselTags } from './Carousel'
import imageFiles from '../assets/renterd/renterd-files.png'
import imageContracts from '../assets/renterd/renterd-contracts.png'
import imageHosts from '../assets/renterd/renterd-hosts.png'
import imageConfig from '../assets/renterd/renterd-config.png'
import imageWallet from '../assets/renterd/renterd-wallet.png'
import imageNode from '../assets/renterd/renterd-node.png'

const filesProps = getImageProps(imageFiles)
const contractsProps = getImageProps(imageContracts)
const hostsProps = getImageProps(imageHosts)
const configProps = getImageProps(imageConfig)
const walletProps = getImageProps(imageWallet)
const nodeProps = getImageProps(imageNode)

const images = [
  {
    title: 'Files',
    key: 'Files',
    props: filesProps,
  },
  {
    title: 'Contracts',
    key: 'Contracts',
    props: contractsProps,
  },
  {
    title: 'Hosts',
    key: 'Hosts',
    props: hostsProps,
  },
  {
    title: 'Configuration',
    key: 'Configuration',
    props: configProps,
  },
  {
    title: 'Wallet',
    key: 'Wallet',
    props: walletProps,
  },
  {
    title: 'Node',
    key: 'Node',
    props: nodeProps,
  },
]

export function RenterdUICarousel() {
  const { ref: appRef, inView: appInView } = useInView()
  const props = useCarousel(images)

  return (
    <>
      <Box
        css={{
          position: 'relative',
          margin: '0 -$3',
          '@bp2': {
            margin: '0 -$6',
          },
        }}
      >
        <Box
          ref={appRef}
          css={{
            position: 'relative',
            transition: 'transform 200ms ease-out',
            top: appInView ? '0px' : '80px',
            padding: '0 $1',
            transform: appInView ? 'scale(1.03)' : 'none',
          }}
        >
          {images.map((item) => (
            <Box
              key={item.key}
              css={{
                zIndex: props.currentItem.key === item.key ? 1 : 0,
                opacity: props.currentItem.key === item.key ? 1 : 0,
                top: 0,
                position:
                  props.currentItem.key === item.key ? 'relative' : 'absolute',
              }}
            >
              <NextImage key={item.key} {...item.props} alt={item.title} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        css={{
          position: 'relative',
          top: '-$1',
          pb: '$5',
          '@bp2': {
            top: '-$3',
          },
        }}
      >
        <CarouselTags {...props} />
      </Box>
    </>
  )
}
