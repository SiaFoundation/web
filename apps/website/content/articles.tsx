import {
  ContentItemProps,
  WindGusts24,
  Finance24,
  ChangeCatalog24,
  Wallet24,
  Currency24,
  Industry24,
  Pin24,
  Archive24,
  Microscope24,
  ToolsAlt24,
  UserSimulation24,
  VirtualMachine24,
  ScalesTipped24,
} from '@siafoundation/design-system'
import { external } from '../config/site'
import { addNewTab } from '../lib/utils'

export function getArticles(tags: string[], limit?: number) {
  return articles
    .filter((a) => tags.find((section) => a.tags?.includes(section)))
    .slice(0, limit)
    .map(addNewTab)
}

const articles: ContentItemProps[] = [
  {
    title: 'Sia 101: A Visual Introduction',
    tags: ['tutorial'],
    icon: <WindGusts24 />,
    link: 'https://siastats.info/sia101',
  },
  {
    title: 'Utreexo in Sia: A Summary',
    tags: ['latest'],
    date: '06/22/2021',
    icon: <Microscope24 />,
    link: 'https://blog.sia.tech/utreexo-for-sia-an-overview-fe14e80a7919',
  },
  {
    title: 'Launching the Sia Foundation',
    date: '01/12/2021',
    tags: ['latest'],
    icon: <WindGusts24 />,
    link: 'https://blog.sia.tech/launching-the-sia-foundation-ee47dfab4d2c',
  },
  {
    title: 'Learn how to rent storage space on the Sia network',
    icon: <Archive24 />,
    tags: ['tutorial'],
    link: external.docs.renting,
  },
  {
    title: 'Learn how create a wallet and make transactions on the Sia network',
    icon: <Wallet24 />,
    tags: ['tutorial'],
    link: external.docs.wallet,
  },
  {
    title: `Learn how to offer storage space on the Sia network's storage marketplace`,
    icon: <Currency24 />,
    tags: ['tutorial'],
    link: external.docs.hosting,
  },
  {
    title: 'Learn how to mine on the Sia network',
    icon: <Industry24 />,
    tags: ['tutorial'],
    link: 'https://docs.sia.tech/mining/about-mining-on-sia',
  },
  {
    title: 'Evolving Skynet Portals to Better Survive on the Centralized Web',
    date: '03/09/2022',
    icon: <ChangeCatalog24 />,
    tags: ['ecosystem'],
    link: 'https://blog.sia.tech/evolving-skynet-portals-to-better-survive-on-the-centralized-web-e08e050f15c1',
  },
  {
    title: 'Introducing support for IPFS, backed by Sia decentralized storage',
    date: '03/01/2022',
    icon: <Pin24 />,
    tags: ['ecosystem'],
    link: 'https://filebase.com/blog/introducing-support-for-ipfs-backed-by-decentralized-storage/',
  },
  {
    title: 'Sia as NFS datastores for vSphere HA clusters using Arzen',
    date: '10/19/2021',
    icon: <VirtualMachine24 />,
    tags: ['ecosystem'],
    link: 'https://blog.sia.tech/sia-as-nfs-datastores-for-vsphere-ha-clusters-using-arzen-aad477eea40e',
  },
  {
    title: "How I built Pixeldrain, Sia's first file sharing website",
    date: '09/11/2019',
    icon: <ToolsAlt24 />,
    tags: ['ecosystem'],
    link: 'https://blog.sia.tech/how-i-built-pixeldrain-sias-first-file-sharing-website-3201fd717914',
  },
  {
    title: 'You Could Have Invented Skynet',
    icon: <UserSimulation24 />,
    tags: ['latest', 'technical'],
    link: 'https://lukechampine.com/skynet.html',
  },
  {
    title: 'The Sia Ethos',
    date: '05/10/2017',
    icon: <ScalesTipped24 />,
    tags: ['latest'],
    link: 'https://blog.sia.tech/the-sia-ethos-48f72f1cf382',
  },
  {
    title: 'Verifiable Computation on Skynet using a Merklized Virtual Machine',
    tags: ['technical'],
    link: 'https://blog.sia.tech/verifiable-computation-on-skynet-using-a-merklized-virtual-machine-a4a24c7b9ec',
  },
  {
    title: 'Optimizing Payment Channels to Achieve CDN Latencies',
    tags: ['technical'],
    link: 'https://blog.sia.tech/optimizing-payment-channels-to-achieve-cdn-latencies-skyrocket-part-2-1ac6fcca58ae',
  },
  {
    title:
      'Reducing Latency 96% by Switching P2P Platform Skynet to a Multiplexer',
    tags: ['technical'],
    link: 'https://blog.sia.tech/reducing-latency-96-by-switching-p2p-platform-skynet-to-a-multiplexer-ddb4bbcf0b67',
  },
  {
    title: 'SC and SF - The economics that power the Sia network.',
    icon: <Finance24 />,
    tags: ['tutorial'],
    link: 'https://blog.sia.tech/sc-and-sf-the-economics-that-power-the-sia-network-f0b8d1899348',
  },
  {
    title: 'The Sia Alerts System: Be more informed about your cloud storage',
    tags: ['technical'],
    link: 'https://blog.sia.tech/the-sia-alerts-system-be-more-informed-about-your-cloud-storage-9d101f62fe6e',
  },
  {
    title: 'A New Kind of Sia',
    tags: ['technical'],
    link: 'https://blog.sia.tech/a-new-kind-of-sia-2e7454a9b21a',
  },
  {
    title: 'A Ransom Attack on Hardware Wallets',
    tags: ['technical'],
    link: 'https://blog.sia.tech/a-ransom-attack-on-hardware-wallets-534c075b3a92',
  },
  {
    title: 'How to use Sia Responsibly',
    tags: ['technical'],
    link: 'https://lukechampine.com/responsible.html',
  },
]
