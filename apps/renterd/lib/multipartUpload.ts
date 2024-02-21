import { triggerErrorToast } from '@siafoundation/design-system'
import { delay } from '@siafoundation/react-core'
import {
  useMultipartUploadAbort,
  useMultipartUploadChunk,
  useMultipartUploadComplete,
  useMultipartUploadCreate,
} from '@siafoundation/react-renterd'

type ApiWorkerUploadChunk = ReturnType<typeof useMultipartUploadChunk>
type ApiBusUploadComplete = ReturnType<typeof useMultipartUploadComplete>
type ApiBusUploadCreate = ReturnType<typeof useMultipartUploadCreate>
type ApiBusUploadAbort = ReturnType<typeof useMultipartUploadAbort>

export type MultipartParams = {
  bucket: string
  path: string
  file: File
  apiWorkerUploadChunk: ApiWorkerUploadChunk
  apiBusUploadComplete: ApiBusUploadComplete
  apiBusUploadCreate: ApiBusUploadCreate
  apiBusUploadAbort: ApiBusUploadAbort
  chunkSize?: number
  maxConcurrentChunks?: number
  onProgress?: (event: {
    sent: number
    total: number
    percentage: number
  }) => void
  onError?: (error: Error) => void
  onComplete: () => void
}

type UploadedPart = {
  partNumber: number
  eTag: string
}

export class MultipartUpload {
  // params
  #bucket: string
  #path: string
  #file: File
  #chunkSize: number
  #maxConcurrentChunks: number
  #apiWorkerUploadChunk: ApiWorkerUploadChunk
  #apiBusUploadComplete: ApiBusUploadComplete
  #apiBusUploadCreate: ApiBusUploadCreate
  #apiBusUploadAbort: ApiBusUploadAbort
  #onProgress: (progress: {
    sent: number
    total: number
    percentage: number
  }) => void
  #onError: (error: Error) => void
  #onComplete: () => void

  // state
  #resolve: () => void
  #progressCache: Record<number, number>
  #activeConnections: Record<number, AbortController>
  #pendingPartNumbers: number[]
  #uploadedParts: UploadedPart[]
  #uploadId: string
  // error retry backoff
  #initialDelay = 500 // 1/2 second
  #maxDelay = 60_000 // 1 minute
  #currentDelay = this.#initialDelay

  constructor(options: MultipartParams) {
    // params
    this.#bucket = options.bucket
    this.#path = options.path
    this.#chunkSize = options.chunkSize || 1024 * 1024 * 5
    this.#maxConcurrentChunks = Math.min(options.maxConcurrentChunks || 5, 15)
    this.#file = options.file
    this.#apiWorkerUploadChunk = options.apiWorkerUploadChunk
    this.#apiBusUploadAbort = options.apiBusUploadAbort
    this.#apiBusUploadComplete = options.apiBusUploadComplete
    this.#apiBusUploadCreate = options.apiBusUploadCreate
    this.#onProgress = options.onProgress || (() => null)
    this.#onError = options.onError || (() => null)
    this.#onComplete = options.onComplete || (() => null)

    // state
    this.#progressCache = {}
    this.#activeConnections = {}
    this.#pendingPartNumbers = []
    this.#uploadedParts = []
    this.#uploadId = null
  }

  public async start() {
    const promise = new Promise<void>((resolve) => {
      this.#resolve = resolve
    })
    try {
      const createPayload = {
        bucket: this.#bucket,
        key: 'key:0000000000000000000000000000000000000000000000000000000000000000',
        path: this.#path,
      }
      const response = await this.#apiBusUploadCreate.post({
        payload: createPayload,
      })

      this.#uploadId = response.data?.uploadID

      const partCount = Math.ceil(this.#file.size / this.#chunkSize)
      this.#pendingPartNumbers = Array.from(
        { length: partCount },
        (_, i) => i + 1
      )

      this.#sendNext()
    } catch (error) {
      this.#complete(error)
    }
    await promise
  }

  public abort() {
    Object.keys(this.#activeConnections)
      .map(Number)
      .forEach((id) => {
        this.#activeConnections[id].abort()
      })

    try {
      this.#apiBusUploadAbort.post({
        payload: {
          bucket: this.#bucket,
          path: this.#path,
          uploadID: this.#uploadId,
        },
      })
    } catch (e) {
      triggerErrorToast(e.message)
    }
  }

  async #sendNext() {
    const activeConnections = Object.keys(this.#activeConnections).length

    if (activeConnections >= this.#maxConcurrentChunks) {
      return
    }

    if (!this.#pendingPartNumbers.length) {
      if (!activeConnections) {
        this.#complete()
      }

      return
    }

    const partNumber = this.#pendingPartNumbers.pop()
    const partIndex = partNumber - 1
    const chunkOffset = partIndex * this.#chunkSize
    const chunk = this.#file.slice(chunkOffset, chunkOffset + this.#chunkSize)

    // Callback to start another upload after the current one is added to the
    // active connections.
    // This will boot up the max concurrent uploads.
    const tryStartingAnother = () => {
      this.#sendNext()
    }

    try {
      await this.#upload(partNumber, chunk, chunkOffset, tryStartingAnother)
      // On successful upload, reset the delay
      this.#resetDelay()
    } catch (error) {
      this.#pendingPartNumbers.push(partNumber)
      await this.#waitToRetry()
    }
    // try again even after a part errors
    this.#sendNext()
  }

  #resetDelay() {
    this.#currentDelay = this.#initialDelay
  }

  async #waitToRetry() {
    // Increase the delay for the next retry, capped at the maximum delay
    const backoff = delay(this.#currentDelay)
    this.#currentDelay = Math.min(this.#currentDelay * 2, this.#maxDelay)
    await backoff
  }

  async #complete(error?: Error) {
    if (error) {
      this.abort()
      this.#onError(error)
    } else {
      try {
        const payload = {
          bucket: this.#bucket,
          path: this.#path,
          uploadID: this.#uploadId,
          parts: this.#uploadedParts.sort(
            (a, b) => a.partNumber - b.partNumber
          ),
        }
        await this.#apiBusUploadComplete.post({
          payload: payload,
        })
        this.#onComplete()
      } catch (error) {
        this.#onError(error)
      }
    }
    this.#resolve()
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
    chunk: Blob,
    chunkOffset: number,
    afterConnectionIsAdded: () => void
  ): Promise<void> {
    const controller = new AbortController()
    this.#activeConnections[partNumber] = controller
    afterConnectionIsAdded()
    try {
      const response = await this.#apiWorkerUploadChunk.put({
        params: {
          key: this.#path.slice(1),
          bucket: this.#bucket,
          uploadid: this.#uploadId,
          offset: chunkOffset,
          partnumber: partNumber,
          disablepreshardingencryption: false,
        },
        payload: chunk,
        config: {
          axios: {
            onUploadProgress: (e) => this.#handleProgress(partNumber, e),
            signal: controller.signal,
          },
        },
      })

      const eTag = response.headers['etag']
      if (!eTag) {
        throw new Error(
          'No ETag in response, add ETag to Access-Control-Expose-Headers list'
        )
      }
      const uploadedPart = {
        partNumber: partNumber,
        // removing the " enclosing characters from the raw ETag
        eTag: eTag.replace(/"/g, ''),
      }

      this.#uploadedParts.push(uploadedPart)
      delete this.#activeConnections[partNumber]
    } catch (e) {
      delete this.#activeConnections[partNumber]
      throw e
    }
  }
}
