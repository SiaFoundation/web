#!/bin/bash

# from:
# dist/apps/renterd/*
# dist/apps/hostd/*
# dist/libs/renterd-react/*
# dist/libs/design-system/*
# to:
# apps/renterd/*
# apps/hostd/*
# libs/renterd-react/*
# libs/design-system/*

for distDir in dist/apps/* dist/libs/*; do
    # distDir: dist/apps/foo
    # srcDir: apps/foo
    srcDir="${distDir#dist/}"
    echo "$srcDir"
    if [ -d "$srcDir" ]; then
        # leave the .md files, changesets needs the CHANGELOG.md
        # to publish each packages GitHub release.
        find "$srcDir" -type f ! -name '*.md' -exec rm -f {} +
        cp -r "$distDir/"* "$srcDir/"
    fi
done
