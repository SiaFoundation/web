export function minutesInMilliseconds(minutes: number) {
  return 1000 * 60 * minutes
}

export function hoursInMilliseconds(hours: number) {
  return 1000 * 60 * 60 * hours
}

export function daysInMilliseconds(days: number) {
  return 1000 * 60 * 60 * 24 * days
}

export function weeksInMilliseconds(weeks: number) {
  return daysInMilliseconds(7 * weeks)
}

export function monthsInMilliseconds(months: number) {
  return daysInMilliseconds(30 * months)
}

export function yearsInMilliseconds(years: number) {
  return daysInMilliseconds(365 * years)
}

export function nowInMilliseconds() {
  return new Date().getTime()
}

export function nanosecondsInMinutes(ns: number) {
  return ns / 1000 / 1000 / 1000 / 60
}

export function millisecondsInHours(ms: number) {
  return ms / 1000 / 1000 / 60 / 60
}

export function millisecondsInMinutes(ms: number) {
  return ms / 1000 / 60
}

export function microsecondsInMinutes(us: number) {
  return us / 1000 / 1000 / 60
}

export function nanosecondsInDays(ns: number) {
  return ns / 1000 / 1000 / 1000 / 60 / 60 / 24
}

export function daysInNanoseconds(days: number) {
  return days * 1000 * 1000 * 1000 * 60 * 60 * 24
}

export function hoursInDays(hours: number) {
  return hours / 24
}

// minutes in

export function minutesInSeconds(minutes: number) {
  return minutes * 60
}

export function minutesInNanoseconds(minutes: number) {
  return minutes * 1000 * 1000 * 1000 * 60
}

// seconds in

export function secondsInMinutes(seconds: number) {
  return seconds / 60
}

export function secondsInMilliseconds(seconds: number) {
  return seconds * 1000
}
