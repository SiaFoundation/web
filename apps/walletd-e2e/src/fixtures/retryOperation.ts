/**
 * Generic helper to retry an async operation with delay on failure
 * @param operation - Function to execute
 * @param maxAttempts - Maximum number of attempts (default: 3)
 * @param delayMs - Delay between retries in milliseconds (default: 2000)
 * @returns Promise with the operation result
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 2000,
): Promise<T> {
  let lastError: Error | unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      // Log the retry attempt
      console.log(
        `Operation failed (attempt ${attempt}/${maxAttempts}), retrying in ${delayMs}ms...`,
      )

      // If this was the last attempt, don't delay, just throw
      if (attempt === maxAttempts) {
        // Enhance error message with attempt information
        if (error instanceof Error) {
          error.message = `Failed after ${maxAttempts} attempts: ${error.message}`
        }
        throw error
      }

      // Wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  // This should never be reached due to the throw in the loop, but TypeScript needs it
  throw lastError
}
