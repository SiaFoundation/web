import { getHosts } from '@siafoundation/env'
import { getHref } from '../lib/url'

const hosts = getHosts()

export const sitemap = {
  home: {
    index: '/',
  },
  developers: {
    index: '/developers',
  },
  learn: {
    index: '/learn',
  },
  whitepaper: {
    index: '/whitepaper',
    pdf: getHref(`${hosts.app}/sia.pdf`),
  },
  community: {
    index: '/community-ecosystem',
  },
  foundation: {
    index: '/about-sia-foundation',
  },
  newsroom: {
    index: '/newsroom',
    newsPost: '/newsroom/[slug]',
    feed: {
      rss: '/rss/feed.xml',
      atom: '/rss/atom.xml',
      json: '/rss/feed.json',
    },
  },
}

export const external = {
  blog: 'https://blog.sia.tech',
  docs: {
    index: 'https://docs.sia.tech',
    sia101: 'https://docs.sia.tech/get-started-with-sia/sia101',
    renting: 'https://docs.sia.tech/renting/about-renting',
    wallet: 'https://docs.sia.tech/your-sia-wallet/wallet-overview',
    hosting: 'https://docs.sia.tech/hosting/about-hosting-on-sia',
    mining: 'https://docs.sia.tech/mining/about-mining-on-sia',
  },
  // forum: 'https://forum.sia.tech',
  github: 'https://github.com/SiaFoundation',
  discord: 'https://discord.gg/sia',
  twitter: 'https://twitter.com/sia__foundation',
  twitterHandle: '@sia__foundation',
  reddit: 'https://reddit.com/r/siacoin',
  merch: 'https://siagear.tech/',
  email: 'hello@sia.tech',
  benchmarks: 'https://benchmarks.sia.tech',
  storageStats: 'https://hosts.siacentral.com/',
  exploreStats: 'https://explore.sia.tech/',
  siaStats: 'https://siastats.info',
}
