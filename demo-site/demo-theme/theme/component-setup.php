<?php
/**
 * This file wires up the UCD components
 */

 // Require globals and instantiate main class
 // Pass an array into the class to override default settings
 require_once("/var/www/html/wp-content/ucd-theme-components/server-scripts/index.php");
 $editorScriptSlug = "ucd-components";
 $blockSettings = array(
   "palette--alt" => array(
     "primary", "admin-blue", "rose", "secondary", "sage", "arboretum", "tahoe", "thiebaud-icing"
   ),
   "color--marketing-highlight" => "palette--alt",
   "color--marketing-highlight-horizontal" => "palette--alt",
   "color--poster" => "palette--alt"
  );
 new UCDThemeBlocks( $editorScriptSlug, $blockSettings );

 // add component bundle to editor
add_action( 'enqueue_block_editor_assets', function(){
  global $editorScriptSlug;
  wp_enqueue_script(
    $editorScriptSlug , 
    get_theme_root_uri() . "/demo-theme/static/editor-js/editor.js", 
    array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-rich-text' ), 
    "0.0.9", 
    true);
} );

// Add ucd styles to public-facing pages
add_action( 'wp_enqueue_scripts', function(){
  wp_enqueue_style( 
    "ucd-global", 
    get_theme_root_uri() . "/demo-theme/src/node_modules/@ucd-lib/theme-sass/style.css", 
    array(), 
    "0.0.9" );
  wp_enqueue_script(
    "public-bundle",
    get_theme_root_uri() . "/demo-theme/static/public-js/bundle.js",
    array(),
    "0.0.9",
    true
  );
});

// Add ucd styles to editor
add_action( 'after_setup_theme', function(){
  add_theme_support( 'editor-styles' );
});
add_editor_style( "../src/node_modules/@ucd-lib/theme-sass/style.css" );
