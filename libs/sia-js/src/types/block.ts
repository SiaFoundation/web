import { Timestamp } from './timestamp'
import { SiacoinOutput, Transaction } from './transactions'
import { CryptoHash, SiaByteArray, SiaUint64 } from './types'

// A Block is a summary of changes to the state that have occurred since the
// previous block. Blocks reference the ID of the previous block (their
// "parent"), creating the linked-list commonly known as the blockchain. Their
// primary function is to bundle together transactions on the network. Blocks
// are created by "miners," who collect transactions from other nodes, and
// then try to pick a Nonce that results in a block whose BlockID is below a
// given Target.
export type Block = {
  parentid: BlockID
  nonce: BlockNonce
  timestamp: Timestamp
  minerpayouts: SiacoinOutput[]
  transactions: Transaction[]
}

// A BlockHeader contains the data that, when hashed, produces the Block's ID.
export type BlockHeader = {
  parentid: BlockID
  nonce: BlockNonce
  timestamp: Timestamp
  merkleroot: CryptoHash
}

// BlockHeight is the number of blocks that exist after the genesis block.
export type BlockHeight = SiaUint64

// A BlockID is the hash of a BlockHeader. A BlockID uniquely
// identifies a Block, and indicates the amount of work performed
// to mine that Block. The more leading zeros in the BlockID, the
// more work was performed.

export type BlockID = CryptoHash

// The BlockNonce is a "scratch space" that miners can freely alter to produce
// a BlockID that satisfies a given Target.
export type BlockNonce = SiaByteArray // [8]byte
