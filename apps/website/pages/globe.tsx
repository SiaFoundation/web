import { AsyncReturnType } from '../lib/types'
import { HostMap } from '../components/HostMap'
import { getGeoHosts } from '../content/geoHosts'
import { getExchangeRates } from '../content/exchangeRates'
import { getMinutesInSeconds } from '../lib/time'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Globe({ hosts, rates }: Props) {
  return <HostMap hosts={hosts} rates={rates} />
}

export async function getStaticProps() {
  const hosts = await getGeoHosts()
  const rates = await getExchangeRates()

  const props = {
    hosts,
    rates: rates.data?.rates.sc,
  }

  return {
    props,
    revalidate: getMinutesInSeconds(5),
  }
}
