APPS="renterd,hostd,walletd"
go_releases=()
for app in $(echo $APPS | tr ',' ' ')
do
  echo "$app"
  latest_release=$(git describe --tags --match "$app@*" --abbrev=0 2>/dev/null)
  if [ -z "$latest_release" ]
  then
    echo "Latest release for $app does not exist"
  else
    echo "Latest release: $latest_release"
    version=$(echo $latest_release | cut -d "@" -f 2)
    go_release="$app/v$version"
    tag=$(git describe --exact-match "$go_release" 2>/dev/null)
    if [ -z "$tag" ]
    then
      echo "Tag $go_release does not exists, exporting app"
      npx nx export $app
      mkdir -p $app/ui/assets
      rm -rf $app/ui/assets/*
      cp -R dist/apps/$app-embed/exported/* $app/ui/assets/
      go_releases+=("$go_release")
    else
      echo "Tag $go_release exists"
    fi
  fi
done
echo ""

if [ ${#go_releases[@]} -gt 0 ]
then
  echo "Releasing: ${go_releases[*]}"
  git add .
  git commit -m "chore: export ${go_releases[*]}"
  for tag in "${go_releases[@]}"
  do
    git tag -a $tag -m "Go module $tag"
  done
fi
