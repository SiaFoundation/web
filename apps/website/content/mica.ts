import { to } from '@siafoundation/request'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

export type MicaIndicator = {
  indicator: number
  title: string
  description: string
  unit: string
  result: {
    value: number
    year: number
  }
}

export type MicaIndicatorObject = { [key: string]: MicaIndicator }

export async function getMicaIndicators() {
  const [indicators, indicatorsError] = await to<MicaIndicatorObject>(
    axios(
      `https://ccri.sia.tools/mica/overview/sc?responseType=recent&key=${process.env['CCRI_TOKEN']}`
    )
  )

  if (indicatorsError) throw indicatorsError

  return indicators
}
