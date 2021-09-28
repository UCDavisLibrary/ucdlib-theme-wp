# UC Davis Theme WP Components

Wordpress dynamic Gutenberg components based off of the [UC Davis Theme](https://github.com/ucd-library/ucdlib-theme). 

## How to use in a wordpress theme
This library is meant to be used in a Wordpress theme or plugin that uses [Timber 2.0](https://upstatement.com/timber/), which is a composer dependency that can render [twigs](https://twig.symfony.com/).

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
All of these components are [dynamic blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/), which means that they need a server-side rendering callback in order to display on public-facing pages. This repo contains corresponding template files for each block.

First, copy the `ucd-img-defaults` directory into `wp-content`, so that the blocks can access their default featured photos (if applicable). 

Next, import the script and instantiate the class AFTER you set up Timber:
```php
 require_once("path~to~package/server-scripts/index.php");
 new UCDThemeBlocks( "ucd-components" );
```
The first class argument should be the slug of your block editor script used in `wp_enqueue_script` above.

The second optional argument allows you to override default settings, such as the location of the default block images. See [Settings Section](#settings) for options.




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
5. Make the view template in `views/blocks`
   1. Access each of your block attributes in the `attributes` context array: `{{attributes.yourBlockAttribute}}`
   2. If there is potential value to your block being reusable outside of the Gutenberg editor, [make it a macro](https://twig.symfony.com/doc/3.x/tags/macro.html) in `views/macros` and then import it into your view file.
6. Map your block name to its view template in the `$registry` array in the `UCDThemeBlocks` class, along with any attribute transformations or default images that are needed.

### Using Web Components
If a component doesn't exist as a  [Wordpress Reusable Component](https://developer.wordpress.org/block-editor/reference-guides/components/) or [Block Editor component](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components), you can use Lit web components within your Gutenberg blocks by following [this pattern](https://www.tderflinger.com/en/litelement-react-app). Instead of importing directly from React, use the `@wordpress/element` package:
```javascript
import { useRef, useEffect } from "@wordpress/element";
```

## Settings
Pass in an associative array as the second argument during class instantiation to customize certain behavior:

```php
 require_once("path~to~package/server-scripts/index.php");
 $mySettings = array("setting_1" => "something custom");
 new UCDThemeBlocks( "ucd-components", $mySettings );
```

The following are recognized keys:

| Setting Key | Description |
| ----------- | ----------- |
| `img-base` | Path to image directory on your server |
| `img--<block-shortslug>` | The default image for a block, if applicable. Will be combined with the `img-base` when the href is constructed. e.g. `img--marketing-highlight` will override the default image for the marketing-highlight block.
| `pallete--<slug>` | A subset of the UCD color scheme. e.g. `array('tahoe', 'gunrock', 'strawberry')`. Can be referenced by `color--<block-shortslug>` setting.
| `color--<block-shortslug>` | Limit the color palette for a specific block. If value is a string, will assume it is a reference to a `pallete--<slug>` setting. You can also pass in an array of strings representing the UCD colors. |