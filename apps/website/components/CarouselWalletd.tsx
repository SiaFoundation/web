import { useCarousel, CarouselTags } from './Carousel'
import { cx } from 'class-variance-authority'
import { Image } from '@siafoundation/design-system'
import { getAssetUrl } from '../content/assets'

const images = [
  {
    title: 'Multi-wallet',
    key: 'Multi-wallet',
    image: getAssetUrl('assets/walletd/list.png'),
  },
  {
    title: 'Seed, watch, & ledger',
    key: 'types',
    image: getAssetUrl('assets/walletd/add-wallet.png'),
  },
  {
    title: 'Send & receive Siacoin',
    key: 'send',
    image: getAssetUrl('assets/walletd/send.png'),
  },
  {
    title: 'Configuration',
    key: 'Configuration',
    image: getAssetUrl('assets/walletd/locking.png'),
  },
  {
    title: 'Generate addresses',
    key: 'generate',
    image: getAssetUrl('assets/walletd/generate-addresses.png'),
  },
]

export function CarouselWalletd() {
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
