# Twig Views
This directory contains [twig files](https://twig.symfony.com/), which are rendered as html using the [$context](https://timber.github.io/docs/v2/guides/context/) variable defined in the php templates in the `/theme` directory.

- *admin* - Twig files used in the admin area of the site.
- *blocks* - Twig files for blocks defined in `/src/editor/blocks` and `/theme/includes/classes/blocks.php`
- *macros* - [Functions](https://twig.symfony.com/doc/3.x/tags/macro.html) for rendering common patterns.
- *template-partials* - Reusable twig files to be [included](https://twig.symfony.com/doc/3.x/tags/include.html) by page templates.
- *templates* - Twig files called directly by the php template files in the `/theme` directory.