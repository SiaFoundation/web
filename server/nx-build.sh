#!/bin/bash -eu

nx run-many --target=build --projects=website,assets,crons,renterd,hostd,walletd --prod
