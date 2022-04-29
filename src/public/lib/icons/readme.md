# Icons

This is the primary iconset for the theme. A user can select any icon to display in a block that supports icons. Only those icons that are used on a page will be loaded.

To update the iconset,
- Change the icons by:
  - Adding directories with custom svgs
  - Updating the font-awesome.yaml to customize icons loaded from Fontawesome
- Run `npm install` and then `npm run icons`, which will generate a `ucd-public.html` file
- Copy the file to `/theme/includes`