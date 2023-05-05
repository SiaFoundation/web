import { webLinks } from '@siafoundation/design-system'

export const routes = {
  home: {
    index: '/',
  },
  getStarted: {
    index: '/get-started',
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
  grants: {
    index: '/grants',
  },
  roadmap: {
    index: '/roadmap',
  },
  activity: {
    index: '/activity',
  },
  hostingBestPractices: {
    index: '/hosting-best-practices',
  },
  software: {
    renterd: '/software/renterd',
    hostd: '/software/hostd',
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
