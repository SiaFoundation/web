/* eslint-disable @next/next/no-img-element */
import { getImageProps } from '@siafoundation/design-system'
import { useInView } from 'react-intersection-observer'
import { useCarousel, CarouselTags } from './Carousel'
import imageFiles from '../assets/renterd/renterd-files.png'
import imageContracts from '../assets/renterd/renterd-contracts.png'
import imageHosts from '../assets/renterd/renterd-hosts.png'
import imageConfig from '../assets/renterd/renterd-config.png'
import imageWallet from '../assets/renterd/renterd-wallet.png'
import imageNode from '../assets/renterd/renterd-node.png'
import imageSettings from '../assets/renterd/renterd-settings.png'
import { cx } from 'class-variance-authority'

const filesProps = getImageProps(imageFiles)
const contractsProps = getImageProps(imageContracts)
const hostsProps = getImageProps(imageHosts)
const configProps = getImageProps(imageConfig)
const walletProps = getImageProps(imageWallet)
const nodeProps = getImageProps(imageNode)
const settingsProps = getImageProps(imageSettings)

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
  {
    title: 'Settings',
    key: 'Settings',
    props: settingsProps,
  },
]

export function RenterdUICarousel() {
  const { ref: appRef, inView: appInView } = useInView()
  const props = useCarousel(images)

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div ref={appRef} className="absolute top-[70%]" />
        <div
          className={cx(
            'relative mx-2 xl:-mx-10 transition-transform',
            appInView ? 'scale-[1.03]' : ''
          )}
        >
          {images.map((item) => (
            <div
              key={item.key}
              className={cx(
                props.currentItem.key === item.key ? 'z-10' : 'z-0',
                props.currentItem.key === item.key
                  ? 'opacity-100'
                  : 'opacity-0',
                'top-0',
                props.currentItem.key === item.key ? 'relative' : 'absolute'
              )}
            >
              <img src={item.props.src} alt={item.title} />
            </div>
          ))}
        </div>
        <div className="relative pt-2 md:-top-6">
          <CarouselTags {...props} />
        </div>
      </div>
    </div>
  )
}
