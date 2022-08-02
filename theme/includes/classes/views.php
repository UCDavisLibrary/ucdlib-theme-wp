<?php

/**
 * Wire up view locations and hooks.
 */
class UCDThemeViews {
  public static $ns = "ucd";

  public static function getViewDir(){
    return dirname(get_stylesheet_directory(), 1) . "/views";
  }

  public function __construct() {

    add_filter( 'timber/locations', array($this, 'add_timber_locations'), 4 );
    add_filter( 'timber/twig', array( $this, 'add_twig_functions' ), 4 );
    add_filter( 'timber/context', array( $this, 'addTwigHooks' ), 4);
  }

  // Gives plugins the ability to render a twig partial at certain locations
  // by appending property arrays within 'twigHooks'
  public function addTwigHooks($context){
    
    $context['twigHooks'] = array();

    if ( is_admin() ){
      // admin profile
      $context['twigHooks']['admin-profile'] = array();
      $context['twigHooks']['admin-profile']['office-location'] = array();
      $context['twigHooks']['admin-profile']['organizational-info'] = array();
      $context['twigHooks']['admin-profile']['about-yourself'] = array();
    } else {

      $context['twigHooks']['base'] = [];
      $context['twigHooks']['base']['postHead'] = [];

      // footer hooks
      $context['twigHooks']['footer'] = array();
      $context['twigHooks']['footer']['postColumns'] = array();
      $context['twigHooks']['footer']['postSpacer'] = array();
      $context['twigHooks']['footer']['bottom'] = array();
      $context['twigHooks']['footer']['postBuild'] = array();

      // post (news item) hooks
      $context['twigHooks']['post'] = array();
      $context['twigHooks']['post']['sidebarTop'] = array();
      $context['twigHooks']['post']['sidebarBottom'] = array();

      // single author page hooks
      $context['twigHooks']['author'] = array();
      $context['twigHooks']['author']['top'] = array();
      $context['twigHooks']['author']['bottom'] = array();
      $context['twigHooks']['author']['aboveDescription'] = array();
      $context['twigHooks']['author']['aboveContactList'] = array();
    }

    return $context;
  }

  /**
   * Adds twig files under the @ucd namespace
   */
  public function add_timber_locations($paths){
    $paths[self::$ns] = array(self::getViewDir());
    return $paths;
  }

  /**
   * Returns namespaced path of a twig page template
   */
  public static function getTemplate($template){
    return '@' . self::$ns . "/templates/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a twig partial template
   */
  public static function getPartial($template){
    return '@' . self::$ns . "/template-partials/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a twig macro file
   */
  public static function getMacro($template){
    return '@' . self::$ns . "/macros/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a twig gutenberg block
   */
  public static function getBlock($template){
    return '@' . self::$ns . "/blocks/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a set of twig hooks
   */
  public static function getHook($template){
    return '@' . self::$ns . "/template-partials/hooks/" . $template . ".twig";
  }

  /**
   * Returns namespaced path of a sidebar default template
   */
  public static function getSidebarDefault($template){
    return '@' . self::$ns . "/template-partials/sidebar-defaults/" . $template . ".twig";
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
    $twig->addFunction( new Twig\TwigFunction( 'getUcdSidebarDefault', array( $this, 'getSidebarDefault' ) ) );
    return $twig;
  }
}