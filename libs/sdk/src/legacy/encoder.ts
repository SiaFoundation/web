export type Encoder = {
  dataView: DataView
  offset: number
}

export function newEncoder(): Encoder {
  const buffer = new ArrayBuffer((1 << 22) + 200) // TODO: set based on rpc
  return {
    dataView: new DataView(buffer),
    offset: 0,
  }
}

export type Decoder = {
  dataView: DataView
  offset: number
}

export function newDecoder(buf: Uint8Array): Decoder {
  const dataView = new DataView(buf.buffer, buf.byteOffset, buf.byteLength)
  return {
    dataView,
    offset: 0,
  }
}

export function encodeBoolean(e: Encoder, b: boolean) {
  e.dataView.setUint8(e.offset++, b ? 1 : 0)
}

export function decodeBoolean(d: Decoder): boolean {
  return Boolean(d.dataView.getUint8(d.offset++) === 1)
}

export function encodeUint64(e: Encoder, n: number) {
  e.dataView.setBigUint64(e.offset, BigInt(n), true)
  e.offset += 8
}

export function decodeUint64(d: Decoder): number {
  const n = Number(d.dataView.getBigUint64(d.offset, true))
  d.offset += 8
  return n
}

export function encodeBytes(e: Encoder, s: string) {
  const encoder = new TextEncoder()
  const arr = encoder.encode(s)

  for (let i = 0; i < arr.length; i++) {
    e.dataView.setUint8(e.offset++, arr[i])
  }
}

export function decodeBytes(d: Decoder, length: number): string {
  const arr = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    arr[i] = d.dataView.getUint8(d.offset++)
  }

  const decoder = new TextDecoder('utf-8')
  return decoder.decode(arr)
}

export function encodeUint8Array(e: Encoder, a: Uint8Array) {
  for (let i = 0; i < a.length; i++) {
    e.dataView.setUint8(e.offset++, a[i])
  }
}

export function decodeUint8Array(d: Decoder, length: number): Uint8Array {
  const arr = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    arr[i] = d.dataView.getUint8(d.offset++)
  }

  return arr
}

export function encodeString(e: Encoder, s: string) {
  encodeUint64(e, s.length)
  encodeBytes(e, s)
}

export function decodeString(d: Decoder): string {
  const length = decodeUint64(d)
  const s = decodeBytes(d, length)
  return s
}

export function encodeCurrency(e: Encoder, c: string) {
  // currency is 128 bits, little endian
  e.dataView.setBigUint64(
    e.offset,
    BigInt(c) & BigInt('0xFFFFFFFFFFFFFFFF'),
    true
  )
  e.offset += 8
  e.dataView.setBigUint64(e.offset, BigInt(c) >> BigInt(64), true)
  e.offset += 8
}

export function decodeCurrency(d: Decoder): string {
  const lo = d.dataView.getBigUint64(d.offset, true)
  d.offset += 8
  const hi = d.dataView.getBigUint64(d.offset, true)
  d.offset += 8
  return String((hi << BigInt(64)) | lo)
}

export function encodeAddress(e: Encoder, a: string) {
  return encodeBytes(e, a)
}

export function decodeAddress(d: Decoder): string {
  return decodeBytes(d, 32)
}

export function encodeSignature(e: Encoder, s: string) {
  return encodeBytes(e, s)
}

export function decodeSignature(d: Decoder): string {
  return decodeBytes(d, 64)
}

export function encodeTime(e: Encoder, t: string | Date) {
  const time = new Date(t)
  const seconds = BigInt(time.getTime()) / BigInt(1000)
  e.dataView.setBigUint64(e.offset, seconds, true)
  e.offset += 8
}

export function decodeTime(d: Decoder): string {
  const seconds = d.dataView.getBigUint64(d.offset, true)
  d.offset += 8
  try {
    const time = new Date(Number(seconds) * 1000)
    return time.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

export function encodeLengthPrefix(e: Encoder, length: number) {
  encodeUint64(e, length)
}

export function decodeLengthPrefix(d: Decoder): number {
  return decodeUint64(d)
}

export function encodeRpcId(e: Encoder, rpcName: string) {
  const rpcId = rpcName.padEnd(16, '\0')
  encodeUint8Array(e, new TextEncoder().encode(rpcId))
}

export function decodeRpcId(d: Decoder): string {
  return decodeBytes(d, 16).replace(/\0/g, '')
}
