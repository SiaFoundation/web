import { webLinks } from '@siafoundation/design-system'
import { routes } from './routes'

export const menuSections = [
  {
    title: 'Overview',
    links: [
      {
        link: routes.home.index,
        title: 'Home',
      },
      {
        link: routes.getStarted.index,
        title: 'Get Started',
      },
      {
        link: routes.learn.index,
        title: 'Learn',
      },
      {
        link: webLinks.docs.index,
        title: 'Documentation',
        newTab: true,
      },
      {
        link: webLinks.apiDocs.siad,
        title: 'API Docs',
        newTab: true,
      },
      {
        link: routes.whitepaper.pdf,
        title: 'Whitepaper',
        newTab: true,
      },
      {
        link: routes.activity.index,
        title: 'Activity',
      },
    ],
  },
  {
    title: 'Software',
    links: [
      {
        link: routes.getStarted.index,
        title: 'siad',
      },
      {
        link: routes.getStarted.index,
        title: 'Sia UI',
      },
      {
        link: routes.getStarted.index,
        title: 'embarcadero',
      },
      {
        link: routes.software.renterd,
        title: 'renterd',
      },
      {
        link: routes.software.hostd,
        title: 'hostd',
      },
      {
        link: routes.getStarted.index,
        title: 'walletd',
        disabled: true,
      },
      {
        link: routes.getStarted.index,
        title: 'explorerd',
        disabled: true,
      },
    ],
  },
  {
    title: 'Foundation',
    links: [
      {
        link: routes.foundation.index,
        title: 'The Sia Foundation',
      },
      {
        link: routes.grants.index,
        title: 'Grants',
      },
      {
        link: routes.roadmap.index,
        title: 'Roadmap',
      },
      {
        link: routes.hostingBestPractices.index,
        title: 'Hosting Best Practices',
      },
      {
        link: routes.newsroom.index,
        title: 'Newsroom',
      },
      {
        link: webLinks.docs.brand,
        title: 'Brand guidelines',
        newTab: true,
      },
      {
        link: webLinks.jobs,
        title: 'Careers',
        newTab: true,
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        link: routes.community.index,
        title: 'Ecosystem',
      },
      {
        link: webLinks.discord,
        title: 'Discord',
        newTab: true,
      },
      {
        link: webLinks.reddit,
        title: 'Reddit',
        newTab: true,
      },
      {
        link: webLinks.twitter,
        title: 'Twitter',
        newTab: true,
      },
      {
        link: webLinks.github.index,
        title: 'GitHub',
        newTab: true,
      },
      {
        link: webLinks.forum,
        title: 'Forum',
        newTab: true,
      },
    ],
  },
  {
    title: 'Tools',
    links: [
      {
        link: webLinks.explore.mainnet,
        title: 'Sia Foundation Explorer',
        newTab: true,
      },
      {
        link: webLinks.siaStats,
        title: 'SiaStats Explorer',
        newTab: true,
      },
      {
        link: webLinks.storageStats,
        title: 'Sia Central Host Explorer',
        newTab: true,
      },
      {
        link: webLinks.hostTroubleshoot,
        title: 'Sia Central Host Troubleshooter',
        newTab: true,
      },
      {
        link: webLinks.explore.testnet,
        title: 'Zen Testnet Explorer',
        newTab: true,
      },
      {
        link: routes.community.index + '?software=exchanges#software',
        title: 'Get Siacoin',
      },
    ],
  },
]
