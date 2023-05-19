import { useCarousel, CarouselTags } from './Carousel'
import imageMetrics from '../assets/hostd/metrics.png'
import imageContracts from '../assets/hostd/contracts.png'
import imageVolumes from '../assets/hostd/volumes-add.png'
import imageConfig from '../assets/hostd/config.png'
import imagePreferences from '../assets/hostd/preferences.png'
import imageAlerts from '../assets/hostd/alerts.png'
import imageWallet from '../assets/hostd/wallet.png'
import { cx } from 'class-variance-authority'
import { Image } from '@siafoundation/design-system'

const images = [
  {
    title: 'Metrics',
    key: 'Metrics',
    image: imageMetrics,
  },
  {
    title: 'Contracts',
    key: 'Contracts',
    image: imageContracts,
  },
  {
    title: 'Volumes',
    key: 'Volumes',
    image: imageVolumes,
  },
  {
    title: 'Configuration',
    key: 'Configuration',
    image: imageConfig,
  },
  {
    title: 'Wallet',
    key: 'Wallet',
    image: imageWallet,
  },
  {
    title: 'Alerts',
    key: 'Alerts',
    image: imageAlerts,
  },
  {
    title: 'Preferences',
    key: 'Preferences',
    image: imagePreferences,
  },
]

export function CarouselHostd() {
  const props = useCarousel(images)

  return (
    <div className="flex flex-col">
      <div className="relative lg:mx-2 xl:-mx-10">
        {images.map((item, i) => (
          <div
            key={item.key}
            className={cx(
              props.currentItem.key === item.key ? 'z-10' : 'z-0',
              props.currentItem.key === item.key ? 'opacity-100' : 'opacity-0',
              'top-0',
              props.currentItem.key === item.key ? 'relative' : 'absolute'
            )}
          >
            <Image priority={i === 0} src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
      <div className="relative pt-6 md:-top-6">
        <CarouselTags {...props} />
      </div>
    </div>
  )
}
