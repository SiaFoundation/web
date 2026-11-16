#!/bin/bash
# Packs every built lib in dist/libs, installs the tarballs into a clean
# project and checks that each package loads via require and import.
# Catches builds that reference files npm pack drops (see #1606).
set -euo pipefail

# next/font only works inside the Next.js compiler.
skip=" @siafoundation/fonts "
# ESM builds import next/* without extensions, which only bundlers resolve.
skip_esm=" @siafoundation/design-system @siafoundation/react-core "

root=$(pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

names=()
for dir in dist/libs/*/; do
  [ -f "$dir/package.json" ] || continue
  [ "$(node -p "require('./$dir/package.json').private === true")" = "true" ] && continue
  name=$(node -p "require('./$dir/package.json').name")
  [[ "$skip" == *" $name "* ]] || names+=("$name")
  (cd "$dir" && npm pack --silent --pack-destination "$tmp" >/dev/null)
done

if [ ${#names[@]} -eq 0 ]; then
  echo "No built libs found in dist/libs"
  exit 0
fi

react=$(node -p "require('./package.json').dependencies.react.split('.')[0]")
cd "$tmp"
npm init -y >/dev/null
# Pin react so npm's peer resolution doesn't pick conflicting majors.
npm install --silent --no-audit --no-fund ./*.tgz "react@$react" "react-dom@$react"

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

cd "$root"
exit $failed
