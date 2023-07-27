import { webLinks } from '@siafoundation/design-system'

export const routes = {
  home: {
    index: '/',
  },
  rent: {
    index: '/rent',
    coreSoftware: '/rent#core-software',
    thirdPartySoftware: '/rent#third-party-software',
    ideas: '/rent#software-ideas',
    sync: '/rent#sync',
    guides: '/rent#guides',
  },
  host: {
    index: '/host',
    coreSoftware: '/host#core-software',
    thirdPartySoftware: '/host#third-party-software',
    ideas: '/host#software-ideas',
    guides: '/host#guides',
  },
  wallet: {
    index: '/wallet',
    coreSoftware: '/wallet#core-software',
    thirdPartySoftware: '/wallet#third-party-software',
    ideas: '/wallet#software-ideas',
    guides: '/wallet#guides',
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
    process: '/grants#the-grant-process',
    ideas: '/grants#ideas',
    applicantFaq: '/grants#grant-applicant-faq',
    approvedFaq: '/grants#approved-grantee-faq',
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
    walletd: '/software/walletd',
    explored: '/software/explored',
  },
  news: {
    index: '/news',
    feed: {
      rss: '/rss/feed.xml',
      atom: '/rss/atom.xml',
      json: '/rss/feed.json',
    },
  },
  terms: {
    index: '/terms-of-service',
  },
}
