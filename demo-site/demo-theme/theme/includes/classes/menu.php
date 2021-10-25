<?php

/**
 * Initializes menu locations
 */
class UcdThemeMenu {

  public function __construct() {

    // slug => label
    $this->menuLocations = array(
      "primary" => "Header (Primary)",
      "brandingBar" => "Header (Branding Bar)",
      "quickLinks" => "Header (Quick Links)"
    );
    add_filter( 'timber/context', array( $this, 'add_to_context' ) );
    add_action( 'after_setup_theme', array( $this, 'register' ) );
  }

  public function register(){
    register_nav_menus($this->menuLocations);
  }

  public function add_to_context( $context ) {
    $locations = get_nav_menu_locations();
    foreach ($this->menuLocations as $slug => $label) {
      
      // add to context if location has menu data
      if ( array_key_exists($slug, $locations) && $locations[$slug] ) {
        $context['menu'][$slug] = new Timber\Menu($slug);
      }
      
    }
    return $context;
  }
}