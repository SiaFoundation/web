# sia.tech website

## Development

### Install

```sh
yarn
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

### Sia release process

**Generate artifacts**

1. On the server, generate docs and copy them into `public/docs`. The directory name should use the following format `1.5.4`. This will automatically be served at `docs/v154`.
2. On the server, generate binaries and copy them into `public/releases`.

**Bump official versions**

3. Update the current or RC version by updating values in `src/config/sia.js`. The values should use the following format `1.5.4`.

**Build and deploy**

- TODO: Automate the below with a cron that checks for updates on Github?
- TODO: Docker/pm2 etc?

**Verify changes**

1. Check that `/docs/vXXX` route serves generated docs.
2. Check that `/docs` route serves docs for expected current version.
3. Check that `/docs/rc` route serves docs for expected RC version.
4. Check that `/get-started` serves binaries for current version.
