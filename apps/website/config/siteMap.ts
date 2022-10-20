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
        link: webLinks.apiDocs,
        title: 'Documentation',
        newTab: true,
      },
      {
        link: routes.community.index + '?software=exchanges#software',
        title: 'Get Siacoin',
      },
      {
        link: routes.whitepaper.pdf,
        title: 'Whitepaper',
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
        link: routes.getStarted.index,
        title: 'renterd',
        disabled: true,
      },
      {
        link: routes.getStarted.index,
        title: 'hostd',
        disabled: true,
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
        link: webLinks.jobs,
        title: 'Careers',
        newTab: true,
      },
      {
        link: routes.newsroom.index,
        title: 'Newsroom',
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
        link: webLinks.github,
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
    ],
  },
]
