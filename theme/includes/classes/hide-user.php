<?php

/**
 * Implements customizer option to hide the native public-facing user profile page.
 */
class UcdThemeHideUser {

  public function __construct() {

    $this->hideOnSitemap();
    add_action( 'ucd-theme/template/author', [$this, 'hideUserPage'], 11);

  }

  /**
   * Hide user profile page from sitemap if customizer settings is selected.
   */
  public function hideOnSitemap(){

    if ( ! get_theme_mod( 'author_sitemap_hide', false ) ) {
      return;
    }

    add_filter( 'wp_sitemaps_add_provider', function ( $provider, $name ) {
      if ( 'users' === $name ) {
          return false;
      }
      return $provider;
    }, 10, 2 );

    add_filter( 'wp_sitemaps_register_providers', function ( $providers ) {
        unset( $providers['users'] );
        return $providers;
    } );
  }

  /**
   * Redirects native wp user profile page to 404 if customizer setting is selected.
   */
  public function hideUserPage() {

    if ( ! get_theme_mod( 'author_page_hide', false ) ) {
      return;
    }

    global $wp_query;
    $wp_query->set_404();
    status_header( 404 );
    get_template_part( 404 );
    exit();
  }
}
