export function truncate(id: string, limit: number, ellipsis = true) {
  if (!id) {
    return ''
  }
  if (limit && id.length > limit) {
    return `${id.slice(0, limit)}${ellipsis ? '...' : ''}`
  }
  return `${id.slice(0, limit)}`
}

export function stripPrefix(hash: string) {
  return (hash || '')
    .replace(/^addr:/, '')
    .replace(/^txid:/, '')
    .replace(/^fcid:/, '')
    .replace(/^h:/, '')
    .replace(/^scoid:/, '')
    .replace(/^sfoid:/, '')
    .replace(/^key:/, '')
    .replace(/^bid:/, '')
}

export function getTitleId(title: string, id: string, limit: number) {
  if (id) {
    return `${title} ${truncate(id, limit)}`
  }
  return `${title}`
}
