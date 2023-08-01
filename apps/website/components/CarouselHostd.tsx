import { useCarousel, CarouselTags } from './Carousel'
import { cx } from 'class-variance-authority'
import { Image } from '@siafoundation/design-system'
import { getAssetUrl } from '../content/assets'

const images = [
  {
    title: 'Metrics',
    key: 'Metrics',
    image: getAssetUrl('assets/hostd/metrics.png'),
  },
  {
    title: 'Contracts',
    key: 'Contracts',
    image: getAssetUrl('assets/hostd/contracts.png'),
  },
  {
    title: 'Volumes',
    key: 'Volumes',
    image: getAssetUrl('assets/hostd/volumes-add.png'),
  },
  {
    title: 'Configuration',
    key: 'Configuration',
    image: getAssetUrl('assets/hostd/configuration.png'),
  },
  {
    title: 'Wallet',
    key: 'Wallet',
    image: getAssetUrl('assets/hostd/wallet.png'),
  },
  {
    title: 'Alerts',
    key: 'Alerts',
    image: getAssetUrl('assets/hostd/alerts.png'),
  },
  {
    title: 'Preferences',
    key: 'Preferences',
    image: getAssetUrl('assets/hostd/preferences.png'),
  },
]

export function CarouselHostd() {
  const props = useCarousel(images)

  return (
    <div className="flex flex-col">
      <div className="relative -mx-6 md:-mx-8 lg:-mx-10">
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
            <Image
              quality={100}
              width={256 * 5}
              height={160 * 5}
              priority={i === 0}
              src={item.image}
              alt={item.title}
            />
          </div>
        ))}
      </div>
      <div className="relative pt-6 md:-top-6">
        <CarouselTags {...props} />
      </div>
    </div>
  )
}
