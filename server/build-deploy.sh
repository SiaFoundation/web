#!/bin/bash -eu

nx run-many --target=build --projects=website,design-site,asset-server --production
pm2 reload server/pm2.config.js
