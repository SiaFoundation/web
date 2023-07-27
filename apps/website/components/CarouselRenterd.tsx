import { useCarousel, CarouselTags } from './Carousel'
import { cx } from 'class-variance-authority'
import { Image } from '@siafoundation/design-system'
import { getAssetUrl } from '../content/assets'

const images = [
  {
    title: 'Files',
    key: 'Files',
    image: getAssetUrl('assets/renterd/files.png'),
  },
  {
    title: 'Contracts',
    key: 'Contracts',
    image: getAssetUrl('assets/renterd/contracts.png'),
  },
  {
    title: 'Hosts',
    key: 'Hosts',
    image: getAssetUrl('assets/renterd/hosts.png'),
  },
  {
    title: 'Autopilot',
    key: 'Autopilot',
    image: getAssetUrl('assets/renterd/autopilot.png'),
  },
  {
    title: 'Configuration',
    key: 'Configuration',
    image: getAssetUrl('assets/renterd/config.png'),
  },
  {
    title: 'Wallet',
    key: 'Wallet',
    image: getAssetUrl('assets/renterd/wallet.png'),
  },
  {
    title: 'Node',
    key: 'Node',
    image: getAssetUrl('assets/renterd/node.png'),
  },
  {
    title: 'Preferences',
    key: 'Preferences',
    image: getAssetUrl('assets/renterd/preferences.png'),
  },
]

export function CarouselRenterd() {
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
