#! /bin/bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR/..

THEME_TAG=$(cd ucdlib-theme-wp && git rev-parse --abbrev-ref HEAD)
ZIP_FILE=ucdlib-theme-wp-$THEME_TAG.zip

echo "Zipping up theme image with tag: $THEME_TAG"
tar -czvf io/$ZIP_FILE ucdlib-theme-wp

