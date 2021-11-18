# UC Davis "One" Wordpress Theme

This is a Wordpress theme that uses the styles from [UCD IET's Sitefarm One theme](https://bitbucket.org/ietwebdev/sitefarm-pattern-lab-one/src/redesign/docs/).

## Deployment
To use this theme, you can download it and place it in your Wordpress's `themes` folder. [Timber 2.0](https://upstatement.com/timber/) is a dependency, so you have to [install it via composer](https://timber.github.io/docs/v2/installation/manage-timber-with-composer/) before activating the theme. You must also build the js by running `npm install && npm run dist` in the `src/public` and `src/editor` directories.

Alternatively, check out these repositories for patterns on deploying via Docker:
- [main-wp-website](https://github.com/UCDavisLibrary/main-wp-website)
- [main-wp-website-deployment](https://github.com/UCDavisLibrary/main-wp-website-deployment)

## Development
TODO describe what belongs in theme vs plugin.

### Theme
TODO describe architecture, build process.

### Plugins
How to make blocks and widgets, override templates, access hooks, etc