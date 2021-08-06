<?php
/**
 * This file wires up the UCD components
 */

// Add ucd styles to public-facing pages
add_action( 'wp_enqueue_scripts', function(){
  wp_enqueue_style( 
    "ucd-global", 
    get_theme_root_uri() . "/demo-theme/src/node_modules/@ucd-lib/theme-sass/style.css", 
    array(), 
    "0.0.9" );
});

// Add ucd styles to editor
add_action( 'after_setup_theme', function(){
  add_theme_support( 'editor-styles' );
});
add_editor_style( "../src/node_modules/@ucd-lib/theme-sass/style.css" );

// add component bundle to editor
add_action( 'enqueue_block_editor_assets', function(){
  wp_enqueue_script(
    "ucd-components", 
    get_theme_root_uri() . "/demo-theme/static/editor-js/editor.js", 
    array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-rich-text' ), 
    "0.0.9", 
    true);
} );

// Update timber twig directories
//Timber::$dirname = array_merge(Timber::$dirname, array('/var/www/html/wp-content/ucd-theme-components/views'));
Timber::$locations = '/var/www/html/wp-content/ucd-theme-components/views';

// Hack to make block name available in render function
// Is planned in: https://github.com/WordPress/gutenberg/issues/4671
// But, as of WP Version 5.8, not implemented
add_action( 'render_block_data', function( $block, $source_block ){
	$block['attrs']['_name'] = $block['blockName'];

  // hack to remove is-style class prefix
  // https://github.com/WordPress/gutenberg/issues/11763
  if ( array_key_exists('className', $block['attrs'])) {
    $block['attrs']['className'] = UCDThemeRemoveStylePrefix($block['blockName'], $block['attrs']['className']);
  }
	return $block;
}, 10, 2 );


require_once("/var/www/html/wp-content/ucd-theme-components/registry.php");
add_action('init', function(){
  global $UCD_THEME_COMPONENTS;
  foreach ($UCD_THEME_COMPONENTS as $name => $block) {
    register_block_type(
      $name, 
      array(
        'api_version' => 2, 
        'render_callback' => function($block_attributes, $context){
          global $UCD_THEME_COMPONENTS;
          ob_start();
          Timber::render( $UCD_THEME_COMPONENTS[$block_attributes['_name']]['twig'], array("attributes" => $block_attributes) );
          return ob_get_clean();
        })
    );
  }
});
