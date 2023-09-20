#!/bin/bash -eu

nx run-many --target=build --projects=website,assets,crons,renterd,hostd,walletd --prod
nx run explorer:build:production
nx run explorer:build:production-testnet
pm2 reload server/pm2.config.js
