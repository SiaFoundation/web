import { useCarousel, CarouselTags } from './Carousel'
import imageList from '../assets/walletd/list.png'
import imageAddWallet from '../assets/walletd/add-wallet.png'
import imageSend from '../assets/walletd/send.png'
import imageGenerateAddresses from '../assets/walletd/generate-addresses.png'
import imageLocking from '../assets/walletd/locking.png'
import { cx } from 'class-variance-authority'
import { Image } from '@siafoundation/design-system'

const images = [
  {
    title: 'Multi-wallet',
    key: 'Multi-wallet',
    image: imageList,
  },
  {
    title: 'Seed, watch, & ledger',
    key: 'types',
    image: imageAddWallet,
  },
  {
    title: 'Send & receive Siacoin',
    key: 'send',
    image: imageSend,
  },
  {
    title: 'Configuration',
    key: 'Configuration',
    image: imageLocking,
  },
  {
    title: 'Generate addresses',
    key: 'generate',
    image: imageGenerateAddresses,
  },
]

export function CarouselWalletd() {
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
