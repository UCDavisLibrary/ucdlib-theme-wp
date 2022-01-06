# UC Davis "One" Wordpress Theme

This is a Wordpress theme that uses the styles from [UCD IET's Sitefarm One theme](https://bitbucket.org/ietwebdev/sitefarm-pattern-lab-one/src/redesign/docs/). It is used by the [main UC Davis Library website](https://github.com/UCDavisLibrary/main-wp-website), but can also be used by other Wordpress sites that need UC Davis branding. 


## Deployment
To use this theme, you can download it and place it in your Wordpress's `themes` folder. [Timber 2.0](https://upstatement.com/timber/) is a dependency, so you have to [install it via composer](https://timber.github.io/docs/v2/installation/manage-timber-with-composer/) before activating the theme. You must also build the js by running `npm install && npm run dist` in the `/src/public` and `/src/editor` directories. TODO: Just make a release with timber and the JS zipped up.

Alternatively and preferrably, check out these repositories for patterns on deploying via Docker:
- [main-wp-website](https://github.com/UCDavisLibrary/main-wp-website)
- [main-wp-website-deployment](https://github.com/UCDavisLibrary/main-wp-website-deployment)

## Development
In Worpress, [best practices](https://developer.wordpress.org/themes/getting-started/what-is-a-theme/#what-is-the-difference-between-a-theme-and-a-plugin) are:
- a theme controls the presentation of content (CSS styles and template routing); whereas
- a plugin is used to control the behavior and features of your WordPress site.

So, if you need to alter the behavior of the site, use the [ucdlib-plugins repository](https://github.com/UCDavisLibrary/ucdlib-wp-plugins).

After setting up your local docker environment, 
1. Set the `UCD_THEME_ENV` environmental variabled to `dev`, which will make sure the non-minified JS/CSS assets are loaded.
2. To start the block-editor watch process, run `npm run watch` in `/src/editor`. More details can be found in the readme in that directory.
3. To start the public js/scss watch process, run `npm run watch` in `/src/public`. More details can be found in the readme in that directory.

## Reference and Documentation
The following are very helpful resources when developing this theme:
- [Wordpress Theme Handbook](https://developer.wordpress.org/themes/)
- [Wordpress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Wordpress Block Component List](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src)
- [Wordpress Block Editor Component List](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components)
- [Timber Reference](https://timber.github.io/docs/v2)
- [Twig Reference](https://twig.symfony.com/doc/3.x/)
- [htm Package Readme](https://www.npmjs.com/package/htm)
- [ReactJs Main Concepts](https://reactjs.org/docs/hello-world.html)