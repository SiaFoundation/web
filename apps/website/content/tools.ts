type Tool = {
  name: string
  link: string
  description: string
}

export default [
  {
    name: 'Siastats',
    link: 'https://siastats.info',
    description: 'Charts, metrics, and explorer for the Sia network',
  },
  {
    name: 'Sia Central - Host Dashboard',
    link: 'https://github.com/siacentral/sia-host-dashboard',
    description: 'A powerful web based monitoring dashboard for Sia hosts',
  },
  {
    name: 'Sia Central - Host Manager',
    link: 'https://siacentral.com/host-manager',
    description:
      'User-friendly desktop app for Sia hosts. Provides easy configuration, better financials, and smart alerts to make hosting simpler.',
  },
  {
    name: 'Decentralizer',
    link: 'https://keops.cc/decentralizer',
    description:
      'Sia companion app that provides renters with more granular controls over hosts and contracts',
  },
  {
    name: 'TrySia',
    link: 'https://trysia.tech/',
    description:
      'Give Sia a spin with this Docker image that includes a fully-synced node and ready-to-use file contracts',
  },
] as Tool[]
