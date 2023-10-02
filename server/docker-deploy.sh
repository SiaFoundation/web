#!/bin/bash -eu

docker compose up --force-recreate --pull web-website web-assets web-crons web-renterd web-hostd web-walletd web-explorer web-explorer-testnet-zen
