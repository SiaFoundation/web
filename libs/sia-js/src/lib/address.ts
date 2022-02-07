import * as blake from 'blakejs'
import { isEqual } from 'lodash'

function hexToBytes(hex: string) {
  const bytes = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16))
  }
  return bytes
}

function verifyChecksum(address: string) {
  const aBytes = hexToBytes(address)
  const checksumBytes = Uint8Array.from(aBytes.slice(0, 32))
  const check = Uint8Array.from(aBytes.slice(32, 38))
  const blakeHash = blake.blake2b(checksumBytes, undefined, 32).slice(0, 6)
  return !!isEqual(blakeHash, check)
}

export function isValidAddress(address: string): boolean {
  if (address.length !== 76) {
    // Check if it has the basic requirements of an address
    return false
  }
  return verifyChecksum(address)
}
