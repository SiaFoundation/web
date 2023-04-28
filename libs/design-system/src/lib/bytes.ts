import BigNumber from 'bignumber.js'

// function converts bytes to TiB
export function bytesToTiB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1024).div(1024).div(1024).div(1024)
}

// function converts TiB to bytes
export function TiBToBytes(TiB: BigNumber | string | number): BigNumber {
  return new BigNumber(TiB).times(1024).times(1024).times(1024).times(1024)
}

// function converts bytes to TB
export function bytesToTB(bytes: BigNumber | string | number): BigNumber {
  return new BigNumber(bytes).div(1000).div(1000).div(1000).div(1000)
}

// function converts TB to bytes
export function TBToBytes(TiB: BigNumber | string | number): BigNumber {
  return new BigNumber(TiB).times(1000).times(1000).times(1000).times(1000)
}
