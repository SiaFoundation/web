import { webLinks } from '@siafoundation/design-system'

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
    pdf: `${webLinks.website}/sia.pdf`,
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
