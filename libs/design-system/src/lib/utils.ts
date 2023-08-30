export function truncate(id: string, limit?: number) {
  if (!id) {
    return ''
  }
  if (limit && id.length > limit) {
    return `${id.slice(0, limit)}...`
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
    .replace(/^key:/, '')
}

export function getTitleId(title: string, id: string, limit?: number) {
  if (id) {
    return `${title} ${humanId(id, limit)}`
  }
  return `${title}`
}

export function humanId(id: string, limit?: number) {
  return truncate(id, limit)
}
