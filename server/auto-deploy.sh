#!/bin/bash -eu

cd ~/projects/web
git fetch origin
if git status | grep -q behind; then
  git merge origin/main
  npm ci
  bash server/build-deploy.sh
fi
