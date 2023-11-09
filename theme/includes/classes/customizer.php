<?php
require_once( __DIR__ . '/customizer-multi-select.php' );
/**
 * Sets up theme customization menu options:
 * Appearance > Customize
 * https://developer.wordpress.org/themes/customize-api/
 */
class UcdThemeCustomizer {

  public function __construct() {
    add_action( 'customize_register', array( $this, 'register' ) );
  }

  public function register($wp_customize){
    $this->header($wp_customize);
    $this->footer($wp_customize);
    $this->layout($wp_customize);
    $this->search($wp_customize);
    $this->colors($wp_customize);
    $this->site_identity($wp_customize);
  }

  // Add to site_identity section
  public function site_identity($wp_customize){
    $wp_customize->add_setting('enable_comments');
    $wp_customize->add_control('enable_comments', array(
      'type' => "checkbox",
      'priority' => 11,
      'section' => 'title_tagline',
      'label' => 'Enable Comments',
      'description' => "Unhides comments admin menu. Though comments still won't display publicly."
    ));

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
    $wp_customize->add_setting('sf_branding_bar_logo_width');
    $wp_customize->add_control('sf_branding_bar_logo_width', array(
      'type' => "text",
      'priority' => 10,
      'section' => 'title_tagline',
      'label' => "Custom Header Logo Width",
      'description' => "If using custom branding bar with a custom logo, enter the width of the logo in the header. e.g. '200px'"
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

    $wp_customize->add_section( 'footer_build', array(
      'title' => 'Website Build Info',
      'panel' => 'footer'
    ));
    $wp_customize->add_setting('footer_hide_build');
    $wp_customize->add_control('footer_hide_build', array(
      'type' => "checkbox",
      'section' => 'footer_build',
      'label' => 'Hide All Build Info'
    ));

  }

  // search panel
  public function search($wp_customize){
    $wp_customize->add_panel( 'search', array(
      'title' => 'Search',
      'description' => "Customize site search"
    ));
    $wp_customize->add_section( 'search_general', array(
      'title' => 'General',
      'panel' => 'search'
    ));
    $wp_customize->add_setting('search_hide');
    $wp_customize->add_control('search_hide', array(
      'type' => "checkbox",
      'section' => 'search_general',
      'label' => 'Hide search popup in header.',
      'description' => "If your site doesn't need search at all."
    ));
    $wp_customize->add_setting('search_hide_default');
    $wp_customize->add_control('search_hide_default', array(
      'type' => "checkbox",
      'section' => 'search_general',
      'label' => 'Hide default search header form',
      'description' => 'If you want to wire up your own'
    ));
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

    // pages
    $wp_customize->add_section( 'layout_page', array(
      'title' => 'Page',
      'panel' => 'layout'
    ));
    $wp_customize->add_setting('layout_page_sidebar_hide');
    $wp_customize->add_control('layout_page_sidebar_hide', array(
      'type' => "checkbox",
      'section' => 'layout_page',
      'label' => 'Globally disable the sitewide sidebar. Authors will not be able to override this.',
    ));
    $wp_customize->add_setting('layout_page_sidebar_flipped');
    $wp_customize->add_control('layout_page_sidebar_flipped', array(
      'type' => "checkbox",
      'section' => 'layout_page',
      'label' => 'Flip the sidbar location',
      'description' => 'Sidebar will display on the right'
    ));
    $wp_customize->add_setting('layout_page_sidebar_default');
    $wp_customize->add_control('layout_page_sidebar_default', array(
      'type' => "checkbox",
      'section' => 'layout_page',
      'label' => 'Hide sitewide sidebar by default',
      'description' => 'Can still be displayed by author in page settings.'
    ));
    $wp_customize->add_setting('layout_page_template');
    $wp_customize->add_control('layout_page_template', array(
      'type' => "checkbox",
      'section' => 'layout_page',
      'label' => 'Use a page block template',
      'description' => 'By default, all new pages will be loaded with a starter template.
      Can be customized programmatically with the "ucd-theme/block-template/page" filter.'
    ));

    // category
    $wp_customize->add_section( 'layout_category', array(
      'title' => 'Category',
      'panel' => 'layout'
    ));
    $wp_customize->add_setting('layout_category_sidebar_hide');
    $wp_customize->add_control('layout_category_sidebar_hide', array(
      'type' => "checkbox",
      'section' => 'layout_category',
      'label' => 'Hide the sidebar'
    ));
    $wp_customize->add_setting('layout_category_sidebar_flipped');
    $wp_customize->add_control('layout_category_sidebar_flipped', array(
      'type' => "checkbox",
      'section' => 'layout_category',
      'label' => 'Flip the sidbar location',
      'description' => 'Sidebar will display on the right'
    ));

    // Posts archive
    $wp_customize->add_section( 'layout_posts', array(
      'title' => 'Posts Archive',
      'panel' => 'layout'
    ));
    $wp_customize->add_setting('layout_posts_title');
    $wp_customize->add_control('layout_posts_title', array(
      'type' => "text",
      'section' => 'layout_posts',
      'label' => "Custom Title for 'Post' Post Type",
      'description' => "e.g. 'news', 'articles', 'blog posts'. Defaults to 'posts'"
    ));
    $wp_customize->add_setting('layout_posts_list_title', array('default' => "Latest News"));
    $wp_customize->add_control('layout_posts_list_title', array(
      'type' => "text",
      'section' => 'layout_posts',
      'label' => 'Custom Title for Latest News Section'
    ));
    $wp_customize->add_setting('layout_posts_sidebar_hide');
    $wp_customize->add_control('layout_posts_sidebar_hide', array(
      'type' => "checkbox",
      'section' => 'layout_posts',
      'label' => 'Hide the sidebar'
    ));
    $wp_customize->add_setting('layout_posts_sidebar_flipped');
    $wp_customize->add_control('layout_posts_sidebar_flipped', array(
      'type' => "checkbox",
      'section' => 'layout_posts',
      'label' => 'Flip the sidbar location',
      'description' => 'Sidebar will display on the right'
    ));

    if ( get_option('page_for_posts') ) {
      $wp_customize->add_setting('layout_posts_page_content', array('default' => "hide"));
      $wp_customize->add_control('layout_posts_page_content', array(
        'type' => "radio",
        'section' => 'layout_posts',
        'label' => "Page Content Location",
        'description' => 'Where to display page_for_post content on page 1',
        'choices' => array("hide" => "Don't Display", "top" => "Top of page", "bottom" => "Bottom of page")
      ));

    } else {
      $wp_customize->add_setting('layout_posts_homepage_title');
      $wp_customize->add_control('layout_posts_homepage_title', array(
        'type' => "text",
        'section' => 'layout_posts',
        'label' => 'Custom Homepage Title',
        'description' => "Used if posts archive is also homepage"
      ));
    }

    // single author
    $wp_customize->add_section( 'layout_author', array(
      'title' => 'Author',
      'panel' => 'layout'
    ));
    $wp_customize->add_setting('layout_author_sidebar_hide');
    $wp_customize->add_control('layout_author_sidebar_hide', array(
      'type' => "checkbox",
      'section' => 'layout_author',
      'label' => 'Hide the sidebar'
    ));
    $wp_customize->add_setting('layout_author_sidebar_flipped');
    $wp_customize->add_control('layout_author_sidebar_flipped', array(
      'type' => "checkbox",
      'section' => 'layout_author',
      'label' => 'Flip the sidbar location',
      'description' => 'Sidebar will display on the right'
    ));
    $wp_customize->add_setting('layout_author_picture_hide');
    $wp_customize->add_control('layout_author_picture_hide', array(
      'type' => "checkbox",
      'section' => 'layout_author',
      'label' => 'Hide the profile picture'
    ));
  }

  public function colors($wp_customize){
    $colors = array(
      "admin-blue" => "Admin Blue",
      "rec-pool" => "Rec Pool",
      "tahoe" => "Tahoe",
      "gunrock" => "Gunrock",
      "bodega" => "Bodega",
      "rain" => "Rain",
      "arboretum" => "Arboretum",
      "putah-creek" => "Putah Creek",
      "delta" => "Delta",
      "farmers-market" => "Farmers Market",
      "sage" => "Sage",
      "quad" => "Quad",
      "redwood" => "Redwood",
      "golden-state" => "Golden State",
      "sunflower" => "Sunflower",
      "poppy" => "Poppy",
      "california" => "California",
      "rose" => "Rose",
      "strawberry" => "Strawberry",
      "double-decker" => "Double Decker",
      "merlot" => "Merlot",
      "thiebaud-icing" => "Thiebaud Icing",
      "redbud" => "Redbud",
      "pinot" => "Pinot",
      "cabernet" => "Cabernet",
      "primary" => "Primary",
      "secondary" => "Secondary"
    );

    $wp_customize->add_panel( 'theme-colors', array(
      'title' => 'Colors',
      'description' => "Edit the colors that this theme uses."
    ));

    $wp_customize->add_section( 'colors_blocks', array(
      'title' => 'Block Palettes',
      'panel' => 'theme-colors',
      'description' => 'Limit author color choices to a specific palette for each custom block type listed below.'
    ));

    $blocks_with_colors = array(
      array("slug" => "teaser", "label" => "Teaser Block Palette", "description" => 'Also used as color palette for "featured" post.'),
      array("slug" => "marketing-highlight", "label" => "Marketing Highlight Block Palette"),
      array("slug" => "marketing-highlight-horizontal", "label" => "Marketing Highlight (Horizontal) Block Palette"),
      array("slug" => "poster", "label" => "Poster Block Palette"),
      array("slug" => "panel-with-icon", "label" => "Panel with Icon"),
      array("slug" => "priority-link", "label" => "Priority Link Palette"),
      array("slug" => "focal-link", "label" => "Focal Link Palette"),
      array("slug" => "prefixed-icon-link", "label" => "Prefixed Icon Link Palette"),
      array("slug" => "hero-banner", "label" => "Hero Banner Palette"),
      array("slug" => "brand-textbox", "label" => "Brand Textbox Palette"),
      array("slug" => "heading-with-icon", "label" => "Heading With Icon Palette"),
      array("slug" => "separator", "label" => "Separator Palette"),
      array("slug" => "object-box", "label" => "Object Box Border Palette"),
    );
    $blocks_with_colors = apply_filters( 'ucd-theme/customizer/block-colors', $blocks_with_colors );
    foreach ($blocks_with_colors as $block) {
      $name = 'colors_blocks_' . $block['slug'];
      $wp_customize->add_setting($name, array('default' => array()));
      $wp_customize->add_control(
        new UcdThemeCustomizerMultiSelect($wp_customize, $name, array(
          'type' => "select",
          'choices' => $colors,
          'section' => 'colors_blocks',
          'label' => $block['label'],
          'description' => array_key_exists('description', $block) ? $block['description'] : '')
      ));
    }


  }
}
