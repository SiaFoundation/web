import { triggerErrorToast } from '@siafoundation/design-system'
import { delay } from '@siafoundation/react-core'
import {
  useMultipartUploadAbort,
  useMultipartUploadPart,
  useMultipartUploadComplete,
  useMultipartUploadCreate,
} from '@siafoundation/renterd-react'
import {
  MultipartUploadAbortPayload,
  MultipartUploadCompletePayload,
  MultipartUploadPartParams,
} from '@siafoundation/renterd-types'

type ApiWorkerUploadPart = ReturnType<typeof useMultipartUploadPart>
type ApiBusUploadComplete = ReturnType<typeof useMultipartUploadComplete>
type ApiBusUploadCreate = ReturnType<typeof useMultipartUploadCreate>
type ApiBusUploadAbort = ReturnType<typeof useMultipartUploadAbort>

export type MultipartParams = {
  bucket: string
  key: string
  file: File
  api: {
    workerUploadPart: ApiWorkerUploadPart
    busUploadComplete: ApiBusUploadComplete
    busUploadCreate: ApiBusUploadCreate
    busUploadAbort: ApiBusUploadAbort
  }
  partSize?: number
  onProgress?: (event: {
    sent: number
    total: number
    percentage: number
  }) => void
  onError?: (error: Error) => void
  onComplete?: () => void
}

type UploadedPart = {
  partNumber: number
  eTag: string
}

export class MultipartUpload {
  // Static properties for global control
  static #globalMaxConcurrentParts = 5
  static #activeSlots = 0
  static #slotQueue: Array<() => void> = []

  static get activeSlots(): number {
    return MultipartUpload.#activeSlots
  }

  static setGlobalMaxConcurrentParts(max: number): void {
    if (max < 1) {
      throw new Error('globalMaxConcurrentParts must be at least 1.')
    }
    MultipartUpload.#globalMaxConcurrentParts = max
  }

  private static async acquireSlot(): Promise<void> {
    if (
      MultipartUpload.activeSlots < MultipartUpload.#globalMaxConcurrentParts
    ) {
      MultipartUpload.#activeSlots++
      return
    }

    // Wait for a slot to become available
    return new Promise<void>((resolve) => {
      MultipartUpload.#slotQueue.push(resolve)
    })
  }

  private static releaseSlot(): void {
    MultipartUpload.#activeSlots = Math.max(MultipartUpload.#activeSlots - 1, 0)

    const nextUpload = MultipartUpload.#slotQueue.shift()
    if (nextUpload) {
      MultipartUpload.#activeSlots++
      nextUpload()
    }
  }

  // params
  #bucket: string
  #key: string
  #file: File
  #partSize: number
  #api: {
    workerUploadPart: ApiWorkerUploadPart
    busUploadComplete: ApiBusUploadComplete
    busUploadCreate: ApiBusUploadCreate
    busUploadAbort: ApiBusUploadAbort
  }
  #onProgress: (progress: {
    sent: number
    total: number
    percentage: number
  }) => void
  #onError: (error: Error) => void
  #onComplete: () => void

  // state
  #resolve: () => void = () => null
  #progressCache: Record<number, number>
  #activeConnections: Record<number, AbortController>
  #pendingPartNumbers: number[]
  #uploadedParts: UploadedPart[]
  #uploadId?: string
  #aborted: boolean
  #completed: boolean
  // error retry backoff
  #initialDelay = 500 // 1/2 second
  #maxDelay = 60_000 // 1 minute
  #currentDelay = this.#initialDelay

  constructor(options: MultipartParams) {
    // params
    this.#bucket = options.bucket
    this.#key = options.key
    this.#partSize = options.partSize || 1024 * 1024 * 5
    this.#file = options.file
    this.#api = options.api
    this.#onProgress = options.onProgress || (() => null)
    this.#onError = options.onError || (() => null)
    this.#onComplete = options.onComplete || (() => null)

    // state
    this.#progressCache = {}
    this.#activeConnections = {}
    this.#pendingPartNumbers = []
    this.#uploadedParts = []
    this.#uploadId = undefined
    this.#aborted = false
    this.#completed = false
  }

  public async create() {
    const createPayload = {
      bucket: this.#bucket,
      key: this.#key,
    }
    const response = await this.#api.busUploadCreate.post({
      payload: createPayload,
    })

    if (!response.data?.uploadID) {
      return undefined
    }

    this.#uploadId = response.data.uploadID

    const partCount = Math.ceil(this.#file.size / this.#partSize)
    this.#pendingPartNumbers = Array.from(
      { length: partCount },
      (_, i) => i + 1
    )
    return this.#uploadId
  }

  public async start() {
    const promise = new Promise<void>((resolve) => {
      this.#resolve = resolve
    })

    const workers = Math.min(
      MultipartUpload.#globalMaxConcurrentParts,
      Math.ceil(this.#file.size / this.#partSize)
    )

    // Run enough workers per multipart upload to saturate the global
    // concurrency limit. If the specific multipart upload has less parts than
    // the global limit, the workers will exit early and the slots will be used
    // by other uploads.
    for (let i = 0; i < workers; i++) {
      void this.#runWorker(i)
    }

    await promise
  }

  public async abort() {
    this.#aborted = true
    Object.keys(this.#activeConnections)
      .map(Number)
      .forEach((id) => {
        this.#activeConnections[id].abort()
      })

    if (this.#uploadId) {
      try {
        await this.#api.busUploadAbort.post({
          payload: {
            bucket: this.#bucket,
            key: this.#key,
            uploadID: this.#uploadId,
          } as MultipartUploadAbortPayload,
        })
      } catch (e) {
        triggerErrorToast({
          title: 'Error aborting upload',
          body: (e as Error).message,
        })
      }
    }
    this.#resolve?.()
  }

  public setOnProgress(
    onProgress: (progress: {
      sent: number
      total: number
      percentage: number
    }) => void
  ) {
    this.#onProgress = onProgress
  }

  public setOnError(onError: (error: Error) => void) {
    this.#onError = onError
  }

  public setOnComplete(onComplete: () => void) {
    this.#onComplete = onComplete
  }

  /**
   * Worker loop. Fetches the next part (if any) and uploads it. Exits when there
   * are no remaining parts or the upload has been aborted/completed.
   */
  async #runWorker(workerId: number): Promise<void> {
    // Acquire a slot once for the lifetime of this worker. This guarantees that
    // slots stay with the earliest upload, giving it priority until its queue
    // of parts is empty.
    await MultipartUpload.acquireSlot()

    try {
      while (!this.#aborted && !this.#completed) {
        const partNumber = this.#getNextPart()

        // All parts processed, shutdown worker.
        if (!partNumber) {
          break
        }

        try {
          const partOffset = (partNumber - 1) * this.#partSize
          const partData = this.#file.slice(
            partOffset,
            partOffset + this.#partSize
          )
          await this.#upload(partNumber, partData, partOffset)
          this.#resetDelay()
        } catch (error) {
          if (error instanceof ErrorCanceledRequest) {
            // Ignore canceled.
          } else if (error instanceof ErrorNoETag) {
            await this.abort()
            this.#onError(error)
            break
          } else {
            // Transient/network error, put back and retry after backoff.
            this.#addPartBackToQueue(partNumber)
            await this.#waitToRetry()
          }
        }
      }
    } finally {
      // Free the slot when the worker finishes.
      MultipartUpload.releaseSlot()
      // Check if job is complete after releasing.
      this.#completeIfReady()
    }
  }

  /**
   * Pops the next part number.
   * Returns undefined if none remain.
   */
  #getNextPart(): number | undefined {
    return this.#pendingPartNumbers.pop()
  }

  /**
   * Add a part number back to the queue.
   * This is used to retry failed uploads.
   */
  #addPartBackToQueue(partNumber: number) {
    this.#pendingPartNumbers.push(partNumber)
  }

  #resetDelay() {
    this.#currentDelay = this.#initialDelay
  }

  async #waitToRetry() {
    // Increase the delay for the next retry, capped at the maximum delay.
    const backoff = delay(this.#currentDelay)
    this.#currentDelay = Math.min(this.#currentDelay * 2, this.#maxDelay)
    await backoff
  }

  /**
   * If there are no more active connections or pending parts, finalise.
   */
  async #completeIfReady() {
    if (
      !this.#completed &&
      !this.#aborted &&
      !this.#pendingPartNumbers.length &&
      !Object.keys(this.#activeConnections).length
    ) {
      this.#completed = true

      try {
        const payload = {
          bucket: this.#bucket,
          key: this.#key,
          uploadID: this.#uploadId,
          parts: this.#uploadedParts.sort(
            (a, b) => a.partNumber - b.partNumber
          ),
        } as MultipartUploadCompletePayload
        await this.#api.busUploadComplete.post({
          payload: payload,
        })
        this.#onComplete()
      } catch (error) {
        this.#onError(error as Error)
      }
      this.#resolve()
    }
  }

  #handleProgress(partNumber: number, event: ProgressEvent) {
    this.#progressCache[partNumber] = event.loaded

    const progressTotal = Object.keys(this.#progressCache)
      .map(Number)
      .reduce((acc, id) => (acc += this.#progressCache[id]), 0)

    const sent = Math.min(progressTotal, this.#file.size)
    const total = this.#file.size

    const percentage = Math.round((sent / total) * 100)

    this.#onProgress({
      sent: sent,
      total: total,
      percentage: percentage,
    })
  }

  async #upload(
    partNumber: number,
    partData: Blob,
    partOffset: number
  ): Promise<void> {
    const controller = new AbortController()
    this.#activeConnections[partNumber] = controller

    try {
      const response = await this.#api.workerUploadPart.put({
        params: {
          key: this.#key.slice(1),
          bucket: this.#bucket,
          uploadid: this.#uploadId,
          encryptionoffset: partOffset,
          partnumber: partNumber,
        } as MultipartUploadPartParams,
        payload: partData,
        config: {
          axios: {
            onUploadProgress: (e) => this.#handleProgress(partNumber, e),
            signal: controller.signal,
          },
        },
      })

      // Errors such as aborted/canceled requests.
      if (response.error) {
        if (response.error === 'canceled') {
          throw new ErrorCanceledRequest()
        }
        throw new Error(response.error)
      }

      const eTag = response.headers?.['etag']
      if (!eTag) {
        throw new ErrorNoETag()
      }

      const uploadedPart = {
        partNumber: partNumber,
        // Remove the " enclosing characters from the raw ETag.
        eTag: eTag.replace(/"/g, ''),
      }

      this.#uploadedParts.push(uploadedPart)
    } finally {
      delete this.#activeConnections[partNumber]
    }
  }
}

export class ErrorCanceledRequest extends Error {
  constructor() {
    super('canceled')
    this.name = 'CanceledError'
  }
}

export class ErrorNoETag extends Error {
  constructor() {
    super('No ETag in response, add ETag to Access-Control-Expose-Headers list')
    this.name = 'NoETagError'
  }
}
