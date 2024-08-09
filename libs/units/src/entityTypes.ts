export type EntityType =
  | 'contract'
  | 'transaction'
  | 'block'
  | 'output'
  | 'address'
  | 'ip'
  | 'hostIp'
  | 'hostPublicKey'
  | 'contract'
  | 'blockHash'

const entityLabels: Record<EntityType, string> = {
  transaction: 'transaction',
  contract: 'contract',
  block: 'block',
  output: 'output',
  address: 'address',
  hostIp: 'host',
  hostPublicKey: 'host',
  ip: 'IP',
  blockHash: 'block hash',
}
export function getEntityTypeLabel(type?: EntityType): string | undefined {
  return type ? entityLabels[type] : undefined
}

const entityCopyLabels: Record<EntityType, string> = {
  transaction: 'transaction ID',
  contract: 'contract ID',
  block: 'block',
  output: 'output ID',
  address: 'address',
  hostIp: 'host address',
  hostPublicKey: 'host public key',
  ip: 'IP',
  blockHash: 'block hash',
}
export function getEntityTypeCopyLabel(type?: EntityType): string | undefined {
  return type ? entityCopyLabels[type] : undefined
}

export function getEntityDisplayLength(type?: EntityType): number {
  const longList: EntityType[] = ['ip', 'hostIp']
  return type && longList.includes(type) ? 20 : 12
}

export function doesEntityHaveSiascanUrl(type?: EntityType) {
  const includeList: EntityType[] = [
    'hostIp',
    'hostPublicKey',
    'contract',
    'address',
    'transaction',
    'block',
  ]
  return type && includeList.includes(type)
}

export function getEntitySiascanUrl(
  baseUrl: string,
  type: EntityType,
  value: string
) {
  switch (type) {
    case 'hostIp':
      return `${baseUrl}/host/${value}`
    case 'hostPublicKey':
      return `${baseUrl}/host/${value}`
    case 'contract':
      return `${baseUrl}/contract/${value}`
    case 'transaction':
      return `${baseUrl}/tx/${value}`
    case 'address':
      return `${baseUrl}/address/${value}`
    case 'block':
      return `${baseUrl}/block/${value}`
    default:
      return ''
  }
}

export function defaultFormatValue(text: string, maxLength: number) {
  return `${text?.slice(0, maxLength)}${
    (text?.length || 0) > maxLength ? '...' : ''
  }`
}

export function formatEntityValue(
  type: EntityType,
  text: string,
  maxLength: number
) {
  switch (type) {
    case 'blockHash': {
      const halfMax = maxLength / 2
      // Floor and ceil here to handle odd maxLengths.
      // .slice() will round down on floats.
      const firstHalf = text.slice(0, Math.floor(halfMax))
      const lastHalf = text.slice(text.length - Math.ceil(halfMax))
      return firstHalf + '...' + lastHalf
    }
    default: {
      // We could also return null here, forcing the issue of defining
      // formats for the missing cases in the switch above.
      return defaultFormatValue(text, maxLength)
    }
  }
}
