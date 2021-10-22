<?php

/**
 * Wire up view locations.
 */
class UCDThemeViews {
  public function __construct() {
    $this->ns = "ucd";
    $this->dir = dirname(get_stylesheet_directory(), 1) . "/views";

    add_filter( 'timber/locations', array($this, 'add_timber_locations') );
    add_filter( 'timber/twig', array( $this, 'add_twig_functions' ) );
  }

  /**
   * Adds twig files under the @ucd namespace
   */
  public function add_timber_locations($paths){
    $paths[$this->ns] = array($this->dir);
    return $paths;
  }

  /**
   * Returns namespaced path of a twig page template
   */
  public function getTemplate($template){
    return '@' . $this->ns . "/templates/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a twig partial template
   */
  public function getPartial($template){
    return '@' . $this->ns . "/template-partials/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a twig macro file
   */
  public function getMacro($template){
    return '@' . $this->ns . "/macros/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a twig gutenberg block
   */
  public function getBlock($template){
    return '@' . $this->ns . "/blocks/" . $template . ".twig";
  }

  /**
   * Adds view-getter functions to twig context
   */
  public function add_twig_functions( $twig ){
    $twig->addFunction( new Twig\TwigFunction( 'getUcdTemplate', array( $this, 'getTemplate' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'getUcdPartial', array( $this, 'getPartial' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'getUcdMacro', array( $this, 'getMacro' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'getUcdBlock', array( $this, 'getBlock' ) ) );
    return $twig;
  }
}