#!/bin/bash -eu

nx run-many --target=build --projects=website,design-site,asset-server,explorer-v1,renterd,hostd,walletd --prod
nx run explorer-v1:build:production-testnet
pm2 reload server/pm2.config.js
