export const getPointTime = (d?: Point) => new Date(d?.timestamp || 0)
export const getPointValue = (d?: Point) => d?.value || 0

export type Point = {
  timestamp: number
  value: number
}
