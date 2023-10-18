#!/bin/bash

for dir in dist/apps/* dist/libs/*; do
    targetDir="${dir#dist/}"
    echo $targetDir
    if [ -d "$targetDir/dist" ]; then
        echo "Removing contents of $targetDir/dist"
        rm -rf "$targetDir/dist"
    fi
done
