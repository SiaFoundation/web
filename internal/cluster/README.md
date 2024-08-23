# Cluster

Daemon for spinning up a cluster of nodes and connecting them to a local
test network. Primarily useful for local e2e API testing.

## Updating Daemons

The cluster daemon uses go.mod to manage the daemon dependency. To test a specific
version of a daemon against a cluster, update the go.mod file to point to the
desired commit.

```
go get -u go.sia.tech/hostd@asdasd
```

## Usage

```bash
$ go run ./cmd/clusterd -renterd=1 --hostd=3
```

Once the cluster is up, the cluster API will be available to interact with the
testnet.

Each node has a unique api address to interact with its respective daemon.

CTRL-C or SIGINT will shut down the cluster and cleanup the resources

### `[GET] /nodes` 
Lists all running nodes in the cluster

**Response Body**
```json
[
        {
                "id": "facaba60da2e71bb",
                "type": "renterd",
                "apiAddress": "http://[::]:53873/api",
                "password": "sia is cool",
                "walletAddress": "addr:1ca3bfe60a50fe3e700a67fae7c9670446849a0177b0da0378399c6d6ca9cb13dfcb3d084c2d"
        },
        {
                "id": "eabf85c452cf4bca",
                "type": "walletd",
                "apiAddress": "http://[::]:53874/api",
                "password": "sia is cool",
                "walletAddress": "addr:000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69"
        },
        {
                "id": "1c01bc97b794c8d7",
                "type": "hostd",
                "apiAddress": "http://[::]:53864/api",
                "password": "sia is cool",
                "walletAddress": "addr:862b5ca325b4c77ffe861a892e65f48bbcb43f2287b2dfe8d7c70459659f7367a2ffbcf62de9"
        },
        {
                "id": "31b3a65f8a1842d2",
                "type": "hostd",
                "apiAddress": "http://[::]:53867/api",
                "password": "sia is cool",
                "walletAddress": "addr:b906d603430c7e814a107910d8029f931da96a6f2afef6e6dfa93b488e9b337ae29d9f195d23"
        },
        {
                "id": "712e5c22050c0700",
                "type": "hostd",
                "apiAddress": "http://[::]:53870/api",
                "password": "sia is cool",
                "walletAddress": "addr:42fd84ddb08a96105c41b31414913a1a3e09a94046d8444f65398e9b96a814a7708027a323f7"
        }
]
```

### `[*] /nodes/proxy/:filter/*path`

Any API request may be proxied through the cluster to all nodes matching the filter.

For example, to get the tip of all `hostd` nodes in the cluster you can make a request to `[GET] /nodes/proxy/hostd/api/consensus/tip`. Auth is handled automatically and the response from every node is returned.

**Response:**
```json
[
  {
    "nodeID": "29203b5ef83d58e6",
    "statusCode": 200,
    "data": {
      "height": 1517,
      "id": "bid:0209ceee2949574d1fc16df6aa4096d8a77533ffa9805ba78beb9e647b948fb0"
    }
  },
  {
    "nodeID": "8361d1ff9eee0afa",
    "statusCode": 200,
    "data": {
      "height": 1484,
      "id": "bid:aac08c682c20ea109b07dcf10745401e688faa653c0f28aa52c46fba0305f0e9"
    }
  },
  {
    "nodeID": "853d14ea98344417",
    "statusCode": 200,
    "data": {
      "height": 1461,
      "id": "bid:14c5dd55aa4f04ce821d450f39e70b04d6ed02be3bb34c20c9cf59f781f60e04"
    }
  },
  {
    "nodeID": "f7acabfdef326b0e",
    "statusCode": 200,
    "data": {
      "height": 1100,
      "id": "bid:e855de5f38e9d106ca822bbd117ae643a68ceec288f70ff18c94779c0779b71e"
    }
  },
  {
    "nodeID": "a71cc2160aa8ba5b",
    "statusCode": 200,
    "data": {
      "height": 1406,
      "id": "bid:ba90e5d211a0ed9710b52d7ddcd5c65412751a8d84127b5236eb693a004e0eb0"
    }
  },
  {
    "nodeID": "1eab0e2ec98a038a",
    "statusCode": 200,
    "data": {
      "height": 1411,
      "id": "bid:ebde5578fb79f0c90a003a1425fff0159e9e6f7935bf817ebd7b2b9cf5c908c7"
    }
  }
]
```

### `POST /mine` 

Mines a preset number of blocks on the testnet

**Request Body**
```json
{
	"blocks": 10
}
```
