# Dist Build

For every release of a theme, a version with the built dist js/css should be zipped up and uploaded to the releases page.

run `./cmds/zip.sh <tag>`, which will place the followign  zip file in the `io` directory:
- ucdlib-theme-wp (theme with js/css which should be placed in wp theme directory)
- composer (php dependencies which should be placed in wp root)
