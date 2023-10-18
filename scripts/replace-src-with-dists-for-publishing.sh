#!/bin/bash

# from:
# dist/apps/renterd/*
# dist/apps/hostd/*
# dist/libs/react-renterd/*
# dist/libs/design-system/*
# to:
# apps/renterd/*
# apps/hostd/*
# libs/react-renterd/*
# libs/design-system/*

for distDir in dist/apps/* dist/libs/*; do
    # distDir: dist/apps/foo
    # srcDir: apps/foo
    srcDir="${distDir#dist/}"
    echo "$srcDir"
    if [ -d "$srcDir" ]; then
        rm -rf "$srcDir/"*
        cp -r "$distDir/"* "$srcDir/"
    fi
done
