# renterd-e2e

Playwright end-to-end tests for the renterd app.

`bunx nx e2e renterd-e2e` runs them. The `build-cluster` target it depends on compiles a local Sia cluster from the Go daemons, so Go has to be installed.
