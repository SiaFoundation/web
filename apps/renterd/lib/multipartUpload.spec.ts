import { Response, delay } from '@siafoundation/react-core'
import {
  ErrorNoETag,
  MultipartParams,
  MultipartUpload,
} from './multipartUpload'
import { RawAxiosResponseHeaders } from 'axios'

describe('MultipartUpload', () => {
  it('should report progress and complete with serial parts', async () => {
    MultipartUpload.setGlobalMaxConcurrentParts(1)
    const file = new File(['01234567890123456789'], 'test.txt', {
      type: 'text/plain',
    })
    const params = getMockedParams({
      file,
      partSize: 2,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(20)
    expect(
      params.onProgress.mock.calls.map(
        ([params]: [{ sent: number; total: number; percentage: number }]) => [
          params.sent,
          params.total,
          params.percentage,
        ],
      ),
    ).toEqual([
      // The upload mock is configured to report progress 2 times per part.
      [1, 20, 5], // attempt 0 progress 0
      [2, 20, 10], // attempt 0 progress 1
      [3, 20, 15], // attempt 1 progress 0
      [4, 20, 20], // attempt 1 progress 1
      [5, 20, 25], // attempt 2 progress 0
      [6, 20, 30], // attempt 2 progress 1
      [7, 20, 35], // attempt 3 progress 0
      [8, 20, 40], // attempt 3 progress 1
      [9, 20, 45], // attempt 4 progress 0
      [10, 20, 50], // attempt 4 progress 1
      [11, 20, 55], // attempt 5 progress 0
      [12, 20, 60], // attempt 5 progress 1
      [13, 20, 65], // attempt 6 progress 0
      [14, 20, 70], // attempt 6 progress 1
      [15, 20, 75], // attempt 7 progress 0
      [16, 20, 80], // attempt 7 progress 1
      [17, 20, 85], // attempt 8 progress 0
      [18, 20, 90], // attempt 8 progress 1
      [19, 20, 95], // attempt 9 progress 0
      [20, 20, 100], // attempt 9 progress 1
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
    MultipartUpload.setGlobalMaxConcurrentParts(5)
    const file = new File(['01234567890123456789'], 'test.txt', {
      type: 'text/plain',
    })
    const params = getMockedParams({
      file,
      partSize: 2,
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(20)
    expect(
      params.onProgress.mock.calls.map(
        ([params]: [{ sent: number; total: number; percentage: number }]) => [
          params.sent,
          params.total,
          params.percentage,
        ],
      ),
    ).toEqual([
      // The upload mock is configured to report progress 2 times per part.
      [1, 20, 5], // attempt 0 progress 0
      [2, 20, 10], // attempt 0 progress 1
      [3, 20, 15], // attempt 1 progress 0
      [4, 20, 20], // attempt 1 progress 1
      [5, 20, 25], // attempt 2 progress 0
      [6, 20, 30], // attempt 2 progress 1
      [7, 20, 35], // attempt 3 progress 0
      [8, 20, 40], // attempt 3 progress 1
      [9, 20, 45], // attempt 4 progress 0
      [10, 20, 50], // attempt 4 progress 1
      [11, 20, 55], // attempt 5 progress 0
      [12, 20, 60], // attempt 5 progress 1
      [13, 20, 65], // attempt 6 progress 0
      [14, 20, 70], // attempt 6 progress 1
      [15, 20, 75], // attempt 7 progress 0
      [16, 20, 80], // attempt 7 progress 1
      [17, 20, 85], // attempt 8 progress 0
      [18, 20, 90], // attempt 8 progress 1
      [19, 20, 95], // attempt 9 progress 0
      [20, 20, 100], // attempt 9 progress 1
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
    MultipartUpload.setGlobalMaxConcurrentParts(1)
    const startTime = Date.now()
    const partSize = 2
    const file = new File(['012456'], 'test.txt', { type: 'text/plain' })
    const params = getMockedParams({
      file,
      partSize,
      api: {
        workerUploadPart: buildMockApiWorkerUploadPart({
          filename: file.name,
          partSize,
          failures: [
            { failPartAttemptIndex: 1, failPartProgressIndex: 1 },
            { failPartAttemptIndex: 2, failPartProgressIndex: 1 },
            { failPartAttemptIndex: 3, failPartProgressIndex: 0 },
          ],
        }),
      },
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(11)
    expect(
      params.onProgress.mock.calls.map(
        ([params]: [{ sent: number; total: number; percentage: number }]) => [
          params.sent,
          params.total,
          params.percentage,
        ],
      ),
    ).toEqual([
      // The upload mock is configured to report progress 2 times per part.
      [1, 6, 17], // attempt 0 progress 0
      [2, 6, 33], // attempt 0 progress 1
      [3, 6, 50], // attempt 1 progress 0
      [4, 6, 67], // attempt 1 progress 1 fails
      [3, 6, 50], // attempt 2 progress 0
      [4, 6, 67], // attempt 2 progress 1 fails
      [3, 6, 50], // attempt 3 progress 0 fails
      [3, 6, 50], // attempt 4 progress 0
      [4, 6, 67], // attempt 4 progress 1
      [5, 6, 83], // attempt 5 progress 0
      [6, 6, 100], // attempt 5 progress 1
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
    MultipartUpload.setGlobalMaxConcurrentParts(1)
    const partSize = 2
    const file = new File(['012456'], 'test.txt', { type: 'text/plain' })
    const params = getMockedParams({
      file,
      partSize,
      api: {
        workerUploadPart: buildMockApiWorkerUploadPart({
          filename: file.name,
          partSize,
          failures: [
            {
              failPartAttemptIndex: 1,
              failPartProgressIndex: 1,
              type: 'missingEtag',
            },
          ],
        }),
      },
    })
    const multipartUpload = new MultipartUpload(params)
    await multipartUpload.create()
    await multipartUpload.start()
    expect(params.onProgress.mock.calls.length).toBe(4)
    expect(
      params.onProgress.mock.calls.map(
        ([params]: [{ sent: number; total: number; percentage: number }]) => [
          params.sent,
          params.total,
          params.percentage,
        ],
      ),
    ).toEqual([
      // The upload mock is configured to report progress 2 times per part.
      [1, 6, 17], // attempt 0 progress 0
      [2, 6, 33], // attempt 0 progress 1
      [3, 6, 50], // attempt 1 progress 0
      [4, 6, 67], // attempt 1 progress 1 fails
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
    // Allow the upload to get created and begin.
    await delay(10)
    await multipartUpload.abort()
    expect(params.api.busUploadAbort.post).toHaveBeenCalledWith({
      payload: { bucket: 'test-bucket', key: 'test-path', uploadID: '12345' },
    })
    expect(params.onComplete).not.toHaveBeenCalled()
    expect(params.onError).not.toHaveBeenCalled()
  })

  it('can handle multiple parallel uploads with slot priority', async () => {
    MultipartUpload.setGlobalMaxConcurrentParts(5)

    const file1 = new File(['0123456789'], 'uploadA.txt', {
      type: 'text/plain',
    })
    const file2 = new File(['0123456789'], 'uploadB.txt', {
      type: 'text/plain',
    })
    const partLog: string[] = []

    const params1 = getMockedParams({
      file: file1,
      partLog,
    })
    const params2 = getMockedParams({
      file: file2,
      partLog,
    })

    const p1 = new MultipartUpload(params1)
    const p2 = new MultipartUpload(params2)
    await Promise.all([p1.create(), p2.create()])
    await Promise.all([p1.start(), p2.start()])

    expect(params1.onComplete).toHaveBeenCalled()
    expect(params2.onComplete).toHaveBeenCalled()

    await delay(500)
    expect(MultipartUpload.activeSlots).toBe(0)

    // Assert that the partLog is in the correct order with all file1 parts
    // first and then all file2 parts.
    expect(partLog).toEqual(
      Array(10).fill(file1.name).concat(Array(10).fill(file2.name)),
    )
  })
})

function getMockedParams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Partial<Record<keyof MultipartParams, any>> & { partLog?: string[] },
) {
  const {
    partSize: paramsPartSize,
    file: paramsFile,
    api: paramsApi,
    partLog,
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
    maxConcurrentRequests: 1,
    file,
    api: {
      workerUploadPart: buildMockApiWorkerUploadPart({
        partSize,
        filename: file.name,
        partLog,
      }),
      busUploadComplete: { post: jest.fn() },
      busUploadCreate: {
        post: jest.fn(() =>
          Promise.resolve({
            status: 201,
            data: { uploadID: '12345' },
            headers: { ETag: 'etag' },
          }),
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
  failPartAttemptIndex: number
  failPartProgressIndex: number
  type?: 'partFailed' | 'missingEtag'
}

function buildMockApiWorkerUploadPart({
  partSize,
  failures = [],
  filename,
  partLog,
}: {
  filename: string
  failures?: Failure[]
  partSize: number
  partLog?: string[]
}) {
  let currentPartAttemptIndex = -1
  return {
    put: jest.fn((args) => {
      currentPartAttemptIndex++

      partLog?.push(filename)

      return new Promise<Response<void>>((resolve, reject) => {
        const onUploadProgress = args.config.axios.onUploadProgress

        // Simulate a series of progress events.
        const eventCount = 2
        const progressPartSize = partSize / eventCount
        const total = partSize
        let loaded = 0
        let progressIndex = 0
        const eTag = `etag-${args.params.partnumber}`
        const intervalId = setInterval(() => {
          if (args.config.axios.signal?.aborted) {
            clearInterval(intervalId)
            reject(new Error('Abort'))
            return
          }
          const failure = failures.find(
            (failure) =>
              currentPartAttemptIndex === failure.failPartAttemptIndex &&
              progressIndex === failure.failPartProgressIndex,
          )
          loaded += progressPartSize
          onUploadProgress({ type: 'progress', loaded, total })
          if ((failure && !failure.type) || failure?.type === 'partFailed') {
            clearInterval(intervalId)
            reject(new Error('Upload failed'))
          } else {
            if (loaded >= partSize) {
              clearInterval(intervalId)

              const headers: RawAxiosResponseHeaders = {
                etag: eTag,
              }
              if (failure?.type === 'missingEtag') {
                delete headers.etag
              }
              resolve({
                status: 200,
                headers,
              })
            }
            progressIndex++
          }
        }, 1)
      })
    }),
  }
}
