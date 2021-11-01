<?php

class UCDThemeEnqueue {
  public $scripts;
  public $version;

  public function __construct($scripts, $version) {
    $this->scripts = $scripts;
    $this->version = $version;
    $this->jsPath = dirname( get_template_directory_uri() ) . "/assets/js/";
    $this->cssPath = dirname( get_template_directory_uri() ) . "/assets/css/";

    add_action( 'enqueue_block_editor_assets', array($this, "enqueue_block_editor_assets"), 4);
    add_action( 'wp_enqueue_scripts', array($this, "wp_enqueue_scripts"), 4);
    add_editor_style( "../assets/css/ucd-styles.css" );
  }

  public function enqueue_block_editor_assets(){
    
    // customizer not working properly when editor bundle is loaded.
    // TODO: figure out why?? 2021-10-25
    if ( get_current_screen()->id  == 'customize' ) return;

    wp_enqueue_script(
      $this->scripts['editor'], 
      $this->jsPath . "editor/index.js", 
      array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-element', 'wp-editor', 'wp-rich-text' ), 
      $this->version, 
      true);
  }

  public function wp_enqueue_scripts(){
    wp_enqueue_style( 
      $this->scripts['publicStyles'],
      $this->cssPath . "ucd-styles.css",
      array(), 
      $this->version );
    wp_enqueue_script(
      $this->scripts['public'],
      $this->jsPath . "public/bundle.js",
      array(),
      $this->version,
      true
    );
  }
}