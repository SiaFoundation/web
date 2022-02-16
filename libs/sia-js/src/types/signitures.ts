import { BlockHeight } from './block'
import { Specifier } from './specifier'
import { CryptoHash, SiaByteArray, SiaUint64 } from './types'

// CoveredFields indicates which fields in a transaction have been covered by
// the signature. (Note that the signature does not sign the fields
// themselves, but rather their combined hash; see SigHash.) Each slice
// corresponds to a slice in the Transaction type, indicating which indices of
// the slice have been signed. The indices must be valid, i.e. within the
// bounds of the slice. In addition, they must be sorted and unique.
//
// As a convenience, a signature of the entire transaction can be indicated by
// the 'WholeTransaction' field. If 'WholeTransaction' == true, all other
// fields must be empty (except for the Signatures field, since a signature
// cannot sign itself).
export type CoveredFields = {
  wholetransaction: boolean
  siacoininputs: SiaUint64[]
  siacoinoutputs: SiaUint64[]
  filecontracts: SiaUint64[]
  filecontractrevisions: SiaUint64[]
  storageproofs: SiaUint64[]
  siafundinputs: SiaUint64[]
  siafundoutputs: SiaUint64[]
  minerfees: SiaUint64[]
  arbitrarydata: SiaUint64[]
  transactionsignatures: SiaUint64[]
}

// A SiaPublicKey is a public key prefixed by a Specifier. The Specifier
// indicates the algorithm used for signing and verification. Unrecognized
// algorithms will always verify, which allows new algorithms to be added to
// the protocol via a soft-fork.
export type SiaPublicKey = {
  algorithm: Specifier
  key: SiaByteArray
}

// A TransactionSignature is a signature that is included in the transaction.
// The signature should correspond to a public key in one of the
// UnlockConditions of the transaction. This key is specified first by
// 'ParentID', which specifies the UnlockConditions, and then
// 'PublicKeyIndex', which indicates the key in the UnlockConditions. There
// are three types that use UnlockConditions: SiacoinInputs, SiafundInputs,
// and FileContractTerminations. Each of these types also references a
// ParentID, and this is the hash that 'ParentID' must match. The 'Timelock'
// prevents the signature from being used until a certain height.
// 'CoveredFields' indicates which parts of the transaction are being signed;
// see CoveredFields.
export type TransactionSignature = {
  parentid: CryptoHash
  publickeyindex: SiaUint64
  timelock: BlockHeight
  coveredfields: CoveredFields
  signature: SiaByteArray
}

// UnlockConditions are a set of conditions which must be met to execute
// certain actions, such as spending a SiacoinOutput or terminating a
// FileContract.
//
// The simplest requirement is that the block containing the UnlockConditions
// must have a height >= 'Timelock'.
//
// 'PublicKeys' specifies the set of keys that can be used to satisfy the
// UnlockConditions; of these, at least 'SignaturesRequired' unique keys must sign
// the transaction. The keys that do not need to use the same cryptographic
// algorithm.
//
// If 'SignaturesRequired' == 0, the UnlockConditions are effectively "anyone can
// unlock." If 'SignaturesRequired' > len('PublicKeys'), then the UnlockConditions
// cannot be fulfilled under any circumstances.
export type UnlockConditions = {
  timelock: BlockHeight
  publickeys: SiaPublicKey[]
  signaturesrequired: number
}
