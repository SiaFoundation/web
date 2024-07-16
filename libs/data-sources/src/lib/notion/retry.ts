// retries with a backoff if the request fails
export async function retry<T>(fn: () => Promise<T>): Promise<T> {
  let retries = 0
  while (true) {
    try {
      return await fn()
    } catch (e) {
      if (retries > 3) {
        throw e
      }
      retries++
      await new Promise((resolve) => setTimeout(resolve, 2 ** retries * 1000))
    }
  }
}
