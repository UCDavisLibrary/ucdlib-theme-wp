# PHP Source Code

This directory contains the php code that renders public-facing pages.

Even though most admin-side functionality is done through the JS in the `src/editor` directory, a few small admin-side tasks are still performed here in php (such as enqueuing scripts and registering blocks). 

![](https://docs.google.com/drawings/d/e/2PACX-1vT1CU1OLQJJHAfcwPZU-j48TMXm4z2DBAdIuVaVhQaMAkQz39HcDRieLd-P0HhHG0HR_D_4eWEsyEu5/pub?w=960&h=720)

## Templates

Most of the php files at the root of this directory are template files. For each request that comes in, Wordpress automatically chooses a single file to run based on the [template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/). With significant help from the Timber library (see below), the template file does two primary functions:
1. retrieves the necessary data to hydrate the requested page
2. renders a twig template into html

## Functions.php
Before a php template is selected and executed, the `functions.php` file is executed. In this theme, the `functions.php` file loads Timber (installed via [php composer](https://getcomposer.org/)) and the primary site class, `UcdThemeSite` (from the `includes` directory). The `UcdThemeSite` class performs all of the custom functionality of this theme by doing actions and filters on [Wordpress hooks](https://developer.wordpress.org/plugins/hooks/).

## Timber
[Timber](https://timber.github.io/docs/v2) is a dependency of this theme that:
1.  separates the logic of the code from the view by using the [Twig templating language](https://twig.symfony.com/).
2.  makes interacting with Wordpress more object-oriented.

Timber also does a lot of data retrieval behind the scenes when the [context](https://timber.github.io/docs/v2/guides/context/) is requested in a php template file, and acts as a bridge between your logic and what is ultimately rendered via twig.

```php
// data for the requested page will be placed within $context->post;
// to see everything that is in the context, call {{ dump() }} in your twig file
$context = Timber::context();

// if timber doesn't automatically retrieve all the data you need to render your page,
// you can pass in arbitrary data
$context['foo'] = get_bar();

// now we select a twig template to render as html and pass through the context
// this is what the user of your site sees
Timber::render( 'my-page-template.twig', $context );
```

All twig files are in the `view` directory at the root of this repo.

## Rendering Blocks

All custom blocks on this site (defined in `/src/editor/blocks`) are [dynamic blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/), which means that they build their structure and content on the fly from their stored attributes when rendered on a public page. The `$registry` property in `includes/classes/blocks.php` maps each block to a specific twig file and any on-the-fly server-side functions that need to happen.