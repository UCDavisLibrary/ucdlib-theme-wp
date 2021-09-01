<?php

// Primary class for this package.
class UCDThemeBlocks {
  public $settings;

  function __construct($settings=array()) {
    if ( is_array($settings) ) {
      $settings = array_merge(self::$default_settings, $settings);
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
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );

    $GLOBALS["UCDThemeBlocks"] = $this;
    

  }

  public static $registry = array(
    "ucd-theme/button-link" => array("twig" => "ucd-theme-blocks/button-link.twig"),
    "ucd-theme/heading" => array("twig" => "ucd-theme-blocks/heading.twig"),
    "ucd-theme/marketing-highlight" => array(
      "twig" => "ucd-theme-blocks/marketing-highlight.twig",
      "img" => "640x480.png",
      "transform" => "UCDThemeBlockTransformations::marketingHighlight")
  );

  public function add_to_twig( $twig ){
    $twig->addFunction( new Twig\TwigFunction( 'DefaultImage', array( $this, 'getBlockImageDefault' ) ) );
		return $twig;
  }

  public function getBlockImageDefault($slug){
    if ( !array_key_exists('img--' . $slug, $this->settings) ) return "";
    $img = $this->settings['img--' . $slug];
    return $this->settings['imgBase'] . $img;
  }

  public function settingsScript(){
    return "window.UCDBlockSettings=" . json_encode($this->settings);
  }

  public static $default_settings = array(
    "imgBase" => "/wp-content/ucd-img-defaults/"
  );

  public static function removeStylePrefix($name, $classes){
    if (strpos($name, 'ucd-theme/') === 0) {
      $classes = str_replace("is-style-","",$classes);
    }
    return $classes;
  }

  public static function addCategories($block_categories, $editor_context){
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
}

?>