# walletd-e2e

Playwright end-to-end tests for the walletd app.

`bunx nx e2e walletd-e2e` runs them. The `build-cluster` target it depends on compiles a local Sia cluster from the Go daemons, so Go has to be installed.
