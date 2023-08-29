#! /bin/bash
set -e
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $SCRIPT_DIR/..

ZIP_FILE=ucdlib-theme-wp-$THEME_TAG.tar.gz

echo "Zipping up theme image with tag: $THEME_TAG"
tar -czvf io/$ZIP_FILE ucdlib-theme-wp
echo "Done zipping theme image"

echo "Zipping composer dependencies"
tar -czvf io/composer-$THEME_TAG.tar.gz vendor
echo "Done zipping composer dependencies"
