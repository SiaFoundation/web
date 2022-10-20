import { Flex, Box, Image, getImageProps } from '@siafoundation/design-system'
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

// const animation = keyframes({
//   '0%': { transform: 'rotateX(25deg)' },
//   '25%': { transform: 'rotateX(25deg) scale(0.9)' },
//   '60%': { transform: 'rotateX(25deg) scale(0.9)' },
//   to: { transform: 'none' },
// })

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
    <Flex direction="column">
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
            // marginTop: '128px',
            // ...(appInView
            //   ? {
            //       transition: 'transform 400ms ease-out 0s',
            //       transform: 'rotateX(35deg)',
            //       animationDuration: '1400ms',
            //       animationTimingFunction: 'ease',
            //       animationIterationCount: '1',
            //       animationDirection: 'normal',
            //       animationFillMode: 'forwards',
            //       animationPlayState: 'running',
            //       animationName: animation,
            //       animationDelay: 'calc(var(--base-delay) + 400ms)',
            //     }
            //   : {}),
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
                // '&::before': {
                //   content: '',
                //   margin: '26px 39px 80px',
                //   pointerEvents: 'none',
                //   userSelect: 'none',
                //   position: 'absolute',
                //   inset: '0px',
                //   borderRadius: '$2',
                //   // padding: '1px',
                //   backgroundImage:
                //     'linear-gradient(to bottom, rgba(0,255,100, 0.3), rgba(255,255,255,0))',
                //   zIndex: -1,
                // },
                // '&::after': {
                //   content: '',
                //   position: 'absolute',
                //   margin: '26px 39px 80px',
                //   inset: '0px',
                //   zIndex: -1,
                //   opacity: 1,
                //   transition: 'opacity 480ms ease 0s',
                //   $$alpha: 0.3,
                //   backgroundImage:
                //     'radial-gradient(ellipse 50px 20px at 46% 0%,rgba(74,101,199,$$alpha),$transparent), radial-gradient(ellipse 50px 20px at 50% 0%,rgba(95,75,218,$$alpha),$transparent), radial-gradient(ellipse 50px 20px at 54% 0%,rgba(91,45,221,$$alpha),$transparent)',
                // },
              }}
            >
              <Image src={item.props.src} alt={item.title} />
              {/* <NextImage {...item.props} alt={item.title} /> */}
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
    </Flex>
  )
}
