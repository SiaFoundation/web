import { useCarousel, CarouselTags } from './Carousel'
import imageFiles from '../assets/renterd/files.png'
import imageContracts from '../assets/renterd/contracts.png'
import imageHosts from '../assets/renterd/hosts.png'
import imageAutopilot from '../assets/renterd/autopilot.png'
import imageConfig from '../assets/renterd/config.png'
import imageWallet from '../assets/renterd/wallet.png'
import imageNode from '../assets/renterd/node.png'
import imagePreferences from '../assets/renterd/preferences.png'
import { cx } from 'class-variance-authority'
import { Image } from '@siafoundation/design-system'

const images = [
  {
    title: 'Files',
    key: 'Files',
    image: imageFiles,
  },
  {
    title: 'Contracts',
    key: 'Contracts',
    image: imageContracts,
  },
  {
    title: 'Hosts',
    key: 'Hosts',
    image: imageHosts,
  },
  {
    title: 'Autopilot',
    key: 'Autopilot',
    image: imageAutopilot,
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
    title: 'Node',
    key: 'Node',
    image: imageNode,
  },
  {
    title: 'Preferences',
    key: 'Preferences',
    image: imagePreferences,
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
