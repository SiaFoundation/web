import BigNumber from 'bignumber.js'

// 1024

// function converts bytes to TiB
export function bytesToTiB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1024).div(1024).div(1024).div(1024)
}

// function converts bytes to GiB
export function bytesToGiB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1024).div(1024).div(1024)
}

// function converts bytes to MiB
export function bytesToMiB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1024).div(1024)
}

// function converts TiB to bytes
export function TiBToBytes(TiB: BigNumber | string | number): BigNumber {
  return new BigNumber(TiB).times(1024).times(1024).times(1024).times(1024)
}

// function converts GiB to bytes
export function GiBToBytes(GiB: BigNumber | string | number): BigNumber {
  return new BigNumber(GiB).times(1024).times(1024).times(1024)
}

// function converts MiB to bytes
export function MiBToBytes(MiB: BigNumber | string | number): BigNumber {
  return new BigNumber(MiB).times(1024).times(1024)
}

// 1000s

// function converts bytes to TB
export function bytesToTB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1000).div(1000).div(1000).div(1000)
}

// function converts TB to bytes
export function TBToBytes(TiB: BigNumber | string | number): BigNumber {
  return new BigNumber(TiB).times(1000).times(1000).times(1000).times(1000)
}

// function converts bytes to GB
export function bytesToGB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1000).div(1000).div(1000)
}

// function converts GB to bytes
export function GBToBytes(GB: BigNumber | string | number): BigNumber {
  return new BigNumber(GB).times(1000).times(1000).times(1000)
}

// function converts MB to GB
export function MBToGB(mb: BigNumber | string | number): BigNumber {
  return new BigNumber(mb).div(1000)
}

// function converts GB to MB
export function GBToMB(GB: BigNumber | string | number): BigNumber {
  return new BigNumber(GB).times(1000)
}

// function converts bytes to MB
export function bytesToMB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1000).div(1000)
}

// function converts MB to bytes
export function MBToBytes(MB: BigNumber | string | number): BigNumber {
  return new BigNumber(MB).times(1000).times(1000)
}
