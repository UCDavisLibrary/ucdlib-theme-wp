# UC Davis Theme WP Components

Wordpress dynamic Gutenberg components based off of the [UC Davis Theme](https://github.com/ucd-library/ucdlib-theme). To be used with a [Timber-based](https://upstatement.com/timber/) Wordpress theme or plugin.

## How to use in a wordpress theme

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
To register the components, you have to import the files into your block_editor_assets JS bundle. TODO: push package to npm.
``` bash
npm i @ucd-lib/theme-wp-elements
```
and then
```javascript
import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import { UcdThemeBlocks, UcdThemeRichTextFormats } from "@ucd-lib/theme-wp-elements";
UcdThemeRichTextFormats.forEach(fmt => {
    registerFormatType(fmt.name, fmt.settings);
  })

UcdThemeBlocks.forEach(block => {
    registerBlockType( block.name, block.settings );
});
```

It is up to you how you want to bundle your code, you can use [Wordpress's default process](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) or build your own.

```php
// add component bundle to editor
add_action( 'enqueue_block_editor_assets', function(){
  wp_enqueue_script(
    "ucd-components", 
    get_theme_root_uri() . "/demo-theme/static/editor-js/editor.js", 
    array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-rich-text' ), 
    "0.0.9", 
    true);
} );
```

### Setting up the render (save) functions
All of these components are [dynamic blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/), which means that they need a server-side rendering callback in order to display on public-facing pages. Every component has a `twig-template` attribute, which maps to its corresponding template file in this repo. You will need to register a `render_callback` function for each component that calls `Timber::render` on its `twig-template`.

## Contributing to this repo
### Demo App
To see the components in action, launch the demo app:
```bash
cd demo-site
docker compose up
```
Then start your watch script:
```
bash cd src
npm install
npm run watch
```
and go to localhost:8000.