/* eslint-disable @next/next/no-img-element */
import { getImageProps } from '@siafoundation/design-system'
import { useCarousel, CarouselTags } from './Carousel'
import imageMetrics from '../assets/hostd/metrics.png'
import imageContracts from '../assets/hostd/contracts.png'
import imageVolumes from '../assets/hostd/volumes.png'
import imageConfig from '../assets/hostd/config.png'
import imageSettings from '../assets/hostd/settings.png'
import imageWallet from '../assets/hostd/wallet.png'
import { cx } from 'class-variance-authority'

const metricsProps = getImageProps(imageMetrics)
const contractsProps = getImageProps(imageContracts)
const volumesProps = getImageProps(imageVolumes)
const configProps = getImageProps(imageConfig)
const walletProps = getImageProps(imageWallet)
const settingsProps = getImageProps(imageSettings)

const images = [
  {
    title: 'Metrics',
    key: 'Metrics',
    props: metricsProps,
  },
  {
    title: 'Contracts',
    key: 'Contracts',
    props: contractsProps,
  },
  {
    title: 'Volumes',
    key: 'Volumes',
    props: volumesProps,
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
    title: 'Settings',
    key: 'Settings',
    props: settingsProps,
  },
]

export function HostdUICarousel() {
  const props = useCarousel(images)

  return (
    <div className="flex flex-col">
      <div className="relative lg:mx-2 xl:-mx-8">
        {images.map((item) => (
          <div
            key={item.key}
            className={cx(
              props.currentItem.key === item.key ? 'z-10' : 'z-0',
              props.currentItem.key === item.key ? 'opacity-100' : 'opacity-0',
              'top-0',
              props.currentItem.key === item.key ? 'relative' : 'absolute'
            )}
          >
            <img src={item.props.src} alt={item.title} />
          </div>
        ))}
      </div>
      <div className="relative pt-6 md:-top-6">
        <CarouselTags {...props} />
      </div>
    </div>
  )
}
