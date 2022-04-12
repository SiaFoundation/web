#!/bin/bash -eu

cd ~/projects/web
git fetch origin
if git status | grep -q behind; then
  git merge origin/main
  npm i
  nx build --affected
  pm2 reload server/pm2.config.js
fi
