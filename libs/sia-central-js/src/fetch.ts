export async function runFetch<T>(url: string, init?: RequestInit): Promise<{ data?: T, error?: string }> {
  try {
    const bx = await fetch(url, init)
    const result: T = await bx.json()
    return {
      data: result,
    }
  } catch (e: unknown) {
    return {
      error: (e as Error).message
    }
  }
}
