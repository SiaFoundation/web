import { getDaysInMs } from '@siafoundation/design-system'
import { toHastings } from '@siafoundation/sia-js'
import { random } from 'lodash'
import { Row } from './useContracts'

function buildRow(start: string): Row {
  const i = random(0, 1_000_000)
  const startDate = new Date(start).getTime()
  const expirationDate = startDate + getDaysInMs(60)
  const payoutDate = expirationDate + getDaysInMs(3)
  const now = new Date().getTime()
  const active = payoutDate > now

  return {
    id: i + '0x9u2f923fuewij',
    key: i + '0x9u2f923fuewij',
    status: active ? 'active' : random(0, 10) < 3 ? 'failed' : 'successful',
    renewed: active && random(0, 1) === 0,
    payoutDate,
    startDate,
    expirationDate,
    estDataSize: 5_000_000 + (i + 1e6),
    lockedCollateral: toHastings(random(50, 100) * 1e6),
    riskedCollateral: toHastings(random(50, 100) * 1e6),
    returnedCollateral: toHastings(random(50, 100) * 1e6),
    lostCollateral: toHastings(random(50, 100) * 1e6),
    contractFee: toHastings(random(50, 100) * 1e6),
    accountFunding: toHastings(random(50, 100) * 1e6),
    estStorageRevenue: toHastings(random(50, 100) * 1e6),
    estIngressRevenue: toHastings(random(50, 100) * 1e6),
    estEgressRevenue: toHastings(random(50, 100) * 1e6),
    potentialRevenue: toHastings(random(50, 100) * 1e6),
    earnedRevenue: toHastings(random(50, 100) * 1e6),
    lostRevenue: toHastings(random(50, 100) * 1e6),
    contractPayout: toHastings(50_000 + (i + 1e6)),
    revenue: toHastings(30_00 + (i + 1e6)),
    costBasis: toHastings(1_000 + (i + 1e6)),
    baseExchangeRate: toHastings(10 + (i + 1e6)),
    gainLoss: 5,
  }
}

export const contractsData: Row[] = [
  buildRow('04/04/2022'),
  buildRow('04/05/2022'),
  buildRow('04/06/2022'),
  buildRow('04/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  // buildRow('05/07/2020'),
  // buildRow('05/07/2019'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('07/08/2022'),
  buildRow('07/07/2022'),
  buildRow('07/27/2022'),
  buildRow('07/17/2022'),
]

export const contractsTimeRange = contractsData.reduce(
  (acc, item) => {
    let start = acc.start
    let end = acc.end
    if (item.startDate < start) {
      start = item.startDate
    }
    if (item.payoutDate > end) {
      end = item.payoutDate
    }
    return {
      start,
      end,
    }
  },
  {
    start: new Date().getTime() + getDaysInMs(50),
    end: 0,
  }
)

const allDates = []

let current = contractsTimeRange.start
while (current <= contractsTimeRange.end) {
  allDates.push(current)
  current += getDaysInMs(1)
}
export const allDatesMap = allDates.reduce((acc, date) => ({
  ...acc,
  [date]: {
    total: null,
    timestamp: date,
  },
}))
