#!/bin/bash -eu

nx run-many --target=build --projects=website,design-site,asset-server,explorer-v1 --production
pm2 reload server/pm2.config.js
