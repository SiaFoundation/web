const localDomains = ['sia.tech']

export function useIsExternalDomain(link: string) {
  if (!link.startsWith('http')) {
    return null
  }

  const url = new URL(link)

  return !localDomains.includes(url.host)
}
