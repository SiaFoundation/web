import { Response, delay } from '@siafoundation/react-core'
import {
  ErrorNoETag,
  MultipartParams,
  MultipartUpload,
} from './multipartUpload'

describe('MultipartUpload', () => {
  it('should report progress and complete with serial parts', async () => {
    // note that the upload mock is configured to report progress 2 times per part
    const params = getMockedParams({
      file: new File(['01234567890123456789'], 'test.txt', {
        type: 'text/plain',
      }),
      partSize: 2,
      maxConcurrentParts: 1,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
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
    expect(params.api.busUploadComplete.post).toHaveBeenCalledWith({
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
        key: 'test-path',
        uploadID: '12345',
      },
    })
    expect(params.onComplete).toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
  })

  it('should report progress and complete with concurrent parts', async () => {
    // note that the upload mock is configured to report progress 2 times per part
    const params = getMockedParams({
      file: new File(['01234567890123456789'], 'test.txt', {
        type: 'text/plain',
      }),
      partSize: 2,
      maxConcurrentParts: 5,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
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
    expect(params.api.busUploadComplete.post).toHaveBeenCalledWith({
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
        key: 'test-path',
        uploadID: '12345',
      },
    })
    expect(params.onComplete).toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
  })

  it('should backoff and recover from a failed part upload', async () => {
    // note that the upload mock is configured to report progress 2 times per part
    const startTime = Date.now()
    const partSize = 2
    const params = getMockedParams({
      file: new File(['012456'], 'test.txt', { type: 'text/plain' }),
      partSize,
      api: {
        workerUploadPart: buildMockApiWorkerUploadPart({
          partSize,
          failures: [
            { failCallIndex: 1, failPartIndex: 1 },
            { failCallIndex: 2, failPartIndex: 1 },
            { failCallIndex: 3, failPartIndex: 0 },
          ],
        }),
      },
      maxConcurrentParts: 1,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
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
    expect(params.api.busUploadComplete.post).toHaveBeenCalledWith({
      payload: {
        bucket: 'test-bucket',
        parts: [
          { eTag: 'etag-1', partNumber: 1 },
          { eTag: 'etag-2', partNumber: 2 },
          { eTag: 'etag-3', partNumber: 3 },
        ],
        key: 'test-path',
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

  it('should abort the entire upload and error if a part is missing an etag', async () => {
    // note that the upload mock is configured to report progress 2 times per part
    const partSize = 2
    const params = getMockedParams({
      file: new File(['012456'], 'test.txt', { type: 'text/plain' }),
      partSize,
      api: {
        workerUploadPart: buildMockApiWorkerUploadPart({
          partSize,
          failures: [
            { failCallIndex: 1, failPartIndex: 1, type: 'missingEtag' },
          ],
        }),
      },
      maxConcurrentParts: 1,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(4)
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
    ])
    expect(params.api.busUploadComplete.post).not.toHaveBeenCalled()
    expect(params.onComplete).not.toHaveBeenCalled()
    expect(params.onError).toHaveBeenCalledWith(expect.any(ErrorNoETag))
  })

  it('should handle an upload create error', async () => {
    const params = getMockedParams()
    const multipartUpload = new MultipartUpload({
      ...params,
      api: {
        ...params?.api,
        busUploadCreate: {
          post: jest.fn(() => Promise.reject(new Error('Create failed'))),
        },
      },
    })
    try {
      await multipartUpload.create()
    } catch (e) {
      expect(e).toEqual(new Error('Create failed'))
    }
  })

  it('should handle an intentional abort correctly', async () => {
    const params = getMockedParams()
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
    multipartUpload.start()
    // allow the upload to get created and begin
    await delay(10)
    await multipartUpload.abort()
    expect(params.api.busUploadAbort.post).toHaveBeenCalledWith({
      payload: { bucket: 'test-bucket', key: 'test-path', uploadID: '12345' },
    })
    expect(params.onComplete).not.toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMockedParams(params?: Partial<Record<keyof MultipartParams, any>>) {
  const {
    partSize: paramsPartSize,
    file: paramsFile,
    api: paramsApi,
    ...paramsRest
  } = params || {}
  const file =
    paramsFile ||
    new File(['0123456789'], 'test-file.txt', { type: 'text/plain' })
  const partSize = paramsPartSize || 1
  return {
    bucket: 'test-bucket',
    key: 'test-path',
    partSize,
    maxConcurrentParts: 1,
    file,
    api: {
      workerUploadPart: buildMockApiWorkerUploadPart({ partSize }),
      busUploadComplete: { post: jest.fn() },
      busUploadCreate: {
        post: jest.fn(() =>
          Promise.resolve({
            status: 201,
            data: { uploadID: '12345' },
            headers: { ETag: 'etag' },
          })
        ),
      },
      busUploadAbort: { post: jest.fn() },
      ...paramsApi,
    },
    onProgress: jest.fn(),
    onError: jest.fn(),
    onComplete: jest.fn(),
    ...paramsRest,
  }
}

type Failure = {
  failCallIndex: number
  failPartIndex: number
  type?: 'partFailed' | 'missingEtag'
}

function buildMockApiWorkerUploadPart({
  partSize,
  failures = [],
}: {
  failures?: Failure[]
  partSize: number
}) {
  let currentCallIndex = -1
  return {
    put: jest.fn((args) => {
      const callIndex = ++currentCallIndex
      return new Promise<Response<void>>((resolve, reject) => {
        const onUploadProgress = args.config.axios.onUploadProgress

        // Simulate a series of progress events
        const eventCount = 2
        const progressPartSize = partSize / eventCount
        const total = partSize
        let loaded = 0
        let partIndex = 0
        const eTag = `etag-${args.params.partnumber}`
        const intervalId = setInterval(() => {
          if (args.config.axios.signal?.aborted) {
            clearInterval(intervalId)
            reject(new Error('Abort'))
            return
          }
          const failure = failures.find(
            (failure) =>
              callIndex === failure.failCallIndex &&
              partIndex === failure.failPartIndex
          )
          loaded += progressPartSize
          onUploadProgress({ type: 'progress', loaded, total })
          if ((failure && !failure.type) || failure?.type === 'partFailed') {
            clearInterval(intervalId)
            reject(new Error('Upload failed'))
          } else {
            if (loaded >= partSize) {
              clearInterval(intervalId)
              resolve({
                status: 200,
                headers: {
                  etag: failure?.type === 'missingEtag' ? undefined : eTag,
                },
              })
            }
            partIndex++
          }
        }, 1)
      })
    }),
  }
}
