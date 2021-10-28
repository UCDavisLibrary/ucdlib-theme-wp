<?php
/**
 * Sets up theme customization menu options:
 * Appearance > Customize
 * https://developer.wordpress.org/themes/customize-api/
 */
class UcdThemeCustomizer {

  public function __construct() {
    $this->sidebar_panels = array(
      'person_card',
      'people_list',
      'categories',
      'related_articles'
    );
    add_action( 'customize_register', array( $this, 'register' ) );
  }

  public function register($wp_customize){
    $this->header($wp_customize);
    $this->footer($wp_customize);
    $this->layout($wp_customize);
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
    $wp_customize->add_setting('quickLinks_highlight');
    $wp_customize->add_control('quickLinks_highlight', array(
      'type' => "checkbox",
      'priority' => 10,
      'section' => 'quickLinks',
      'label' => 'Highlight',
      'description' => 'Give the first three links a shaded background'
    ));

  }

  // Footer customizations
  public function footer($wp_customize){

    $wp_customize->add_panel( 'footer', array(
      'title' => 'Footer',
      'description' => "Customize the footer layout and links"
    ));

    // column1/site credits
    $wp_customize->add_section( 'footer_column_1', array(
      'title' => 'Column 1',
      'panel' => 'footer'
    ));
    $wp_customize->add_setting('footer_hide_column_1');
    $wp_customize->add_control('footer_hide_column_1', array(
      'type' => "checkbox",
      'section' => 'footer_column_1',
      'label' => 'Hide This Column'
    ));
    $wp_customize->add_setting('site_credits_logo');
    $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'site_credits_logo', array(
      'label' => 'Site Credits Logo',
      'section' => 'footer_column_1',
      'mime_type' => 'image',
    ) ) );
    $wp_customize->add_setting('site_credits_logo_href');
    $wp_customize->add_control('site_credits_logo_href', array(
      'type' => "url",
      'section' => 'footer_column_1',
      'label' => 'Logo Link'
    ));
    $wp_customize->add_setting('site_credits_logo_width');
    $wp_customize->add_control('site_credits_logo_width', array(
      'type' => "text",
      'section' => 'footer_column_1',
      'label' => 'Logo Width'
    ));
    $wp_customize->add_setting('site_credits_text');
    $wp_customize->add_control('site_credits_text', array(
      'type' => "textarea",
      'section' => 'footer_column_1',
      'label' => 'Site Credits',
      "description" => "Your unit's address/contact info."
    ));
    $wp_customize->add_setting('footer_column_1_header');
    $wp_customize->add_control('footer_column_1_header', array(
      'type' => "text",
      'section' => 'footer_column_1',
      'label' => 'Column Title',
      "description" => "Only displays if 'Site Credits' is empty. "
    ));

    // Other columns
    for ($i=2; $i < 6; $i++) { 
      $wp_customize->add_section( 'footer_column_' . $i, array(
        'title' => 'Column ' . $i,
        'panel' => 'footer'
      ));
      $wp_customize->add_setting('footer_hide_column_' . $i);
      $wp_customize->add_control('footer_hide_column_' . $i, array(
        'type' => "checkbox",
        'section' => 'footer_column_' . $i,
        'label' => 'Hide This Column'
      ));
      $wp_customize->add_setting('footer_column_' . $i . '_header');
      $wp_customize->add_control('footer_column_' . $i . '_header', array(
        'type' => "text",
        'section' => 'footer_column_' . $i,
        'label' => 'Column Title'
      ));
    }

  }

  // Layout menu
  public function layout($wp_customize){
    $wp_customize->add_panel( 'layout', array(
      'title' => 'Page/Post Layouts',
      'description' => "Customize page layout options such as sidebar location."
    ));

    // posts
    $wp_customize->add_section( 'layout_post', array(
      'title' => 'Post',
      'panel' => 'layout'
    ));
    $wp_customize->add_setting('layout_post_sidebar_flipped');
    $wp_customize->add_control('layout_post_sidebar_flipped', array(
      'type' => "checkbox",
      'section' => 'layout_post',
      'label' => 'Flip the sidbar location',
      'description' => 'Sidebar will display on the right'
    ));
    $i = 0;
    foreach ($this->sidebar_panels as $panel) {
      $wp_customize->add_setting('layout_post_sidebar_' . $panel . "_hide");
      $wp_customize->add_control('layout_post_sidebar_' . $panel . "_hide", array(
        'type' => "checkbox",
        'section' => 'layout_post',
        'label' => 'Hide the ' . $panel . " panel",
      ));
      $wp_customize->add_setting('layout_post_sidebar_' . $panel . "_order", array("default" => $i));
      $wp_customize->add_control('layout_post_sidebar_' . $panel . "_order", array(
        'type' => "number",
        'section' => 'layout_post',
        'label' => 'Order of the ' . $panel . " panel",
      ));
      $i++;
    }
  }
}