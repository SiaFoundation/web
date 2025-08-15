export type KeyData = {
  id: string
  key: string
  description: string
  maxPinnedData: number
  totalUses: number
  remainingUses: number
  dateCreated: string
  lastUpdated: string
  lastUsed: string
  displayFields: {
    maxPinnedData: string
    dateCreated: string
    lastUpdated: string
    lastUsed?: string
  }
}
