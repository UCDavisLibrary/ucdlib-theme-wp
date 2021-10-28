<?php

/**
 * Wire up view locations and hooks.
 */
class UCDThemeViews {
  public function __construct() {
    $this->ns = "ucd";
    $this->dir = dirname(get_stylesheet_directory(), 1) . "/views";

    add_filter( 'timber/locations', array($this, 'add_timber_locations'), 4 );
    add_filter( 'timber/twig', array( $this, 'add_twig_functions' ), 4 );
    add_filter( 'timber/context', array( $this, 'addTwigHooks' ), 4);
  }

  // Gives plugins the ability to render a twig partial at certain locations
  // by appending property arrays within 'twigHooks'
  public function addTwigHooks($context){
    
    $context['twigHooks'] = array();

    // footer hooks
    $context['twigHooks']['footer'] = array();
    $context['twigHooks']['footer']['column_1'] = array();
    $context['twigHooks']['footer']['column_2'] = array();
    $context['twigHooks']['footer']['column_3'] = array();
    $context['twigHooks']['footer']['column_4'] = array();
    $context['twigHooks']['footer']['column_5'] = array();
    $context['twigHooks']['footer']['postColumns'] = array();
    $context['twigHooks']['footer']['postSpacer'] = array();
    $context['twigHooks']['footer']['bottom'] = array();

    // post (news item) hooks
    $context['twigHooks']['post'] = array();
    $context['twigHooks']['post']['sidebarTop'] = array();
    $context['twigHooks']['post']['sidebarBottom'] = array();

    return $context;
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
   * Returns namespaced path of a set of twig hooks
   */
  public function getHook($template){
    return '@' . $this->ns . "/template-partials/hooks/" . $template . ".twig";
  }

  /**
   * Adds view-getter functions to twig context
   */
  public function add_twig_functions( $twig ){
    $twig->addFunction( new Twig\TwigFunction( 'getUcdTemplate', array( $this, 'getTemplate' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'getUcdPartial', array( $this, 'getPartial' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'getUcdMacro', array( $this, 'getMacro' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'getUcdBlock', array( $this, 'getBlock' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'getUcdHook', array( $this, 'getHook' ) ) );
    return $twig;
  }
}