const BLOCKS_PER_HOUR = 6

export function hoursToBlocks(hours: number) {
  return BLOCKS_PER_HOUR * hours
}

export function daysToBlocks(days: number) {
  return BLOCKS_PER_HOUR * 24 * days
}

export function weeksToBlocks(weeks: number) {
  return BLOCKS_PER_HOUR * 24 * 7 * weeks
}

export function monthsToBlocks(months: number) {
  return BLOCKS_PER_HOUR * 24 * 30 * months
}

export function blocksToHours(blocks: number) {
  return blocks / BLOCKS_PER_HOUR
}

export function blocksToMinutes(blocks: number) {
  return blocks / (BLOCKS_PER_HOUR / 60)
}

export function blocksToSeconds(blocks: number) {
  return blocks / (BLOCKS_PER_HOUR / 60 / 60)
}

export function blocksToMilliseconds(blocks: number) {
  return blocks / (BLOCKS_PER_HOUR / 60 / 60 / 1000)
}

export function blocksToDays(blocks: number) {
  return blocks / (BLOCKS_PER_HOUR * 24)
}

export function blocksToWeeks(blocks: number) {
  return blocks / (BLOCKS_PER_HOUR * 24 * 7)
}

export function blocksToMonths(blocks: number) {
  return blocks / (BLOCKS_PER_HOUR * 24 * 30)
}

export function blockHeightToTime(currentHeight: number, height: number) {
  return new Date().getTime() + blocksToMilliseconds(height - currentHeight)
}
