#! /bin/bash

###
# Build and zip up theme and save to io directory
###

set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR/..

THEME_TAG=${1:-main}
./cmds/build.sh $THEME_TAG
IMAGE=localhost/local-dev/ucdlib-theme-wp:$THEME_TAG

# check if io directory exists, create if not
if [ ! -d "./io" ]; then
  mkdir ./io
fi

echo "Zipping up theme image with tag: $THEME_TAG"
docker run --rm -v $(pwd)/io:/theme/io $IMAGE ./scripts/zip.sh
