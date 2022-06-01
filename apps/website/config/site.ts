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
