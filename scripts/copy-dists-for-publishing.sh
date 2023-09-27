#!/bin/bash

# from:
# dist/apps/renterd/
# dist/apps/hostd/
# dist/libs/react-renterd/
# dist/libs/design-system/
# to:
# apps/renterd/dist/
# apps/hostd/dist/
# libs/react-renterd/dist/
# libs/design-system/dist/

for dir in dist/apps/* dist/libs/*; do
    targetDir="${dir#dist/}"
    if [ -d "$targetDir" ]; then
        mkdir -p "$targetDir/dist"
        cp -rv "$dir"/* "$targetDir/dist/"
    fi
done

# reverse
# for dir in apps/* libs/*; do
#     sourceDir="$dir/dist"
#     targetDir="dist/${dir}"
#     if [ -d "$sourceDir" ]; then
#         mkdir -p "$targetDir"
#         cp -rv "$sourceDir"/* "$targetDir/"
#     fi
# done
