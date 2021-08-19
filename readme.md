# UC Davis Theme WP Components

Wordpress dynamic Gutenberg components based off of the [UC Davis Theme](https://github.com/ucd-library/ucdlib-theme). 

## How to use in a wordpress theme
This library is meant to be used in a Wordpress theme or plugin that can render [twigs](https://twig.symfony.com/) like [Timber](https://upstatement.com/timber/).

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
To register the components, you have to import the files into your `block_editor_assets` JS bundle.

First, install this package with npm:
```
npm i @ucd-lib/theme-wp-elements
```
and then register the components and formats in your editor JS:
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

Next, enqueue your bundled editor script:

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
All of these components are [dynamic blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/), which means that they need a server-side rendering callback in order to display on public-facing pages. This repo contains corresponding template files for each block. First, make sure Timber can find these files:
```php
Timber::$dirname = array_merge(Timber::$dirname, array('../src/node_modules/@ucd-lib/theme-wp-elements/views'));
```
Next, we have to do a couple of hacks because all of Gutenberg's functionality is not fleshed out yet:
1. ensure that the name of the block is available to the render function
   1. https://github.com/WordPress/gutenberg/issues/4671
2. Strip out the WP enforced "is-style" class prefix for custom styles
   1. https://github.com/WordPress/gutenberg/issues/11763 
```php
add_action( 'render_block_data', function( $block, $source_block ){
	$block['attrs']['_name'] = $block['blockName'];

    if ( array_key_exists('className', $block['attrs'])) {
        $block['attrs']['className'] = UCDThemeRemoveStylePrefix($block['blockName'], $block['attrs']['className']);
    }
	return $block;
}, 10, 2 );
```
Next, register a render callback that will map each block to its twig template:
```php
require_once("../src/node_modules/@ucd-lib/theme-wp-elements/registry.php");
add_action('init', function(){
  global $UCD_THEME_COMPONENTS;
  foreach ($UCD_THEME_COMPONENTS as $name => $block) {
    register_block_type(
      $name, 
      array(
        'api_version' => 2, 
        'render_callback' => function($block_attributes, $context){
          global $UCD_THEME_COMPONENTS;
          ob_start();
          Timber::render( $UCD_THEME_COMPONENTS[$block_attributes['_name']]['twig'], array("attributes" => $block_attributes) );
          return ob_get_clean();
        })
    );
  }
});
```
And register the custom block categories:
```php
add_action('block_categories_all', 'UCDThemeAddBlockCategories', 10,2);
```

## Contributing to this repo
### Demo app
To see the components in action, launch the demo app:
```bash
cd demo-site
docker compose up
```
Then install npm packages in `components` and `demo-site/src` and start the watch process in `demo-site/src` with:
``` bash 
npm run watch
```
and go to localhost:8000.

### Making a Gutenberg component
1. Make a new directory in `components/blocks`
2. Compose your [edit function](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit).
   1. To avoid writing in jsx, we use the [htm package](https://www.npmjs.com/package/htm) to write in plain javascript.
   2. Wordpress uses [React Hooks](https://reactjs.org/docs/hooks-overview.html), so you should use function, not class components.
3. In your `index.js` file, export an array with the block name and registration settings: `export default { name, settings };`
4. Import your component and add it to the exported array in `components/blocks/index.js`
5. Make the view template in `views/ucd-theme-blocks`
   1. Access each of your block attributes in the `attributes` context array: `{{attributes.yourBlockAttribute}}`
   2. If there is potential value to your block being reusable outside of the Gutenberg editor, [make it a macro](https://twig.symfony.com/doc/3.x/tags/macro.html) in `views/ucd-theme-macros` and then import it into your view file.
6. Map your block name to its view template in the `$UCD_THEME_COMPONENTS` array in `components/registry.php`

### Using Web Components
If a component doesn't exist as a  [Wordpress Reusable Component](https://developer.wordpress.org/block-editor/reference-guides/components/), or [Block Editor component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components) you can use Lit web components within your Gutenberg blocks by following [this pattern](https://www.tderflinger.com/en/litelement-react-app). Instead of importing directly from React, use the `@wordpress/element` package:
```javascript
import { useRef, useEffect } from "@wordpress/element";
```
