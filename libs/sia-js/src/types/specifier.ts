import { SiaByteArray } from './types'

// A Specifier is a fixed-length byte-array that serves two purposes. In
// the wire protocol, they are used to identify a particular encoding
// algorithm, signature algorithm, etc. This allows nodes to communicate on
// their own terms; for example, to reduce bandwidth costs, a node might
// only accept compressed messages.
//
// Internally, Specifiers are used to guarantee unique IDs. Various
// consensus types have an associated ID, calculated by hashing the data
// contained in the type. By prepending the data with Specifier, we can

// guarantee that distinct types will never produce the same hash.
export type Specifier = SiaByteArray // [SpecifierLen]byte
