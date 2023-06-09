# UC Davis "One" Wordpress Theme

This is a Wordpress theme that uses the styles from [UCD IET's Sitefarm One theme](https://bitbucket.org/ietwebdev/sitefarm-pattern-lab-one/src/redesign/docs/). It is used by the [main UC Davis Library website](https://github.com/UCDavisLibrary/main-wp-website), but can also be used by other Wordpress sites that need UC Davis branding. 


## Using This Theme
With a little bit of setup, this theme can be used in any Wordpress site.

First, [Timber 2.0](https://upstatement.com/timber/) is a dependency, so you have to [install it via composer](https://timber.github.io/docs/v2/installation/manage-timber-with-composer/) before activating the theme. This can be done by extending the Wordpress docker image and running a few additional commands:
```Dockerfile
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV COMPOSER_ALLOW_SUPERUSER=1;
COPY composer.json .
RUN composer install
```

Next, you have to decide whether you want to build the JS and CSS assets yourself or use a prebuilt version.

### Prebuilt Version

To use the prebuilt version, TODO explain how to download zip file, point to example.

### Custom Build

This approach is necessary if you want to extend the block components in a custom plugin or create a single js bundle for your site. To build the JS and CSS yourself: 
1. clone this repository,
2. npm link the two js directories in `/src/public` and `/src/editor`
3. import them with `import "@ucd-lib/brand-theme"` and `import "@ucd-lib/brand-theme-editor;` into your custom plugin, respectively. 

For an example, check out the [main library website](https://github.com/UCDavisLibrary/ucdlib-wp-plugins/tree/main/ucdlib-assets), which loads the theme and all custom plugin assets into a single dynamically-loaded code-splitted bundle.

**IMPORTANT NOTE**
- This theme is highly opinionated since it enables many [dynamically-generated](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/) custom blocks that correspond to the "atoms" and "molecules" of the UC Davis brand. If you build your content using these blocks, and then want to change to a different theme, that theme will not know how to render these blocks. You will have to write a migration script that converts all these blocks into html before changing themes. 

## Contributing
In Worpress, [best practices](https://developer.wordpress.org/themes/getting-started/what-is-a-theme/#what-is-the-difference-between-a-theme-and-a-plugin) are:
- a theme controls the presentation of content (CSS styles and template routing); whereas
- a plugin is used to control the behavior and features of your WordPress site.

Moreover, this theme should stay as closely aligned to UC Davis style specifications as possible.

After setting up your local docker environment, 
1. Set the `UCD_THEME_ENV` environmental variabled to `dev`, which will make sure the non-minified JS/CSS assets are loaded.
2. To start the block-editor watch process, run `npm run watch` in `/src/editor`. More details can be found in the readme in that directory.
3. To start the public js/scss watch process, run `npm run watch` in `/src/public`. More details can be found in the readme in that directory.

### Reference and Documentation
The following are very helpful resources when developing this theme:
- [Wordpress Theme Handbook](https://developer.wordpress.org/themes/)
- [Wordpress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Wordpress Block Component List](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src)
- [Wordpress Block Editor Component List](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components)
- [Timber Reference](https://timber.github.io/docs/v2)
- [Twig Reference](https://twig.symfony.com/doc/3.x/)
- [htm Package Readme](https://www.npmjs.com/package/htm)
- [ReactJs Main Concepts](https://reactjs.org/docs/hello-world.html)
