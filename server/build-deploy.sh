#!/bin/bash -eu

nx run-many --target=build --projects=website,assets,crons,renterd,hostd,walletd,explorer --prod
nx run explorer:build:production-testnet
pm2 reload server/pm2.config.js
