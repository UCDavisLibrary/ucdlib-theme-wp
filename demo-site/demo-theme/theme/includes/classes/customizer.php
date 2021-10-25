<?php
/**
 * Sets up theme customization options:
 * https://developer.wordpress.org/themes/customize-api/
 */
class UcdThemeCustomizer {

  public function __construct() {
    add_action( 'customize_register', array( $this, 'register' ) );
  }

  public function register($wp_customize){
    $this->header($wp_customize);
  }

  // header customizations
  public function header($wp_customize){

    // Branding bar
    $wp_customize->add_setting('sf_branding_bar');
    $wp_customize->add_control('sf_branding_bar', array(
      'type' => "checkbox",
      'priority' => 10,
      'section' => 'title_tagline',
      'label' => 'Sitefarm Branding Bar',
      'description' => 'Enable default Sitefarm Branding Bar'
    ));


    // Quicklinks
    $wp_customize->add_section( 'quickLinks', array(
      'title' => 'Quick Links Settings',
      'description' => "Customize the look of the menu in the 'quickLinks' location, if applicable.",
      'panel' => 'nav_menus'
    ) );
    $wp_customize->add_setting('quickLinks_two_col');
    $wp_customize->add_control('quickLinks_two_col', array(
      'type' => "checkbox",
      'priority' => 10,
      'section' => 'quickLinks',
      'label' => 'Two columns',
      'description' => 'Break links into two columns'
    ));

  }
}