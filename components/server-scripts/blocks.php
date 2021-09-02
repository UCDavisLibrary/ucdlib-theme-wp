<?php

/** 
 * Primary class for this package. 
 * Handles server-side rendering of UCD blocks through WP actions and filters on class instantiation.
 * Depends on Timber, so make sure you set that up first.
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
    add_filter( 'timber/locations', array($this, 'add_timber_locations') );
    add_action( 'enqueue_block_editor_assets', array( $this, "enqueue_block_editor_assets" ), 100 );
    add_action( 'render_block_data', array( $this, 'render_block_data'), 10, 2 );
    add_action( 'init', array( $this, 'register_blocks'));
    add_action('block_categories_all', array($this, 'addCategories'), 10,2);
  }

  /**
   * Meta for each block goes here.
   */
  public static $registry = array(
    "ucd-theme/button-link" => array("twig" => "@ucd/button-link.twig"),
    "ucd-theme/heading" => array("twig" => "@ucd/blocks/heading.twig"),
    "ucd-theme/marketing-highlight" => array(
      "twig" => "@ucd/blocks/marketing-highlight.twig",
      "img" => "640x480.png",
      "transform" => "UCDThemeBlockTransformations::marketingHighlight"
    ),
    "ucd-theme/poster" => array(
      "twig" => "@ucd/blocks/poster.twig",
      "img" => "1280x720.png"
    )
  );

  /**
   * Will be used unless overridden by user settings on construction
   */
  public static $default_settings = array(
    "imgBase" => "/wp-content/ucd-img-defaults/"
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
    foreach (self::$registry as $slug => $meta) {
      $imgProp = 'img--' . explode("/", $slug)[1];
      if ( array_key_exists('img', $meta) && !array_key_exists($imgProp, $settings) ) {
        $settings[$imgProp] = $meta["img"];
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
   */
  public function render_callback($block_attributes, $context) {
    $meta = self::$registry[$block_attributes['_name']];
    if ( array_key_exists("transform", $meta) ){
      $block_attributes = call_user_func($meta['transform'], $block_attributes);
    }
    ob_start();
    Timber::render( $meta['twig'], array("attributes" => $block_attributes) );
    return ob_get_clean();
  }

  /**
   * Intercepts and modifies block data before it is sent to render function
   */
  public function render_block_data( $block, $source_block ) {
    // Hack to make block name available in render function
    // Is planned in: https://github.com/WordPress/gutenberg/issues/4671
    // But, as of WP Version 5.8, not implemented 
    $block['attrs']['_name'] = $block['blockName'];

    // hack to remove is-style class prefix
    // https://github.com/WordPress/gutenberg/issues/11763
    if ( array_key_exists('className', $block['attrs'])) {
      $block['attrs']['className'] = self::removeStylePrefix($block['blockName'], $block['attrs']['className']);
    }

    return $block;
  }

  /**
   * Adds twig files under the @ucd namespace
   */
  public function add_timber_locations($paths){
    $paths['ucd'] = array(dirname(__DIR__, 1) . "/views");
    return $paths;
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
   * Strips is-style prefix from gutenberg block classlist
   */
  public static function removeStylePrefix($name, $classes){
    if (strpos($name, 'ucd-theme/') === 0) {
      $classes = str_replace("is-style-","",$classes);
    }
    return $classes;
  }
}

?>