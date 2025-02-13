import BigNumber from 'bignumber.js'

export type SendStep = 'compose' | 'send' | 'done'

export type SendParamsV2 = {
  mode: 'siacoin' | 'siafund'
  receiveAddress: string
  changeAddress: string
  siafund: number
  siacoin: BigNumber
  fee: BigNumber
}

export const emptySendParamsV2: SendParamsV2 = {
  mode: 'siacoin',
  receiveAddress: '',
  changeAddress: '',
  siacoin: new BigNumber(0),
  siafund: 0,
  fee: new BigNumber(0),
}
