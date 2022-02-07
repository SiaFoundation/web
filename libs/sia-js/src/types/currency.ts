import { SiaBigInt } from './types'

// A Currency represents a number of siacoins or siafunds. Internally, a
// Currency value is unbounded; however, Currency values sent over the wire
// protocol are subject to a maximum size of 255 bytes (approximately
// 10^614). Unlike the math/big library, whose methods modify their
// receiver, all arithmetic Currency methods return a new value. Currency
// cannot be negative.
export type Currency = SiaBigInt
