export function getDaysInMs(days: number) {
  return 1000 * 60 * 60 * 24 * days
}

export function getWeeksInMs(weeks: number) {
  return getDaysInMs(7 * weeks)
}

export function getMonthsInMs(months: number) {
  return getDaysInMs(30 * months)
}

export function getYearsInMs(years: number) {
  return getDaysInMs(365 * years)
}

export function getNowInMs() {
  return new Date().getTime()
}
