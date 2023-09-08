export async function runFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const bx = await fetch(url, init)
  const result: T = await bx.json()
  return result
}
