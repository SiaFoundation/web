# renterd-js

SDK for interacting with `renterd`.

## installation

```sh
npm install @siafoundation/renterd-js
```

## usage

```js
import { Bus } from './bus'
import { Autopilot } from './autopilot'
import { Worker } from './worker'

export async function example() {
  const bus = Bus({
    api: 'http://localhost:9980',
    password: 'password1337',
  })
  const autopilot = Autopilot({
    api: 'http://localhost:9980',
    password: 'password1337',
  })
  const worker = Worker({
    api: 'http://worker:4444',
    password: 'password1337',
  })

  const buckets = await bus.buckets()

  buckets.data.forEach((bucket) => {
    console.log(bucket.name, bucket.createdAt, bucket.policy)
  })

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

  const hosts = await autopilot.hostsSearch({
    data: {
      filterMode: 'allowed',
      usabilityMode: 'usable',
      addressContains: 'example.com',
      keyIn: ['key1', 'key2'],
      offset: 0,
      limit: 50,
    },
  })

  hosts.data.forEach((host) => {
    console.log(host.host.publicKey, host.host.priceTable)
  })

  worker.objectUpload({
    params: {
      key: 'path/to/file.txt',
      bucket: 'my-bucket',
    },
    data: new File(['file contents'], 'file.txt'),
    config: {
      onUploadProgress: (progress) => {
        console.log(progress.loaded / progress.total)
      },
    },
  })

  worker.objectDownload({
    params: {
      key: 'path/to/file.txt',
      bucket: 'my-bucket',
    },
    config: {
      onDownloadProgress: (progress) => {
        console.log(progress.loaded / progress.total)
      },
    },
  })
}
```
