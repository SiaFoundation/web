import {
  WindGusts24,
  Finance24,
  Wallet24,
  Currency24,
  Industry24,
  Archive24,
  webLinks,
} from '@siafoundation/design-system'
import { addNewTab } from '../lib/utils'

export function getTutorials(limit?: number) {
  return tutorials.slice(0, limit).map(addNewTab)
}

type Tutorial = {
  title: string
  icon: React.ReactNode
  link: string
}

// tutorials should be assigned an icon
const tutorials: Tutorial[] = [
  {
    title: 'Sia 101: A Visual Introduction',
    icon: <WindGusts24 />,
    link: 'https://siastats.info/sia101',
  },
  {
    title: 'Learn how to rent storage space on the Sia network',
    icon: <Archive24 />,
    link: webLinks.docs.renting,
  },
  {
    title: 'Learn how create a wallet and make transactions on the Sia network',
    icon: <Wallet24 />,
    link: webLinks.docs.wallet,
  },
  {
    title: `Learn how to offer storage space on the Sia network's storage marketplace`,
    icon: <Currency24 />,
    link: webLinks.docs.hosting,
  },
  {
    title: 'Learn how to mine on the Sia network',
    icon: <Industry24 />,
    link: 'https://docs.sia.tech/mining/about-mining-on-sia',
  },
  {
    title: 'SC and SF - The economics that power the Sia network.',
    icon: <Finance24 />,
    link: 'https://blog.sia.tech/sc-and-sf-the-economics-that-power-the-sia-network-f0b8d1899348',
  },
]
