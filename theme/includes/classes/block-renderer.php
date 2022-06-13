<?php

// registers and renders dynamic blocks.
// meant to be inheritied by blocks.php classes in theme and plugins
class UCDThemeBlockRenderer {

  public function __construct(){
    $this->iconsUsed = [];
    add_action( 'init', array( $this, 'register_blocks'));
    add_filter( 'ucd-theme/loaded-icons', array($this, 'loadIcons'), 10, 1);
  }

  // make sure icons used by blocks are loaded
  public function loadIcons($icons){
    if ( 
      isset(static::$transformationClass) && 
      static::$transformationClass == 'UCDThemeBlockTransformations') {
        return $icons;
      }
    if ( isset($this->iconsUsed) ) {
      foreach ($this->iconsUsed as $icon) {
        if ( !array_key_exists($icon, $icons) ) $icons[] = $icon;
      }
    }

    return $icons;
  }

  /**
   * Registers serverside rendering callback of all UCD blocks
   */
  public function register_blocks( ) {
    if ( isset(static::$registry) ) {
      $registry = static::$registry;
    } elseif ( isset($this->registry)) {
      $registry = $this->registry;
    } else {
      $registry = [];
    }
    foreach ($registry as $name => $block) {
      $settings = array(
        'api_version' => 2, 
        'render_callback' => array($this, 'render_callback')
      );
      if ( array_key_exists('uses_context', $block) ) {
        $settings['uses_context'] = $block['uses_context'];
      }
      if ( array_key_exists('provides_context', $block) ) {
        $settings['provides_context'] = $block['provides_context'];
      };
      register_block_type(
        $name, 
        $settings
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
    if ( isset(static::$registry) ) {
      $registry = static::$registry;
    } elseif ( isset($this->registry)) {
      $registry = $this->registry;
    } else {
      $registry = [];
    }
    if ( !array_key_exists($blockName, $registry) ) return;
    $meta = $registry[$blockName];

    // Apply any transformations to block attributes specified in registry
    if ( isset(static::$transformationClass) && array_key_exists("transform", $meta) ){
      if ( is_array($meta['transform']) ) {
        $transformations = $meta['transform'];
      }
      else {
        $transformations = array($meta['transform']);
      }
      foreach ($transformations as $transformation) {
        $block_attributes = call_user_func(static::$transformationClass . "::" . $transformation, $block_attributes);
      }
    }

    // check for icons (so we can only load the svgs we actually use)
    if ( 
      array_key_exists('icon', $block_attributes) && 
      !in_array($block_attributes['icon'], $this->iconsUsed)) {
        $this->iconsUsed[] = $block_attributes['icon'];
      }
    if ( array_key_exists('icons', $block_attributes) && is_array($block_attributes['icons'])) {
      foreach ($block_attributes['icons'] as $icon) {
        if ( !in_array($icon, $this->iconsUsed)) {
          $this->iconsUsed[] = $icon;
        }
      }
    }

    // Render twig
    ob_start();
    Timber::render( $meta['twig'], array("attributes" => $block_attributes, "content" => $content, "block" => $block) );
    return ob_get_clean();
  }
}