import { SiaCentral } from '.'

export async function example() {
  const siaCentral = SiaCentral()
  const latestBlock = await siaCentral.blockLatest()
  const metrics = await siaCentral.hostsNetworkMetrics()
  const averages = await siaCentral.hostsNetworkAverages()
  const exchangeRates = await siaCentral.exchangeRates({
    params: {
      currencies: 'sc',
    },
  })
  console.log({ latestBlock, metrics, averages, exchangeRates })
}
