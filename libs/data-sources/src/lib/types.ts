export type DataSourceResponse<T> = {
  status: number
  data?: T
  error?: string
}

export type AsyncDataSourceResponse<T> = Promise<DataSourceResponse<T>>
