import { getDaysInMs } from '@siafoundation/design-system'
import { random, times } from 'lodash'

const count = 365 * 2
const futureSpan = 90

function getTimeIntervalAgo(i: number, future?: number) {
  return new Date().getTime() - getDaysInMs(1) * i + getDaysInMs(future || 0)
}

function getTimes() {
  return times(count, (i) => ({
    i,
    timestamp: getTimeIntervalAgo(i),
  }))
}

function getTimesWithFuture() {
  return times(count + futureSpan, (i) => ({
    i,
    timestamp: getTimeIntervalAgo(i, futureSpan),
  }))
}

function isPast(timestamp, value) {
  return timestamp <= new Date().getTime() ? value : undefined
}

function isFuture(timestamp, value) {
  return timestamp > new Date().getTime() ? value : undefined
}

export const mockData = {
  revenue: getTimesWithFuture().map(({ i, timestamp }) => {
    const storage = (random(5, 6) + 10) * (count - i) * 1e24
    const ingress = (random(1, 3) + 1) * (count - i) * 1e24
    const egress = (random(3, 5) + 1) * (count - i) * 1e24
    const registry = (random(4, 5) + 0.5) * (count - i) * 1e24
    const other = (random(0.5, 1) + 0.5) * (count - i) * 1e24
    const lost = random(0, 2.1) + 0.5 * (count - i) * 1e24 * -1
    const all = storage + ingress + egress + registry + other + lost

    return {
      timestamp,
      storage: isPast(timestamp, storage),
      ingress: isPast(timestamp, ingress),
      egress: isPast(timestamp, egress),
      registry: isPast(timestamp, registry),
      other: isPast(timestamp, other),
      lost: isPast(timestamp, lost),
      potential: isFuture(timestamp, all),
    }
  }),

  pricing: getTimes().map(({ timestamp }) => {
    const contract = random(5, 6) * 1e24
    const storage = 1 + random(5, 10) * 1e24
    const registry = 0.5 + random(5, 6) * 1e24
    const ingress = 2 + random(5, 6) * 1e24
    const egress = 8 + random(2, 3) * 1e24

    return {
      timestamp,
      contract,
      storage,
      registry,
      ingress,
      egress,
    }
  }),

  collateral: getTimes().map(({ i, timestamp }) => {
    return {
      timestamp,
      locked: (random(200, 300) + 50) * (count - i) * 1e21,
      risked: (random(50, 100) + 50) * (count - i) * 1e21,
      burnt:
        i > 30
          ? (random(0, 50) + 50) * (count - i) * random(0, 1) * 1e21
          : undefined,
    }
  }),

  contracts: getTimesWithFuture().map(({ i, timestamp }) => {
    return {
      timestamp,
      active: isPast(timestamp, random(15, 25)),
      successful: isPast(timestamp, random(15, 25)),
      failed: isPast(timestamp, random(0, 2)),
      expiring: isFuture(timestamp, random(15, 25)),
    }
  }),

  storage: getTimes().map(({ i, timestamp }) => ({
    timestamp,
    storage:
      random(100, 200) * 1e8 + (i > count * 0.75 ? count - i : count / 4) * 1e9,
    registry: random(1, 4) + 1 * (count - i) * 1e6,
  })),

  bandwidth: getTimes().map(({ i, timestamp }) => ({
    timestamp,
    egress: random(100, 200) * 1e10 + (count - i) + 1e12,
    ingress: random(50, 100) * 1e10 + (i > count * 0.75 ? 5 : 1) * 1e12,
  })),
}
