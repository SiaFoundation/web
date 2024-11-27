import { ToastParams, triggerErrorToast, triggerSuccessToast } from './toast'

type Results = {
  totalCount: number
  errorCount: number
  successCount: number
}

type Params = {
  toastSuccess: (results: Results) => ToastParams
  toastError: (results: Results) => ToastParams
  after?: () => void | Promise<void>
}

export async function handleBatchOperation<T>(
  operations: Promise<{ data?: T; error?: string }>[],
  params: Params
) {
  const totalCount = operations.length
  let errorCount = 0
  const results = await Promise.all(operations)
  for (const r of results) {
    if (r.error) {
      errorCount++
    }
  }
  const successCount = totalCount - errorCount
  if (errorCount > 0) {
    triggerErrorToast(
      params.toastError({ totalCount, errorCount, successCount })
    )
  } else {
    triggerSuccessToast(
      params.toastSuccess({ totalCount, errorCount, successCount })
    )
  }
  await params.after?.()
}
