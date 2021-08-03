# UC Davis Theme WP Components

Wordpress dynamic Gutenberg components based off of the [UC Davis Theme](https://github.com/ucd-library/ucdlib-theme). To be used with a [Timber-based](https://upstatement.com/timber/) Wordpress theme or plugin.

## Loading into a Wordpress Theme

### Enqueue Styles
Many of these components require that the UC Davis styles are present on the public and editor portions of your site. Here, we are just importing directly from the `@ucd-lib/theme-sass` npm package:

```php
// Add ucd styles to public-facing pages
add_action( 'wp_enqueue_scripts', function(){
  wp_enqueue_style( 
      "ucd-global", 
      get_theme_root_uri() . "/demo-theme/src/node_modules/@ucd-lib/theme-sass/style.css", 
      array(), 
      "0.0.9" );
} );

// Add ucd styles to gutenberg editor
add_action( 'after_setup_theme', function(){
  add_theme_support( 'editor-styles' );
});
add_editor_style( "../src/node_modules/@ucd-lib/theme-sass/style.css" );
```

### Importing the components into your JS bundle
To register the components, you have to import the files into your block_editor_assets JS bundle.
TODO: push package to npm.

### Setting up the render (save) functions
All of these components are [dynamic blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/), which means that they need a server-side rendering callback in order to display on public-facing pages. Every component has a `twig-template` attribute, which maps to its corresponding template file in this repo. You will need to register a `render_callback` function for each component that calls `Timber::render` on its `twig-template`.

## Demo App
To see the components in action, launch the demo app:
```bash
cd demo-site
docker compose up
```