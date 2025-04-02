#!/bin/bash

cd internal/cluster
GOPRIVATE=go.sia.tech go get -u go.sia.tech/cluster@master
GOPRIVATE=go.sia.tech go get -u go.sia.tech/renterd/v2@master
GOPRIVATE=go.sia.tech go get -u go.sia.tech/hostd/v2@master
GOPRIVATE=go.sia.tech go get -u go.sia.tech/walletd/v2@master
GOPRIVATE=go.sia.tech go get -u go.sia.tech/explored@master
go mod tidy
