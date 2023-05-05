<?php

class UCDThemeAssets {
  public $scripts;
  public $version;

  public function __construct($scripts, $version) {
    $this->scripts = $scripts;
    $this->version = $version;
    $this->directories = array();
    $this->isDevEnv = getenv('UCD_THEME_ENV') == 'dev';

    $this->uris = array(
      'base' => dirname( get_template_directory_uri() ) . "/assets"
    );
    $this->uris['js'] = $this->uris['base'] . "/js";
    $this->uris['css'] = $this->uris['base'] . "/css";
    $this->uris['img'] = $this->uris['base'] . "/img";

    // load iconset(s) available on public pages
    ob_start();
    include dirname(get_stylesheet_directory(), 1) . "/theme/includes/ucd-public.html";
    $icons = ob_get_clean();
    $dom = new DOMDocument;
    libxml_use_internal_errors(true);
    $dom->loadHTML('<html>' . $icons .'</html>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();
    $this->iconsets = $dom;

    // load iconsets on admin pages
    add_action( 'admin_footer', array($this, 'loadAllIcons') );

    add_action( 'enqueue_block_editor_assets', array($this, "enqueue_block_editor_assets"), 4);
    add_action( 'wp_enqueue_scripts', array($this, "wp_enqueue_scripts"), 4);
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ), 4 );
    if ( $this->isDevEnv ){
      add_editor_style( "../assets/css/ucd-styles-dev.css" );
    } else {
      add_editor_style( "../assets/css/ucd-styles.css" );
    }
    add_action('wp_head', array($this, 'add_styles_to_head'));

  }

  public function add_styles_to_head(){
    // prevent foc for nav custom elements
    echo "<style>
    ucd-theme-primary-nav * {
      display: none;
    }
    ucd-theme-quick-links * {
      display: none;
    }
    ucd-theme-subnav * {
      display: none;
    }
    </style>";
  }

  public function enqueue_block_editor_assets(){

    // customizer not working properly when editor bundle is loaded.
    // TODO: figure out why?? 2021-10-25
    //$adminScreens = array('widgets', 'customize');
    $adminScreens = array( 'customize');
    if ( in_array( get_current_screen()->id, $adminScreens ) ) return;

    if ( $this->isDevEnv ){
      wp_enqueue_script(
        $this->scripts['editor'],
        $this->uris['js'] . "/editor/dev/index.js",
        array(),
        $this->version,
        true);
    } else {
      wp_enqueue_script(
        $this->scripts['editor'],
        $this->uris['js'] . "/editor/dist/index.js",
        array(),
        $this->version,
        true);
    }
  }

  public function wp_enqueue_scripts(){

    if ( $this->isDevEnv ){
      wp_enqueue_style(
        $this->scripts['publicStyles'],
        $this->uris['css'] . "/ucd-styles-dev.css",
        array(),
        $this->version );
      wp_enqueue_script(
        $this->scripts['public'],
        $this->uris['js'] . "/dev/bundle.js",
        array(),
        $this->version,
        true
      );
    } else {
      wp_enqueue_style(
        $this->scripts['publicStyles'],
        $this->uris['css'] . "/ucd-styles.css",
        array(),
        $this->version );
      wp_enqueue_script(
        $this->scripts['public'],
        $this->uris['js'] . "/dist/bundle.js",
        array(),
        $this->version,
        true
      );
    }

  }
  // prints all ucdlib-iconset(s) and moves to head
  public function loadAllIcons(){
    $names = [];
    $iconsets = $this->iconsets->getElementsByTagName('ucdlib-iconset');
    for( $i = count($iconsets)-1; $i >= 0; $i--  ) {
      $iconset = $iconsets->item($i);
      $names[] = $iconset->getAttribute('name');
    }

    echo str_replace(array('<html>','</html>') , '' , $this->iconsets->saveHTML());
    foreach ($names as $name) {
      $this->moveIconsetToHead($name);
    }
  }

  public function get_sf_image($img=''){
    return $this->uris['img'] . "/sf/" . $img;
  }

  public function get_site_icon_url(){
    $custom = get_site_icon_url();
    if ( $custom ) return $custom;
    return $this->uris['img'] . "/site-icon.png";
  }

  public function get_watercolor($color='light-blue', $pattern=1) {
    return $this->uris['img'] . "/watercolors/" . $color . "--" . $pattern . ".webp";
  }

  // prints ucdlib-iconset(s) used by the blocks on a page
  public function loadIcons(){

    $iconSlugs = [];
    $iconSlugs = apply_filters( 'ucd-theme/loaded-icons', $iconSlugs );

    // map icons by set
    $iconsBySet = array();
    foreach ($iconSlugs as $icon) {
      $icon = explode(':', $icon);
      if ( count($icon) < 2 ) continue;
      if ( !array_key_exists($icon[0], $iconsBySet) ) $iconsBySet[$icon[0]] = [];
      $iconsBySet[$icon[0]][] = $icon[1];
    }

    // scan iconsets and remove svg children if not in $iconSlugs
    $dom = clone $this->iconsets;
    $iconsets = $dom->getElementsByTagName('ucdlib-iconset');
    for( $i = count($iconsets)-1; $i >= 0; $i--  ) {
      $iconset = $iconsets->item($i);
      $iconset->setAttribute('suppress-warnings', 'true');
      $iconsetName = $iconset->getAttribute('name');
      if ( !array_key_exists($iconsetName, $iconsBySet) ){
        $iconset->parentNode->removeChild($iconset);
        continue;
      }
      $icons = $iconset->getElementsByTagName('g');
      for( $ii = count($icons)-1; $ii >= 0; $ii--  ) {
        $icon = $icons->item($ii);
        if ( !in_array($icon->getAttribute('id'), $iconsBySet[$iconsetName])){

          // only remove g element if it is not nested within another g element
          $nodePath = $icon->getNodePath();
          $nodePath = explode('/', $nodePath);
          if ( count($nodePath) == 6 ){
            $icon->parentNode->removeChild($icon);
          }
        }
      }
    }

    // render filtered iconsets
    $out = str_replace(array('<html>','</html>') , '' , $dom->saveHTML());
    $out = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $out);
    echo $out;

    // move iconset(s) to head where ucdlib-icon elements know to look for it
    foreach ($iconsBySet as $name => $icons) {
      $this->moveIconsetToHead($name);
    }
  }

  private function moveIconsetToHead($name){
    echo "<script>
    var iconset = document.querySelector('ucdlib-iconset[name=$name]');
    if (iconset) {
      document.head.appendChild(iconset);
      if ( iconset.dispatchLoadEvent ){
        iconset.dispatchLoadEvent();
      }
    }
    </script>";
  }

  public function add_to_twig( $twig ) {
    $twig->addFunction( new Twig\TwigFunction( 'get_sf_image', array( $this, 'get_sf_image' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'get_site_icon_url', array( $this, 'get_site_icon_url' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'get_watercolor', array( $this, 'get_watercolor' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'load_icons', array( $this, 'loadIcons' ) ) );
    return $twig;
  }
}
