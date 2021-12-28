# sia.tech website

## Development

### Setup

```sh
# Install dependencies
yarn

# Create a local .env and add the domains to /etc/hosts
cp .env.example .env

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

[Sia release process →](https://www.notion.so/siafoundation/Web-6de3b72ac13e44a989bdffb72fce8996#bd5cb0ab038d4b35a49d4433dd6af614)
