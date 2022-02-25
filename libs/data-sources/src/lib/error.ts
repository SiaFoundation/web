import { DataSourceResponse } from './types'

export const errorResponse500: DataSourceResponse<undefined> = {
  status: 500,
  error: 'Request to data source failed',
  data: undefined,
}
