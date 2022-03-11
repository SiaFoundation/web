import { ContentItemProps } from '@siafoundation/design-system'

export function getSoftware(tag: string | null, limit?: number) {
  return software.filter((a) => !tag || a.tags.includes(tag)).slice(0, limit)
}

type Software = ContentItemProps & {
  logo: string
}

const software: Software[] = [
  {
    title: 'Skynet',
    link: 'https://skynetlabs.com',
    logo: 'skynet',
    tags: ['storage_services'],
    subtitle: 'Decentralized CDN and file sharing platform for developers.',
  },
  {
    title: 'PixelDrain',
    link: 'https://pixeldrain.com',
    logo: 'pixeldrain',
    tags: ['storage_services'],
    subtitle: 'File sharing site that uses Sia the network.',
  },
  {
    title: 'Filebase',
    link: 'https://filebase.com',
    logo: 'filebase',
    tags: ['storage_services'],
    subtitle:
      'S3-compatible object storage powered by blockchain and the Sia network.',
  },
  {
    title: 'Vup',
    link: 'https://vup.app',
    logo: 'vup',
    tags: ['storage_services', 'open_source_software'],
    subtitle:
      'Private and decentralized cloud storage app with encrypted file sharing and media streaming support.',
  },
  {
    title: 'Arzen',
    link: 'https://arzen.tech',
    logo: 'arzen',
    tags: ['storage_services'],
    subtitle:
      'Customizable secure multi-cloud in France. End-to-end encryption. Very high availability. No commitment.',
  },
  {
    title: 'Siastats',
    link: 'https://siastats.info',
    logo: 'siastats',
    tags: ['open_source_software', 'network_stats'],
    subtitle: 'Charts, metrics, and explorer for the Sia network.',
  },
  {
    title: 'CoinMarketCap',
    logo: 'coinmarketcap',
    link: 'https://coinmarketcap.com/currencies/siacoin/',
    tags: ['network_stats'],
    subtitle: 'Basic information and financial charts for the Sia network.',
  },
  {
    title: 'Sia Central - Host Dashboard',
    logo: 'siacentral',
    link: 'https://github.com/siacentral/sia-host-dashboard',
    tags: ['open_source_software'],
    subtitle: 'A powerful web based monitoring dashboard for Sia hosts.',
  },
  {
    title: 'Sia Central - Host Manager',
    logo: 'siacentral',
    link: 'https://siacentral.com/host-manager',
    tags: ['open_source_software'],
    subtitle:
      'User-friendly desktop app for Sia hosts. Provides easy configuration, better financials, and smart alerts to make hosting simpler.',
  },
  {
    title: 'Decentralizer',
    logo: 'keops',
    link: 'https://keops.cc/decentralizer',
    tags: ['open_source_software'],
    subtitle:
      'Sia companion app that provides renters with more granular controls over hosts and contracts.',
  },
  {
    title: 'TrySia',
    logo: 'trysia',
    link: 'https://trysia.tech/',
    tags: ['open_source_software'],
    subtitle:
      'Give Sia a spin with this Docker image that includes a fully-synced node and ready-to-use file contracts.',
  },
  {
    title: 'Luxor',
    logo: 'luxor',
    link: 'https://mining.luxor.tech/coins/siacoin',
    tags: ['mining_pools'],
    subtitle: 'Mining pool for Siacoin.',
  },
  {
    title: 'SiaMining',
    logo: 'siamining',
    link: 'https://siamining.com/',
    tags: ['mining_pools'],
    subtitle: 'The first and largest mining pool for Siacoin.',
  },
  {
    title: 'DxPool',
    logo: 'dxpool',
    link: 'https://www.dxpool.com/pool/sc/info',
    tags: ['mining_pools'],
    subtitle: 'Leading blockchain infrastructure service provider.',
  },
  {
    title: 'f2pool',
    logo: 'f2pool',
    link: 'https://www.f2pool.com/coin/siacoin?lang=en_US',
    tags: ['mining_pools'],
    subtitle: 'Popular crypto mining pool provider.',
  },
  {
    title: 'Binance',
    logo: 'binance',
    link: 'https://www.binance.com/en/trade/SC_BTC',
    tags: ['exchanges'],
    subtitle: 'Based in Malta, Binance is a popular crypto-to-crypto exchange.',
  },
  {
    title: 'Bittrex',
    logo: 'bittrex',
    link: 'https://bittrex.com/Market/Index?MarketName=btc-SC',
    tags: ['exchanges'],
    subtitle:
      'Based in the USA, Bittrex is a popular crypto-to-crypto exchange that is currently rolling out USD deposits.',
  },
  {
    title: 'Kraken',
    logo: 'kraken',
    link: 'https://www.kraken.com/prices/sc-siacoin-price-chart/usd-us-dollar?interval=1m',
    tags: ['exchanges'],
    subtitle:
      'Based in the USA, Kraken is one of the largest and oldest Bitcoin exchanges in the world.',
  },
  {
    title: 'Shapeshift',
    logo: 'shapeshift',
    link: 'https://shapeshift.com/',
    tags: ['exchanges'],
    subtitle:
      'Shapeshift enables users to quickly exchange small amounts of cryptocurrency. Most user-friendly.',
  },
  {
    title: 'Poloniex',
    logo: 'poloniex',
    link: 'https://poloniex.com/exchange/BTC_SC',
    tags: ['exchanges'],
    subtitle:
      'Based in the USA and recently acquired by Circle, Poloniex is a popular crypto-to-crypto exchange.',
  },
  {
    title: 'Crypto.com',
    logo: 'cryptocom',
    link: 'https://crypto.com/app',
    tags: ['exchanges'],
    subtitle:
      'Crypto.com is a popular crypto-to-crypto exchange. It is a trusted and secure platform for users to trade top cryptocurrencies with the lowest fees in the industry.',
  },
  {
    title: 'Upbit',
    logo: 'upbit',
    link: 'https://upbit.com/home',
    tags: ['exchanges'],
    subtitle:
      'Based in South Korea and partnered with Bittrex, Upbit is a popular crypto-to-crypto exchange.',
  },
  {
    title: 'SevenB',
    logo: 'sevenb',
    link: 'https://sevenb.io/currencies/siacoin',
    tags: ['exchanges'],
    subtitle: 'A simple & straightforward crypto broker, powered by Binance.',
  },
]
