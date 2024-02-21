import { Response, delay } from '@siafoundation/react-core'
import { MultipartParams, MultipartUpload } from './multipartUpload'

describe('MultipartUpload', () => {
  it('should report progress and complete with serial chunks', async () => {
    // note that the upload mock is configured to report progress 2 times per chunk
    const params = getMockedParams({
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
    expect(params.apiBusUploadComplete.post).toHaveBeenCalledWith({
      payload: {
        bucket: 'test-bucket',
        parts: [
          { eTag: 'etag-1', partNumber: 1 },
          { eTag: 'etag-2', partNumber: 2 },
          { eTag: 'etag-3', partNumber: 3 },
          { eTag: 'etag-4', partNumber: 4 },
          { eTag: 'etag-5', partNumber: 5 },
          { eTag: 'etag-6', partNumber: 6 },
          { eTag: 'etag-7', partNumber: 7 },
          { eTag: 'etag-8', partNumber: 8 },
          { eTag: 'etag-9', partNumber: 9 },
          { eTag: 'etag-10', partNumber: 10 },
        ],
        path: 'test-path',
        uploadID: '12345',
      },
    })
    expect(params.onComplete).toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
  })

  it('should report progress and complete with concurrent chunks', async () => {
    // note that the upload mock is configured to report progress 2 times per chunk
    const params = getMockedParams({
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
    expect(params.apiBusUploadComplete.post).toHaveBeenCalledWith({
      payload: {
        bucket: 'test-bucket',
        parts: [
          { eTag: 'etag-1', partNumber: 1 },
          { eTag: 'etag-2', partNumber: 2 },
          { eTag: 'etag-3', partNumber: 3 },
          { eTag: 'etag-4', partNumber: 4 },
          { eTag: 'etag-5', partNumber: 5 },
          { eTag: 'etag-6', partNumber: 6 },
          { eTag: 'etag-7', partNumber: 7 },
          { eTag: 'etag-8', partNumber: 8 },
          { eTag: 'etag-9', partNumber: 9 },
          { eTag: 'etag-10', partNumber: 10 },
        ],
        path: 'test-path',
        uploadID: '12345',
      },
    })
    expect(params.onComplete).toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
  })

  it('should backoff and recover from a failed chunk upload', async () => {
    // note that the upload mock is configured to report progress 2 times per chunk
    const startTime = Date.now()
    const chunkSize = 2
    const params = getMockedParams({
      file: new File(['012456'], 'test.txt', { type: 'text/plain' }),
      chunkSize,
      apiWorkerUploadChunk: buildMockApiWorkerUploadChunk({
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
    expect(params.apiBusUploadComplete.post).toHaveBeenCalledWith({
      payload: {
        bucket: 'test-bucket',
        parts: [
          { eTag: 'etag-1', partNumber: 1 },
          { eTag: 'etag-2', partNumber: 2 },
          { eTag: 'etag-3', partNumber: 3 },
        ],
        path: 'test-path',
        uploadID: '12345',
      },
    })
    expect(params.onComplete).toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    // test that 3 iterations of backoff time were added
    expect(elapsedTime).toBeGreaterThanOrEqual(3500)
  }, 10_000)

  it('should handle an upload create error', async () => {
    const params = getMockedParams()
    const multipartUpload = new MultipartUpload({
      ...params,
      apiBusUploadCreate: {
        post: jest.fn(() => Promise.reject(new Error('Create failed'))),
      },
    })
    await multipartUpload.start()
    expect(params.onError).toHaveBeenCalledWith(new Error('Create failed'))
  })

  it('should handle an intentional abort correctly', async () => {
    const params = getMockedParams()
    const multipartUpload = new MultipartUpload(params)
    multipartUpload.start()
    // allow the upload to get created and begin
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
function getMockedParams(params?: Partial<Record<keyof MultipartParams, any>>) {
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
    apiWorkerUploadChunk: buildMockApiWorkerUploadChunk({ chunkSize }),
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

function buildMockApiWorkerUploadChunk({
  chunkSize,
  failures = [],
}: {
  failures?: Failure[]
  chunkSize: number
}) {
  let currentCallIndex = -1
  return {
    put: jest.fn((args) => {
      const callIndex = ++currentCallIndex
      return new Promise<Response<void>>((resolve, reject) => {
        const onUploadProgress = args.config.axios.onUploadProgress

        // Simulate a series of progress events
        const eventCount = 2
        const progressChunkSize = chunkSize / eventCount
        const total = chunkSize
        let loaded = 0
        let chunkIndex = 0
        const eTag = `etag-${args.params.partnumber}`
        const intervalId = setInterval(() => {
          if (args.config.axios.signal?.aborted) {
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
              resolve({
                status: 200,
                headers: { etag: eTag },
              })
            }
            chunkIndex++
          }
        }, 1)
      })
    }),
  }
}
