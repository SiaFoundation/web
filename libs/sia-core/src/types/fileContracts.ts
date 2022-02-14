import { BlockHeight } from './block'
import { Currency } from './currency'
import { UnlockConditions } from './signitures'
import { FileContractID, SiacoinOutput, UnlockHash } from './transactions'
import { CryptoHash, SiaByteArray, SiaUint64 } from './types'

// A FileContract is a public record of a storage agreement between a "host"
// and a "renter." It mandates that a host must submit a storage proof to the
// network, proving that they still possess the file they have agreed to
// store.
//
// The party must submit the storage proof in a block that is between
// 'WindowStart' and 'WindowEnd'. Upon submitting the proof, the outputs
// for 'ValidProofOutputs' are created. If the party does not submit a
// storage proof by 'WindowEnd', then the outputs for 'MissedProofOutputs'
// are created instead. The sum of 'MissedProofOutputs' and the sum of
// 'ValidProofOutputs' must equal 'Payout' minus the siafund fee. This fee
// is sent to the siafund pool, which is a set of siacoins only spendable
// by siafund owners.
//
// Under normal circumstances, the payout will be funded by both the host and
// the renter, which gives the host incentive not to lose the file. The
// 'ValidProofUnlockHash' will typically be spendable by host, and the
// 'MissedProofUnlockHash' will either by spendable by the renter or by
// nobody (the ZeroUnlockHash).
//
// A contract can be terminated early by submitting a FileContractTermination
// whose UnlockConditions hash to 'TerminationHash'.
export type FileContract = {
  filesize: SiaUint64
  filemerkleroot: CryptoHash
  windowstart: BlockHeight
  windowend: BlockHeight
  payout: Currency
  validproofoutputs: SiacoinOutput[]
  missedproofoutputs: SiacoinOutput[]
  unlockhash: UnlockHash
  revisionnumber: SiaUint64
}

// A FileContractRevision revises an existing file contract. The ParentID
// points to the file contract that is being revised. The UnlockConditions
// are the conditions under which the revision is valid, and must match the
// UnlockHash of the parent file contract. The Payout of the file contract
// cannot be changed, but all other fields are allowed to be changed. The
// sum of the outputs must match the original payout (taking into account
// the fee for the proof payouts.) A revision number is included. When
// getting accepted, the revision number of the revision must be higher
// than any previously seen revision number for that file contract.
//
// FileContractRevisions enable trust-free modifications to existing file
// contracts.
export type FileContractRevision = {
  parentid: FileContractID
  unlockconditions: UnlockConditions
  newrevisionnumber: SiaUint64

  newfilesize: SiaUint64
  newfilemerkleroot: CryptoHash
  newwindowstart: BlockHeight
  newwindowend: BlockHeight
  newvalidproofoutputs: SiacoinOutput[]
  newmissedproofoutputs: SiacoinOutput[]
  newunlockhash: UnlockHash
}

// A StorageProof fulfills a FileContract. The proof contains a specific
// segment of the file, along with a set of hashes from the file's Merkle
// tree. In combination, these can be used to prove that the segment came
// from the file. To prevent abuse, the segment must be chosen randomly, so
// the ID of block 'WindowStart' - 1 is used as a seed value; see
// StorageProofSegment for the exact implementation.
//
// A transaction with a StorageProof cannot have any SiacoinOutputs,
// SiafundOutputs, or FileContracts. This is because a mundane reorg can
// invalidate the proof, and with it the rest of the transaction.
export type StorageProof = {
  parentid: FileContractID
  segment: SiaByteArray // [Crypto.SegmentSize]byte
  hashset: CryptoHash
}

// ProofStatus indicates whether a StorageProof was valid (true) or missed (false).
export type ProofStatus = boolean
