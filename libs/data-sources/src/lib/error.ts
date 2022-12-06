import { DataSourceResponse } from './types'

export function buildErrorResponse500<T>(): DataSourceResponse<T> {
  return {
    status: 500,
    error: 'Request to data source failed',
    data: undefined,
  }
}
