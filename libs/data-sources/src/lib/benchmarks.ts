import axios from 'axios'
import { buildErrorResponse500 } from './error'
import { AsyncDataSourceResponse } from './types'

type BenchmarkResult = {
  version: string
  maxCPUPct: number
  maxMemBytes: number
  downloadThroughput: number
  downloadP99: number
  downloadTime: number
  uploadThroughput: number
  uploadP99: number
  uploadTime: number
}

type BenchmarkResponse = {
  data: {
    message: string
    results: BenchmarkResult[]
  }
}

async function getBenchmarkResults() {
  const benchmarks = await axios.get<unknown, BenchmarkResponse>(
    'https://benchmarks.sia.tech/results'
  )

  return benchmarks.data.results
}

export async function getBenchmarks(): AsyncDataSourceResponse<
  BenchmarkResult[]
> {
  try {
    const results = await getBenchmarkResults()

    return {
      status: 200,
      data: results || [],
    }
  } catch (e) {
    console.log(e)
    return buildErrorResponse500()
  }
}
