export function humanTimeAndUnits(ms: number) {
  if (!ms || ms < 1000) {
    return {
      amount: 0,
      units: 'seconds',
    }
  }

  ms /= 1000
  if (ms < 60) {
    return {
      amount: Math.floor(ms * 100) / 100,
      units: 'seconds',
    }
  }

  return {
    amount: Math.floor((ms / 60) * 100) / 100,
    units: 'minutes',
  }
}
