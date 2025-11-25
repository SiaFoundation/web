export type AccountData = {
  id: string
  publicKey: string
  description: string
  serviceAccount: boolean
  maxPinnedData: number
  pinnedData: number
  lastUsed: string
  logoURL: string
  serviceURL: string
  displayFields: {
    maxPinnedData: string
    pinnedData: string
    lastUsed?: string
  }
}
