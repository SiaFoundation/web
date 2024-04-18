import MockAdapter from 'axios-mock-adapter'
import { Bus } from './bus'
import { Worker } from './worker'

describe('renterd-js', () => {
  const api = 'https://sia.tech/api'
  const password = 'password1337'

  it('default data and headers support json', async () => {
    const bus = Bus({
      api,
      password,
    })
    const mock = new MockAdapter(bus.axios)

    const bucket = 'newbucket'
    const url = `/bus/buckets`
    const fullUrl = `${api}${url}`

    mock.onPost(fullUrl).reply((config) => {
      expect(config.url).toBe(url)
      expect(config.method).toBe('post')
      expect(config.headers?.['Content-Type']).toMatch(/application\/json/)
      expect(config.data).toEqual(
        JSON.stringify({
          name: bucket,
        })
      )
      return [200, { name: bucket }]
    })

    const response = await bus.bucketCreate({
      data: {
        name: bucket,
      },
    })

    expect(response.status).toBe(200)
  })

  it('object upload should send file as multipart form data', async () => {
    const worker = Worker({
      api,
      password,
    })
    const mock = new MockAdapter(worker.axios)

    const bucket = 'default'
    const name = 'test.txt'
    const fileKey = `directory/${name}`
    const url = `/worker/objects/${fileKey}?bucket=${bucket}`
    const fullUrl = `${api}${url}`

    mock.onPut(fullUrl).reply((config) => {
      expect(config.url).toBe(url)
      expect(config.method).toBe('put')
      expect(config.headers?.['Content-Type']).toMatch(/multipart\/form-data/)
      expect(config.data).toBeInstanceOf(File)
      if (config.onUploadProgress) {
        config.onUploadProgress({ loaded: 500, total: 1000 })
      }
      return [200, undefined]
    })

    const response = await worker.objectUpload({
      params: {
        key: fileKey,
        bucket: bucket,
      },
      data: new File(['hello world'], name),
      config: {
        onUploadProgress: (progress) => {
          expect(progress.loaded / progress.total).toBe(0.5)
        },
      },
    })

    expect(response.status).toBe(200)
  })
})
