<?php

class UCDThemeViews {
  public function __construct() {
    $this->ns = "ucd";
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