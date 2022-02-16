import { BlockHeight } from './block'
import { Currency } from './currency'
import { Specifier } from './specifier'
import { Timestamp } from './timestamp'
import {
  OutputID,
  Transaction,
  TransactionID,
  UnlockHash,
} from './transactions'
import { CryptoHash, SiaByteArray } from './types'

// Seed is cryptographic entropy that is used to derive spendable wallet
// addresses.
export type Seed = SiaByteArray // [crypto.EntropySize]byte

// WalletTransactionID is a unique identifier for a wallet transaction.
export type WalletTransactionID = CryptoHash

// A ProcessedInput represents funding to a transaction. The input is
// coming from an address and going to the outputs. The fund types are
// 'SiacoinInput', 'SiafundInput'.
export type ProcessedInput = {
  parentid: OutputID
  fundtype: Specifier
  walletaddress: boolean
  relatedaddress: UnlockHash
  value: Currency
}

// A ProcessedOutput is a siacoin output that appears in a transaction.
// Some outputs mature immediately, some are delayed, and some may never
// mature at all (in the event of storage proofs).
//
// Fund type can either be 'SiacoinOutput', 'SiafundOutput', 'ClaimOutput',
// 'MinerPayout', or 'MinerFee'. All outputs except the miner fee create
// outputs accessible to an address. Miner fees are not spendable, and
// instead contribute to the block subsidy.
//
// MaturityHeight indicates at what block height the output becomes
// available. SiacoinInputs and SiafundInputs become available immediately.
// ClaimInputs and MinerPayouts become available after 144 confirmations.
export type ProcessedOutput = {
  id: OutputID
  fundtype: Specifier
  maturityheight: BlockHeight
  walletaddress: boolean
  relatedaddress: UnlockHash
  value: Currency
}

// A ProcessedTransaction is a transaction that has been processed into
// explicit inputs and outputs and tagged with some header data such as
// confirmation height + timestamp.
//
// Because of the block subsidy, a block is considered as a transaction.
// Since there is technically no transaction id for the block subsidy, the
// block id is used instead.
export type ProcessedTransaction = {
  transaction: Transaction
  transactionid: TransactionID
  confirmationheight: BlockHeight
  confirmationtimestamp: Timestamp

  inputs: ProcessedInput[]
  outputs: ProcessedOutput[]
}

// ValuedTransaction is a transaction that has been given incoming and
// outgoing siacoin value fields.
export type ValuedTransaction = {
  transaction: Transaction
  transactionid: TransactionID
  confirmationheight: BlockHeight
  confirmationtimestamp: Timestamp

  inputs: ProcessedInput[]
  outputs: ProcessedOutput[]

  confirmedincomingvalue: Currency
  confirmedoutgoingvalue: Currency
}

// A UnspentOutput is a SiacoinOutput or SiafundOutput that the wallet
// is tracking.
export type UnspentOutput = {
  id: OutputID
  fundtype: Specifier
  unlockhash: UnlockHash
  value: Currency
  confirmationheight: BlockHeight
  iswatchonly: boolean
}

// WalletSettings control the behavior of the Wallet.
export type WalletSettings = {
  nodefrag: boolean
}
