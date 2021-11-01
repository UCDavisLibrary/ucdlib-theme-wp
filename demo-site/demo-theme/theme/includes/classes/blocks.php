<?php
require_once( __DIR__ . '/block-transformations.php' );

/** 
 * Handles server-side rendering of UCD blocks through WP actions and filters on class instantiation.
 * 
 * @param string $editor_script_slug - The identifier for your editor JS script registered with WP
 * @param array $settings - Override any of the default settings
 * 
 */
class UCDThemeBlocks {
  public $editor_script_slug;
  public $settings;

  function __construct($editor_script_slug, $settings=array()) {
    $this->editor_script_slug = $editor_script_slug;
    $this->set_settings($settings);

    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
    add_action( 'enqueue_block_editor_assets', array( $this, "enqueue_block_editor_assets" ), 5 );
    add_action( 'init', array( $this, 'register_blocks'));
    add_action('block_categories_all', array($this, 'addCategories'), 10,2);
  }

  /**
   * Meta for each block goes here.
   */
  public static $registry = array(
    "ucd-theme/button-link" => array(
      "twig" => "@ucd/blocks/button-link.twig", 
      "transform" => array("removeStylePrefix")
    ),
    "ucd-theme/heading" => array(
      "twig" => "@ucd/blocks/heading.twig", 
      "transform" => array("removeStylePrefix")
    ),
    "ucd-theme/image-landscape" => array(
      "twig" => "@ucd/blocks/image-landscape.twig", 
      "transform" => array("getImage")
    ),
    "ucd-theme/marketing-highlight" => array(
      "twig" => "@ucd/blocks/marketing-highlight.twig",
      "img" => "640x480.png",
      "transform" => array("getPost")
    ),
    "ucd-theme/marketing-highlight-horizontal" => array(
      "twig" => "@ucd/blocks/marketing-highlight-horizontal.twig",
      "img" => "1280x720.png",
      "transform" => array("getPost")
    ),
    "ucd-theme/poster" => array(
      "twig" => "@ucd/blocks/poster.twig",
      "img" => "1280x720.png",
      "transform" => array("getPost")
    ),
    "ucd-theme/poster-list" => array("twig" => "@ucd/blocks/poster-list.twig"),
    "ucd-theme/layout-basic" => array("twig" => "@ucd/blocks/layout-basic.twig"),
    "ucd-theme/column" => array("twig" => "@ucd/blocks/layout-column.twig"),
    "ucd-theme/layout-columns" => array("twig" => "@ucd/blocks/layout-columns.twig"),
    "ucd-theme/layout-container" => array("twig" => "@ucd/blocks/layout-container.twig"),
    "ucd-theme/layout-quad" => array("twig" => "@ucd/blocks/layout-quad.twig"),
    "ucd-theme/object-box" => array("twig" => "@ucd/blocks/object-box.twig"),
    "ucd-theme/recent-posts" => array(
      "twig" => "@ucd/blocks/recent-posts.twig",
      "transform" => array("getRecentPosts")
    ),
    "ucd-theme/teaser" => array(
      "twig" => "@ucd/blocks/teaser.twig",
      "img" => "135x135.png",
      "transform" => array("getPost", "getImage")
    ),
  );

  /**
   * Will be used unless overridden by user settings on construction.
   * Some settings are also dynamically constructed from registry array.
   */
  public static $default_settings = array(
    "imgByAspectRatio" => array(
      "1x1" => "135x135.png",
      "4x3" => "640x480.png",
      "16x9" => "1280x720.png"
    )
  );

  /**
   * Custom block categories
   */
  public function addCategories($block_categories, $editor_context){
    if ( ! empty( $editor_context->post ) ) {
      array_push(
          $block_categories,
          array(
            'slug'  => 'ucd-links',
            'title' => 'Stylized Links',
            'icon'  => null,
          ),
          array(
            'slug'  => 'ucd-cards',
            'title' => 'Cards and Panels',
            'icon'  => null,
          ),
          array(
            'slug'  => 'ucd-layout',
            'title' => 'Layouts',
            'icon'  => null,
          ),
          array(
            'slug'  => 'ucd-query',
            'title' => 'Queries',
            'icon'  => null,
          )
      );
    }
    return $block_categories;
  }

  /**
   * Merges default and user settings
   */
  private function set_settings($user_settings){
    if ( is_array($user_settings) ) {
      $settings = array_merge(self::$default_settings, $user_settings);
    } else {
      $settings = self::$default_settings;
    }

    if ( !array_key_exists('imgBase', $settings) ){
      $settings["imgBase"] = dirname( get_template_directory_uri() ) . "/assets/img/block-defaults/";
    }

    // merge settings from block registry
    foreach (self::$registry as $slug => $meta) {
      $shortSlug = explode("/", $slug)[1];

      // default image
      $imgProp = 'img--' . $shortSlug;
      if ( array_key_exists('img', $meta) && !array_key_exists($imgProp, $settings) ) {
        $settings[$imgProp] = $meta["img"];
      }

      // custom color palette
      $colorProp = "color--" . $shortSlug;
      if ( array_key_exists('color', $meta) && !array_key_exists($colorProp, $settings) ) {
        $settings[$colorProp] = $meta["color"];
      }
    }
    $this->settings = $settings;

  }

  /**
   * Registers serverside rendering callback of all UCD blocks
   */
  public function register_blocks( ) {
    foreach (self::$registry as $name => $block) {
      register_block_type(
        $name, 
        array(
          'api_version' => 2, 
          'render_callback' => array($this, 'render_callback')
        )
      );
    }
  }

  /**
   * Renders designated Twig and applies attribute transformations for a registered block
   * 
   * NOTE:
   * We need access to the block name to determine what twig to render.
   * Third 'block' arg is not part of documentation:
   *  https://github.com/WordPress/gutenberg/blob/trunk/docs/how-to-guides/block-tutorial/creating-dynamic-blocks.md
   * Looks like this wp api is in flux, so this approach might break in the future:
   *  https://github.com/WordPress/gutenberg/issues/4671
   *  https://github.com/WordPress/gutenberg/issues/21797
   *  https://github.com/WordPress/gutenberg/pull/21925
   *  
   */
  public function render_callback($block_attributes, $content, $block) {
    
    // Retrieve metadata from registry
    $blockName = $block->name;
    if ( !$blockName ) return;
    $meta = self::$registry[$blockName];

    // Apply any transformations to block attributes specified in registry
    if ( array_key_exists("transform", $meta) ){
      if ( is_array($meta['transform']) ) {
        $transformations = $meta['transform'];
      }
      else {
        $transformations = array($meta['transform']);
      }
      foreach ($transformations as $transformation) {
        $block_attributes = call_user_func("UCDThemeBlockTransformations::" . $transformation, $block_attributes);
      }
    }

    // Render twig
    ob_start();
    Timber::render( $meta['twig'], array("attributes" => $block_attributes, "content" => $content) );
    return ob_get_clean();
  }

  /**
   * Adds settings object to window, so gutenberg blocks can access.
   */
  public function enqueue_block_editor_assets(){
    wp_add_inline_script($this->editor_script_slug, "window.UCDBlockSettings=" . json_encode($this->settings) , 'before');
  }

  /**
   * Adds handy functions and filters to twig
   */
  public function add_to_twig( $twig ){
    $twig->addFunction( new Twig\TwigFunction( 'DefaultImage', array( $this, 'getBlockImageDefault' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'DefaultImageByAspectRatio', array( $this, 'getImageByAspectRatio' ) ) );
		return $twig;
  }

  /**
   * Retrieves url of default for image for a block
   */
  public function getBlockImageDefault($slug){
    if ( !array_key_exists('img--' . $slug, $this->settings) ) return "";
    $img = $this->settings['img--' . $slug];
    return $this->settings['imgBase'] . $img;
  }

  /**
   * Retrieves url of default image for a given aspect ratio
   */
  public function getImageByAspectRatio($aspectRatio){
    if ( 
      !array_key_exists("imgByAspectRatio", $this->settings) ||
      !array_key_exists($aspectRatio, $this->settings["imgByAspectRatio"])
    ) return "";
    $img = $this->settings["imgByAspectRatio"][$aspectRatio];
    return $this->settings['imgBase'] . $img;
  }
}

?>