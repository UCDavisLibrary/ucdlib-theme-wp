<?php

class UCDThemeAssets {
  public $scripts;
  public $version;

  public function __construct($scripts, $version) {
    $this->scripts = $scripts;
    $this->version = $version;
    $this->directories = array();
    
    $this->uris = array(
      'base' => dirname( get_template_directory_uri() ) . "/assets"
    );
    $this->uris['js'] = $this->uris['base'] . "/js";
    $this->uris['css'] = $this->uris['base'] . "/css";
    $this->uris['img'] = $this->uris['base'] . "/img";

    add_action( 'enqueue_block_editor_assets', array($this, "enqueue_block_editor_assets"), 4);
    add_action( 'wp_enqueue_scripts', array($this, "wp_enqueue_scripts"), 4);
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ), 4 );
    add_editor_style( "../assets/css/ucd-styles.css" );
  }

  public function enqueue_block_editor_assets(){
    
    // customizer not working properly when editor bundle is loaded.
    // TODO: figure out why?? 2021-10-25
    //$adminScreens = array('widgets', 'customize');
    $adminScreens = array( 'customize');
    if ( in_array( get_current_screen()->id, $adminScreens ) ) return;

    wp_enqueue_script(
      $this->scripts['editor'], 
      $this->uris['js'] . "/editor/index.js", 
      array(), 
      $this->version, 
      true);
  }

  public function wp_enqueue_scripts(){
    wp_enqueue_style( 
      $this->scripts['publicStyles'],
      $this->uris['css'] . "/ucd-styles.css",
      array(), 
      $this->version );
    wp_enqueue_script(
      $this->scripts['public'],
      $this->uris['js'] . "/public/bundle.js",
      array(),
      $this->version,
      true
    );
  }

  public function get_sf_image($img=''){
    return $this->uris['img'] . "/sf/" . $img;
  }

  public function get_site_icon_url(){
    $custom = get_site_icon_url();
    if ( $custom ) return $custom;
    return $this->uris['img'] . "/site-icon.png";
  }

  public function add_to_twig( $twig ) {
    $twig->addFunction( new Twig\TwigFunction( 'get_sf_image', array( $this, 'get_sf_image' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'get_site_icon_url', array( $this, 'get_site_icon_url' ) ) );
    return $twig;
  }
}