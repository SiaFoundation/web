#!/bin/bash -eu

nx run-many --target=build --projects=website,assets,crons,renterd,hostd,walletd --prod
pm2 reload server/pm2.config.js
