# Editor Source Code
This directory contains all of the javascript source code necessary for displaying admin pages, mostly for the [block-editor interface](https://developer.wordpress.org/block-editor/).

## Architecture and Tools
![](https://docs.google.com/drawings/d/e/2PACX-1vTMPG0PKp4mcoYaGyNZcoXtnmbsbNbDfWblP7kTODCH8Aw9UZh6Anj1aOcIcZ_o0kReB7Lfo0yFH6j5/pub?w=960&h=720)

The Wordpress block editor is written in [Reactjs](https://reactjs.org/) with a [Redux-like](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/) data model. Where possible, [lit element](https://lit.dev/) is used in place of React to achieve some consistency across UCD Library applications. However, in many cases it's easier to leverage existing open-source Wordpress React components, which can be found here:
- https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src
- https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components 

and imported via npm:
```js
import { MediaPlaceholder, InspectorControls, BlockControls} from '@wordpress/block-editor';
import { ToolbarButton, ToggleControl } from '@wordpress/components';
```

Even though the code is React, we avoid writing in [JSX](https://reactjs.org/docs/introducing-jsx.html) by using a little [shim layer](https://www.npmjs.com/package/htm), which is JSX-like syntax but in plain JavaScript, and is very similar to [lit-html](https://www.npmjs.com/package/lit-html):
```js
import { createElement } from "@wordpress/element";
import htm from 'htm';

const html = htm.bind( createElement );

export default ( props ) => {
    return html`
        <${Fragment}>
            <p>I am a React Component but not in jsx.</p>
        </${Fragment}>
    `
}
```

When a page is edited and saved, the selected blocks and [their attributes](https://developer.wordpress.org/block-editor/getting-started/create-block/attributes/) are stored in the database as a [serialized json-like structure](https://developer.wordpress.org/block-editor/explanations/architecture/data-flow/#the-anatomy-of-a-serialized-block). For example, the following is a set of [priority links](http://dev.webstyleguide.ucdavis.edu/redesign/?p=organisms-priority-links):
```
<!-- wp:ucd-theme/priority-links -->
  <!-- wp:ucd-theme/priority-links-item {"text":"research guides","icon":"wp-editor:pie-chart","brandColor":"rose"} /-->
  <!-- wp:ucd-theme/priority-links-item {"text":"databases","icon":"wp-editor:functions","brandColor":"secondary"} /-->
<!-- /wp:ucd-theme/priority-links -->
```
This will be rendered on pubic-facing pages using the php found in the `theme` directory at the root of this repo.

## Directories

### block-components

The `block-components` directory has custom reusable components (written in React and Lit) that are meant to be imported by the Wordpress blocks in the `blocks` directory.

### blocks

The `blocks` directory has all the custom blocks that can be used by the user when creating/editing a page. Each block usually has the following files:
- *index.js* - Contains the metadata for the block. Most crucially, this is where the block's name and data attributes are defined.
- *edit.js* - Where the behavior of the editor block is defined (as a React component). It usually imports reusable components from the `@wordpress/components` package and the `block-components` directory.
- *lit-element.js* - The `edit.js` React component loads this Lit element, which is the crux of the behavior. It is what the user sees in the main editing pane.
- *save.js* - Only necessary if a block can have other blocks nested within it.

### core-block-mods

Wordpress comes with many OOTB blocks. We can't use most of them because they won't work in the UCD theme. This directory has modifications to a few core blocks to make them work with theme.

### formats

This directory has custom formats for the [richtext component](https://developer.wordpress.org/block-editor/reference-guides/richtext/).

### plugins

In Wordpress parlance, [a Gutenberg plugin](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) is any customization to the editor that is not directly tied to a block. For example, if you need to register a new metabox to the page as a whole, you would put it here.


## Development
1. Install packages with `npm install`. This will take awhile - there are a lot of dependencies.
2. Run `npm run watch` to start the watch process, which will watch for changes and bundle code into to the `assets/js/editor/dev` directory.
