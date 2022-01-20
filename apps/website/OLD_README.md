# sia.tech website

## Development

### Setup

```sh
# Install dependencies
yarn

# Create a local .env
cp .env.example .env

# Add the domains to /etc/hosts
127.0.0.1 sia.local
127.0.0.1 api.sia.local

# Create asset directories, add any test assets
mkdir public/docs
mkdir public/releases
mkdir public/transparency
```

### Run

Run the application in development mode.

```sh
yarn dev
```

### Build

Build the production application.

```sh
yarn build
```

## Workflows

- [Sia release process →](https://www.notion.so/siafoundation/Web-6de3b72ac13e44a989bdffb72fce8996#bd5cb0ab038d4b35a49d4433dd6af614)
- [News release process →](https://www.notion.so/siafoundation/Web-6de3b72ac13e44a989bdffb72fce8996#4fc04d6e7c0749cfa6a99c6a83fc41bd)
