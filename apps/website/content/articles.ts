import { ContentItem } from '../lib/types'

export function getArticles(tag: string, limit?: number) {
  return articles.filter((a) => a.tags.includes(tag)).slice(0, limit)
}

const articles: ContentItem[] = [
  {
    title: 'Launching the Sia Foundation',
    tags: ['general'],
    link: 'https://blog.sia.tech/launching-the-sia-foundation-ee47dfab4d2c',
  },
  {
    title: 'Utreexo in Sia: A Summary',
    tags: ['general'],
    link: 'https://blog.sia.tech/utreexo-for-sia-an-overview-fe14e80a7919',
  },
  {
    title: 'The Sia Ethos',
    tags: ['general'],
    link: 'https://blog.sia.tech/the-sia-ethos-48f72f1cf382',
    description: "Learn about Sia's principles and values.",
  },
  {
    title: 'Sia 101: A Visual Introduction',
    tags: ['learning'],
    link: 'https://siastats.info/sia101',
    description: 'The Sia decentralized storage network in a nutshell.',
  },
  {
    title: 'Seed-Based File Recovery',
    tags: ['learning'],
    link: 'https://blog.sia.tech/guide-seed-based-file-recovery-on-sia-e11dcdf283ea',
    description: 'Learn how to backup and restore your files on Sia.',
  },
  {
    title: 'How to mine on Sia',
    tags: ['learning'],
    link: 'https://support.sia.tech/mining/about-mining-on-sia',
  },
  {
    title: "How I built Pixeldrain, Sia's first file sharing website",
    tags: ['ecosystem'],
    link: 'https://blog.sia.tech/how-i-built-pixeldrain-sias-first-file-sharing-website-3201fd717914',
  },
  {
    title: 'Sia as NFS datastores for vSphere HA clusters using Arzen',
    tags: ['ecosystem'],
    link: 'https://blog.sia.tech/sia-as-nfs-datastores-for-vsphere-ha-clusters-using-arzen-aad477eea40e',
  },
  {
    title:
      'Introducing full-computer backup with Sia through the new Duplicati integration',
    tags: ['ecosystem'],
    link: 'https://blog.sia.tech/introducing-full-computer-backup-with-sia-through-the-new-duplicati-integration-62dd17cbcfb7',
  },
  {
    title: 'Using Sia as a Storage Back-End for Nextcloud',
    tags: ['ecosystem'],
    link: 'https://blog.sia.tech/using-sia-as-a-storage-back-end-for-nextcloud-90eab037959d',
  },
  {
    title: 'You Could Have Invented Skynet',
    tags: ['technical'],
    link: 'https://lukechampine.com/skynet.html',
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
    title: 'SC and SF',
    tags: ['technical'],
    link: 'https://blog.sia.tech/sc-and-sf-the-economics-that-power-the-sia-network-f0b8d1899348',
    description: 'The economics that power the Sia network.',
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
