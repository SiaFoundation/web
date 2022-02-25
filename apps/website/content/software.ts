import { ContentItem } from '../lib/types'

export function getSoftware(tag: string | null, limit?: number) {
  return software.filter((a) => !tag || a.tags.includes(tag)).slice(0, limit)
}

const software: ContentItem[] = [
  {
    title: 'Skynet',
    link: 'https://skynetlabs.com',
    tags: ['storage_services'],
    description:
      'The decentralized CDN and file sharing platform for devs. Skynet is the storage foundation for a Free Internet!',
  },
  {
    title: 'Filebase',
    link: 'https://filebase.com',
    tags: ['storage_services'],
    description:
      'S3-compatible object storage powered by blockchain and the Sia network.',
  },
  {
    title: 'PixelDrain',
    link: 'https://pixeldrain.com',
    tags: ['storage_services'],
    description: 'File sharing site that uses Sia the network.',
  },
  {
    title: 'Vup',
    link: 'https://vup.app',
    tags: ['storage_services', 'open_source_software'],
    description:
      'Private and decentralized cloud storage app with encrypted file sharing and media streaming support.',
  },
  {
    title: 'Arzen',
    link: 'https://arzen.tech',
    tags: ['storage_services'],
    description:
      'Customizable secure multi-cloud in France. End-to-end encryption. Very high availability. No commitment.',
  },
  {
    title: 'Siastats',
    link: 'https://siastats.info',
    tags: ['open_source_software', 'network_stats'],
    description: 'Charts, metrics, and explorer for the Sia network.',
  },
  {
    title: 'CoinMarketCap',
    link: 'https://coinmarketcap.com/currencies/siacoin/',
    tags: ['network_stats'],
    description: 'Basic information and financial charts for the Sia network.',
  },
  {
    title: 'Sia Central - Host Dashboard',
    link: 'https://github.com/siacentral/sia-host-dashboard',
    tags: ['open_source_software'],
    description: 'A powerful web based monitoring dashboard for Sia hosts.',
  },
  {
    title: 'Sia Central - Host Manager',
    link: 'https://siacentral.com/host-manager',
    tags: ['open_source_software'],
    description:
      'User-friendly desktop app for Sia hosts. Provides easy configuration, better financials, and smart alerts to make hosting simpler.',
  },
  {
    title: 'Decentralizer',
    link: 'https://keops.cc/decentralizer',
    tags: ['open_source_software'],
    description:
      'Sia companion app that provides renters with more granular controls over hosts and contracts.',
  },
  {
    title: 'TrySia',
    link: 'https://trysia.tech/',
    tags: ['open_source_software'],
    description:
      'Give Sia a spin with this Docker image that includes a fully-synced node and ready-to-use file contracts.',
  },
  {
    title: 'Luxor',
    link: 'https://mining.luxor.tech/coins/siacoin',
    tags: ['mining_pools'],
    description: 'Mining pool for Siacoin.',
  },
  {
    title: 'SiaMining',
    link: 'https://siamining.com/',
    tags: ['mining_pools'],
    description: 'The first and largest mining pool for Siacoin.',
  },
  {
    title: 'DxPool',
    link: 'https://www.dxpool.com/pool/sc/info',
    tags: ['mining_pools'],
    description: 'Leading blockchain infrastructure service provider.',
  },
  {
    title: 'f2pool',
    link: 'https://www.f2pool.com/coin/siacoin?lang=en_US',
    tags: ['mining_pools'],
    description: 'Popular crypto mining pool provider.',
  },
  {
    title: 'Binance',
    link: 'https://www.binance.com/en/trade/SC_BTC',
    tags: ['exchanges'],
    description:
      'Based in Malta, Binance is a popular crypto-to-crypto exchange.',
  },
  {
    title: 'Bittrex',
    link: 'https://bittrex.com/Market/Index?MarketName=btc-SC',
    tags: ['exchanges'],
    description:
      'Based in the USA, Bittrex is a popular crypto-to-crypto exchange that is currently rolling out USD deposits.',
  },
  {
    title: 'Kraken',
    link: 'https://www.kraken.com/prices/sc-siacoin-price-chart/usd-us-dollar?interval=1m',
    tags: ['exchanges'],
    description:
      'Based in the USA, Kraken is one of the largest and oldest Bitcoin exchanges in the world.',
  },
  {
    title: 'Shapeshift',
    link: 'https://shapeshift.com/',
    tags: ['exchanges'],
    description:
      'Shapeshift enables users to quickly exchange small amounts of cryptocurrency. Most user-friendly.',
  },
  {
    title: 'Poloniex',
    link: 'https://poloniex.com/exchange/BTC_SC',
    tags: ['exchanges'],
    description:
      'Based in the USA and recently acquired by Circle, Poloniex is a popular crypto-to-crypto exchange.',
  },
  {
    title: 'Crypto.com',
    link: 'https://crypto.com/app',
    tags: ['exchanges'],
    description:
      'Crypto.com is a popular crypto-to-crypto exchange. It is a trusted and secure platform for users to trade top cryptocurrencies with the lowest fees in the industry.',
  },
  {
    title: 'Upbit',
    link: 'https://upbit.com/home',
    tags: ['exchanges'],
    description:
      'Based in South Korea and partnered with Bittrex, Upbit is a popular crypto-to-crypto exchange.',
  },
  {
    title: 'SevenB',
    link: 'https://play.google.com/store/apps/details?id=io.sevenb.terminal',
    tags: ['exchanges'],
    description:
      'A simple & straightforward crypto broker, powered by Binance.',
  },
]
