import { getDaysInMs } from '@siafoundation/design-system'
import { toHastings } from '@siafoundation/sia-js'
import { random } from 'lodash'
import { Row } from './useContracts'

function buildRow(start: string): Row {
  const i = random(0, 1_000_000)
  const startDate = new Date(start).getTime()
  const expirationDate = startDate + getDaysInMs(60)
  const proofWindowDate = expirationDate + getDaysInMs(3)
  const now = new Date().getTime()
  const active = proofWindowDate > now

  return {
    id: i + '0x9u2f923fuewij',
    key: i + '0x9u2f923fuewij',
    status: active ? 'active' : random(0, 10) < 3 ? 'failed' : 'successful',
    renewed: active && random(0, 1) === 0,
    proofWindowDate,
    startDate,
    expirationDate,
    dataSize: 5_000_000 + (i + 1e6),
    contractFee: toHastings(random(50, 100)),
    storagePrice: toHastings(random(50, 100)),
    uploadPrice: toHastings(random(50, 100)),
    downloadPrice: toHastings(random(50, 100)),
    spending: toHastings(30_00 + (i + 1e2)),
  }
}

export const contractsData: Row[] = [
  buildRow('09/04/2022'),
  buildRow('09/05/2022'),
  buildRow('09/06/2022'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  // buildRow('05/07/2020'),
  // buildRow('05/07/2019'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  buildRow('09/07/2022'),
  buildRow('09/08/2022'),
  buildRow('09/07/2022'),
  buildRow('09/27/2022'),
  buildRow('09/17/2022'),
  buildRow('09/17/2022'),
  buildRow('09/17/2022'),
  buildRow('09/17/2022'),
]

export const contractsTimeRange = contractsData.reduce(
  (acc, item) => {
    let start = acc.start
    let end = acc.end
    if (item.startDate < start) {
      start = item.startDate
    }
    if (item.proofWindowDate > end) {
      end = item.proofWindowDate
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
