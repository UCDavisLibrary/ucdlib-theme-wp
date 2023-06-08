#! /bin/bash

###
# Process for building theme image
###

set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR/..

THEME_TAG=${1:-main}
echo "Building theme image with tag: $THEME_TAG"
docker build \
  -t localhost/local-dev/ucdlib-theme-wp:$THEME_TAG \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  --build-arg THEME_TAG=${THEME_TAG} \
  .
