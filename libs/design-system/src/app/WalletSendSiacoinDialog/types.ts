'use client'

import BigNumber from 'bignumber.js'

export type SendSiacoinFormData = {
  address: string
  hastings: BigNumber
  includeFee: boolean
}
