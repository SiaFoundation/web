'use client'

import { Provider } from '../lib/dataset'

export type ProviderData = {
  id: string
  provider: Provider
  speedAverage?: number
  speedUpload?: number
  speedDownload?: number
  costTotal?: number
  costStorage: number
  costDownload?: number
  costUpload?: number
}
