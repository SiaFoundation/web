import { Response, delay } from '@siafoundation/react-core'
import { MultipartParams, MultipartUpload } from './multipartUpload'

describe('MultipartUpload', () => {
  it('should report progress with serial chunks', async () => {
    // note that the upload mock is configured to report progress 2 times per chunk
    const params = getParams({
      file: new File(['01234567890123456789'], 'test.txt', {
        type: 'text/plain',
      }),
      chunkSize: 2,
      maxConcurrentChunks: 1,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(20)
    expect(
      params.onProgress.mock.calls.map(([params]) => [
        params.sent,
        params.total,
        params.percentage,
      ])
    ).toEqual([
      [1, 20, 5],
      [2, 20, 10],
      [3, 20, 15],
      [4, 20, 20],
      [5, 20, 25],
      [6, 20, 30],
      [7, 20, 35],
      [8, 20, 40],
      [9, 20, 45],
      [10, 20, 50],
      [11, 20, 55],
      [12, 20, 60],
      [13, 20, 65],
      [14, 20, 70],
      [15, 20, 75],
      [16, 20, 80],
      [17, 20, 85],
      [18, 20, 90],
      [19, 20, 95],
      [20, 20, 100],
    ])
  })

  it('should report progress with concurrent chunks', async () => {
    // note that the upload mock is configured to report progress 2 times per chunk
    const params = getParams({
      file: new File(['01234567890123456789'], 'test.txt', {
        type: 'text/plain',
      }),
      chunkSize: 2,
      maxConcurrentChunks: 5,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(20)
    expect(
      params.onProgress.mock.calls.map(([params]) => [
        params.sent,
        params.total,
        params.percentage,
      ])
    ).toEqual([
      [1, 20, 5],
      [2, 20, 10],
      [3, 20, 15],
      [4, 20, 20],
      [5, 20, 25],
      [6, 20, 30],
      [7, 20, 35],
      [8, 20, 40],
      [9, 20, 45],
      [10, 20, 50],
      [11, 20, 55],
      [12, 20, 60],
      [13, 20, 65],
      [14, 20, 70],
      [15, 20, 75],
      [16, 20, 80],
      [17, 20, 85],
      [18, 20, 90],
      [19, 20, 95],
      [20, 20, 100],
    ])
  })

  it('should handle a failed chunk upload', async () => {
    // note that the upload mock is configured to report progress 2 times per chunk
    const chunkSize = 2
    const params = getParams({
      file: new File(['012456'], 'test.txt', { type: 'text/plain' }),
      chunkSize,
      apiWorkerUploadChunk: buildApiWorkerUploadChunk({
        chunkSize,
        failures: [
          { failCallIndex: 1, failChunkIndex: 1 },
          { failCallIndex: 2, failChunkIndex: 1 },
          { failCallIndex: 3, failChunkIndex: 0 },
        ],
      }),
      maxConcurrentChunks: 1,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(11)
    expect(
      params.onProgress.mock.calls.map(([params]) => [
        params.sent,
        params.total,
        params.percentage,
      ])
    ).toEqual([
      [1, 6, 17], // call 0
      [2, 6, 33],
      [3, 6, 50], // call 1
      [4, 6, 67], // fail
      [3, 6, 50], // call 2
      [4, 6, 67], // fail
      [3, 6, 50], // call 3 fail
      [3, 6, 50], // call 4
      [4, 6, 67],
      [5, 6, 83], // call 5
      [6, 6, 100],
    ])
  })

  it('should handle upload create error', async () => {
    const params = getParams()
    const multipartUpload = new MultipartUpload({
      ...params,
      apiBusUploadCreate: {
        post: jest.fn(() => Promise.reject(new Error('Create failed'))),
      },
    })
    await multipartUpload.start()
    expect(params.onError).toHaveBeenCalledWith(new Error('Create failed'))
  })

  it('should handle a user abort correctly', async () => {
    const params = getParams()
    const multipartUpload = new MultipartUpload(params)
    multipartUpload.start()
    await delay(10)
    await multipartUpload.abort()
    expect(params.apiBusUploadAbort.post).toHaveBeenCalledWith({
      payload: { bucket: 'test-bucket', path: 'test-path', uploadID: '12345' },
    })
    expect(params.onComplete).not.toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParams(params?: Partial<Record<keyof MultipartParams, any>>) {
  const file =
    params?.file ||
    new File(['0123456789'], 'test-file.txt', { type: 'text/plain' })
  const chunkSize = params?.chunkSize || 1
  return {
    bucket: 'test-bucket',
    path: 'test-path',
    chunkSize,
    maxConcurrentChunks: 1,
    file,
    apiWorkerUploadChunk: buildApiWorkerUploadChunk({ chunkSize }),
    apiBusUploadComplete: { post: jest.fn() },
    apiBusUploadCreate: {
      post: jest.fn(() =>
        Promise.resolve({
          status: 201,
          data: { uploadID: '12345' },
          headers: { ETag: 'etag' },
        })
      ),
    },
    apiBusUploadAbort: { post: jest.fn() },
    onProgress: jest.fn(),
    onError: jest.fn(),
    onComplete: jest.fn(),
    ...params,
  }
}

type Failure = {
  failCallIndex: number
  failChunkIndex: number
}

function buildApiWorkerUploadChunk({
  chunkSize,
  failures = [],
}: {
  failures?: Failure[]
  chunkSize: number
}) {
  let callIndex = -1
  return {
    put: jest.fn((...args) => {
      callIndex++
      return new Promise<Response<void>>((resolve, reject) => {
        const config = args[args.length - 1].config
        const onUploadProgress = config.axios.onUploadProgress

        // Simulate a series of progress events
        const eventCount = 2
        const progressChunkSize = chunkSize / eventCount
        const total = chunkSize
        let loaded = 0
        let chunkIndex = 0
        const intervalId = setInterval(() => {
          if (config.axios.signal?.aborted) {
            clearInterval(intervalId)
            reject(new Error('Abort'))
            return
          }
          const shouldFail = failures.find(
            (failure) =>
              callIndex === failure.failCallIndex &&
              chunkIndex === failure.failChunkIndex
          )
          loaded += progressChunkSize
          onUploadProgress({ type: 'progress', loaded, total })
          if (shouldFail) {
            clearInterval(intervalId)
            reject(new Error('Upload failed'))
          } else {
            if (loaded >= chunkSize) {
              clearInterval(intervalId)
              resolve({ status: 200, headers: { etag: 'etag' } })
            }
            chunkIndex++
          }
        }, 1)
      })
    }),
  }
}
