#!/bin/bash
# Checks that every built lib in dist/libs still loads once npm has packed it.
# npm pack drops files a build can depend on, such as anything under
# node_modules (#1606). Each tarball is unpacked into a folder inside the repo,
# so the libs' own dependencies resolve from the repo's node_modules and the
# check installs nothing from the registry.
set -euo pipefail

# next/font only works inside the Next.js compiler.
skip=" @siafoundation/fonts "
# ESM builds import next/* without extensions, which only bundlers resolve.
skip_esm=" @siafoundation/design-system @siafoundation/react-core "

mkdir -p dist
packed=$(mktemp -d "$PWD/dist/packed.XXXXXX")
trap 'rm -rf "$packed"' EXIT

names=()
for dir in dist/libs/*/; do
  [ -f "$dir/package.json" ] || continue
  name=$(node -p "const p = require('./${dir}package.json'); p.private ? '' : p.name")
  [ -n "$name" ] || continue
  tarball=$(cd "$dir" && npm pack --silent --ignore-scripts --pack-destination "$packed")
  mkdir -p "$packed/node_modules/$name"
  tar -xzf "$packed/$tarball" -C "$packed/node_modules/$name" --strip-components=1
  [[ "$skip" == *" $name "* ]] || names+=("$name")
done

if [ ${#names[@]} -eq 0 ]; then
  echo "No built libs found in dist/libs"
  exit 0
fi

cd "$packed"
failed=0
for name in "${names[@]}"; do
  # Node ignores "module", so import the ESM build by path.
  esm=$(node -p "const m = require('./node_modules/$name/package.json').module; m ? './node_modules/$name/' + m : '$name'")
  if node -e "require('$name')" &&
    { [[ "$skip_esm" == *" $name "* ]] ||
      node --input-type=module -e "await import('$esm')"; }; then
    echo "ok   $name"
  else
    echo "FAIL $name"
    failed=1
  fi
done

exit $failed
