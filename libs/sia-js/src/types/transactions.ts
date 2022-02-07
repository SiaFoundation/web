import { Currency } from './currency'
import {
  FileContract,
  FileContractRevision,
  StorageProof,
} from './fileContracts'
import { TransactionSignature, UnlockConditions } from './signitures'
import { CryptoHash, SiaByteArray } from './types'

// IDs are used to refer to a type without revealing its contents. They
// are constructed by hashing specific fields of the type, along with a
// Specifier. While all of these types are hashes, defining type aliases
// gives us type safety and makes the code more readable.

// TransactionID uniquely identifies a transaction
export type TransactionID = CryptoHash
// SiacoinOutputID uniquely identifies a siacoin output
export type SiacoinOutputID = CryptoHash
// SiafundOutputID uniquely identifies a siafund output
export type SiafundOutputID = CryptoHash
// FileContractID uniquely identifies a file contract
export type FileContractID = CryptoHash
// OutputID uniquely identifies an output
export type OutputID = CryptoHash

// A Transaction is an atomic component of a block. Transactions can contain
// inputs and outputs, file contracts, storage proofs, and even arbitrary
// data. They can also contain signatures to prove that a given party has
// approved the transaction, or at least a particular subset of it.
//
// Transactions can depend on other previous transactions in the same block,
// but transactions cannot spend outputs that they create or otherwise be
// self-dependent.
export type Transaction = {
  siacoininputs: SiacoinInput[]
  siacoinoutputs: SiacoinOutput[]
  filecontracts: FileContract[]
  filecontractrevisions: FileContractRevision[]
  storageproofs: StorageProof[]
  siafundinputs: SiafundInput[]
  siafundoutputs: SiafundOutput[]
  minerfees: Currency[]
  arbitrarydata: SiaByteArray[]
  transactionsignatures: TransactionSignature[]
}

// A SiacoinInput consumes a SiacoinOutput and adds the siacoins to the set of
// siacoins that can be spent in the transaction. The ParentID points to the
// output that is getting consumed, and the UnlockConditions contain the rules
// for spending the output. The UnlockConditions must match the UnlockHash of
// the output.
export type SiacoinInput = {
  parentid: SiacoinOutputID
  unlockconditions: UnlockConditions
}

// A SiacoinOutput holds a volume of siacoins. Outputs must be spent
// atomically; that is, they must all be spent in the same transaction. The
// UnlockHash is the hash of the UnlockConditions that must be fulfilled
// in order to spend the output.
export type SiacoinOutput = {
  value: Currency
  unlockhash: UnlockHash
}

// A SiafundInput consumes a SiafundOutput and adds the siafunds to the set of
// siafunds that can be spent in the transaction. The ParentID points to the
// output that is getting consumed, and the UnlockConditions contain the rules
// for spending the output. The UnlockConditions must match the UnlockHash of
// the output.
export type SiafundInput = {
  parentid: SiafundOutputID
  unlockconditions: UnlockConditions
  claimunlockhash: UnlockHash
}

// A SiafundOutput holds a volume of siafunds. Outputs must be spent
// atomically; that is, they must all be spent in the same transaction. The
// UnlockHash is the hash of a set of UnlockConditions that must be fulfilled
// in order to spend the output.
//
// When the SiafundOutput is spent, a SiacoinOutput is created, where:
//
//     SiacoinOutput.Value := (SiafundPool - ClaimStart) / 10,000 * Value
//     SiacoinOutput.UnlockHash := SiafundInput.ClaimUnlockHash
//
// When a SiafundOutput is put into a transaction, the ClaimStart must always
// equal zero. While the transaction is being processed, the ClaimStart is set
// to the value of the SiafundPool.
export type SiafundOutput = {
  value: Currency
  unlockhash: UnlockHash
  claimstart: Currency
}

// An UnlockHash is a specially constructed hash of the UnlockConditions type.
// "Locked" values can be unlocked by providing the UnlockConditions that hash
// to a given UnlockHash. See UnlockConditions.UnlockHash for details on how the
// UnlockHash is constructed.
export type UnlockHash = CryptoHash
