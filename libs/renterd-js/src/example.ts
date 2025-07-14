import { Bus } from './bus'
import { Autopilot } from './autopilot'
import { Worker } from './worker'

export async function example() {
  const bus = Bus({
    api: 'http://localhost:9980/api',
    password: 'password1337',
  })
  const autopilot = Autopilot({
    api: 'http://localhost:9980/api',
    password: 'password1337',
  })
  const worker = Worker({
    api: 'http://worker:4444/api',
    password: 'password1337',
  })

  try {
    const buckets = await bus.buckets()
    buckets.data.forEach((bucket) => {
      console.log(bucket.name, bucket.createdAt, bucket.policy)
    })
  } catch (error) {
    console.log(error)
  }

  bus.bucketCreate({
    data: { name: 'my-bucket' },
  })

  bus.bucketPolicyUpdate({
    params: {
      name: 'my-bucket',
    },
    data: {
      policy: {
        publicReadAccess: true,
      },
    },
  })

  const hosts = await bus.hosts({
    data: {
      filterMode: 'allowed',
      usabilityMode: 'usable',
      addressContains: 'example.com',
      keyIn: ['key1', 'key2'],
      offset: 0,
      limit: 50,
    },
  })

  hosts.data?.forEach((host) => {
    console.log(host.publicKey, host.priceTable)
  })

  await worker.objectUpload({
    params: {
      key: 'path/to/file.txt',
      bucket: 'my-bucket',
    },
    data: new File(['file contents'], 'file.txt'),
    config: {
      onUploadProgress: (progress) => {
        console.log(progress.loaded / (progress.total ?? 0))
      },
    },
  })

  await worker.objectDownload({
    params: {
      key: 'path/to/file.txt',
      bucket: 'my-bucket',
    },
  })

  const state = await autopilot.state()
  console.log(state.data.migrating)
}
