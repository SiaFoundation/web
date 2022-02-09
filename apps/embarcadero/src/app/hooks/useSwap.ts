import {
  SiacoinInput,
  SiacoinOutput,
  SiafundInput,
  SiafundOutput,
  toSiacoins,
  TransactionSignature,
} from '@siafoundation/sia-core'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import useSWR from 'swr'

export type SwapTransaction = {
  siacoinInputs: SiacoinInput[]
  siafundInputs: SiafundInput[]
  siacoinOutputs: SiacoinOutput[]
  siafundOutputs: SiafundOutput[]
  signatures: TransactionSignature[]
}

export type SwapStatus =
  | 'waitingForCounterpartyToAccept'
  | 'waitingForYouToAccept'
  | 'waitingForCounterpartyToFinish'
  | 'waitingForYouToFinish'

type SwapSummary = {
  receiveSF: boolean
  receiveSC: boolean
  payFee: boolean
  amountSC: string
  amountSF: string
  amountFee: string
  status: SwapStatus
}

type Response = {
  summary: SwapSummary
  swap: SwapTransaction
}

export function useSwap(hash?: string) {
  const response = useSWR<Response>(hash, async () => {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:8080/api/summarize',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        hash,
      },
    })
    return res.data
  })

  const offerSc = useMemo(() => {
    return !!response.data?.summary.receiveSF
  }, [response])

  const sc = useMemo(() => {
    if (!response.data?.summary) {
      return undefined
    }

    const { amountSC } = response.data.summary

    return toSiacoins(new BigNumber(amountSC))
  }, [response, offerSc])

  const sf = useMemo(() => {
    if (!response.data?.summary) {
      return undefined
    }

    const { amountSF } = response.data.summary

    return new BigNumber(amountSF)
  }, [response, offerSc])

  return {
    isValidating: response.isValidating,
    summary: response.data?.summary,
    transaction: response.data?.swap,
    status: response.data?.summary.status,
    offerSc,
    sf,
    sc,
  }
}
