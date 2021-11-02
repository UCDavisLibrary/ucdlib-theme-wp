<?php
require_once( __DIR__ . '/views.php' );
require_once( __DIR__ . '/meta-data.php' );
require_once( __DIR__ . '/customizer.php' );
require_once( __DIR__ . '/menu.php' );
require_once( __DIR__ . '/blocks.php' );
require_once( __DIR__ . '/enqueue.php' );
require_once( __DIR__ . '/sidebars.php' );


/**
 * The primary site class.
 * All necessary actions and filters are hooked on instantiation.
 * Can be access directly from the twig context as the 'site' property.
 */
class UcdThemeSite extends Timber\Site {

	public function __construct() {

    // Declare class properties
    $this->version = wp_get_theme()->get( 'Version' );
  
    $this->directories = array(
      "root" => dirname(get_stylesheet_directory(), 1),
      "views" => dirname(get_stylesheet_directory(), 1) . "/views",
      "theme" => dirname(get_stylesheet_directory(), 1) . "/theme"
    );

    $this->scripts = array(
      "editor" => "ucd-components",
      "public" => "ucd-public",
      "publicStyles" => "ucd-public"
    );

    $this->blockSettings = array(
      "palette--alt" => array(
        "primary", "admin-blue", "rose", "secondary", "sage", "arboretum", "tahoe", "thiebaud-icing"
      ),
      "color--marketing-highlight" => "palette--alt",
      "color--marketing-highlight-horizontal" => "palette--alt",
      "color--poster" => "palette--alt",
      "color--teaser" => "palette--alt"
     );

    // Register view paths with theme
    $this->views = new UCDThemeViews();

    // Non-customizer server-side metadata fields
    new UCDThemeMetaData();

    // User-editable theme options
    $this->customizer = new UcdThemeCustomizer();

    // Queue up scripts and styles
    new UcdThemeEnqueue($this->scripts, $this->version);

    // Menu locations
    new UcdThemeMenu();

    // Gutenberg blocks
    $this->blockSettings = apply_filters('ucd-block-settings', $this->blockSettings);
    new UCDThemeBlocks( $this->scripts['editor'], $this->blockSettings );

    // Register widget areas (sidebars)
    new UcdThemeSidebars();
  
    // Hook onto actions and filters
    add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
    add_filter( 'timber/context', array( $this, 'add_to_context' ), 4);
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
    add_action( 'init', array( $this, 'register_post_types' ) );
    add_action( 'init', array( $this, 'register_taxonomies' ) );
  
    parent::__construct();
    }
    /** This is where you can register custom post types. */
    public function register_post_types() {
      add_post_type_support( 'page', 'excerpt' );
  
    }
    /** This is where you can register custom taxonomies. */
    public function register_taxonomies() {
  
    }
  
    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context( $context ) {
      
      # site
      $context['site']  = $this;
  
      # New theme organization, while cleaner, has some annoying side effects.
      # https://github.com/timber/starter-theme/issues/105
      $context['siteUris'] = array(
        'assets' => dirname( get_template_directory_uri() ) . "/assets",
        'img' => dirname( get_template_directory_uri() ) . "/assets/img"
      );
      
      return $context;
    }
  
    public function theme_supports() {
      // Add default posts and comments RSS feed links to head.
      add_theme_support( 'automatic-feed-links' );
  
      /*
       * Let WordPress manage the document title.
       * By adding theme support, we declare that this theme does not use a
       * hard-coded <title> tag in the document head, and expect WordPress to
       * provide it for us.
       */
      add_theme_support( 'title-tag' );
  
      /*
       * Enable support for Post Thumbnails on posts and pages.
       *
       * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
       */
      add_theme_support( 'post-thumbnails' );
  
      /*
       * Switch default core markup for search form, comment form, and comments
       * to output valid HTML5.
       */
      add_theme_support(
        'html5',
        array(
          'comment-form',
          'comment-list',
          'gallery',
          'caption',
        )
      );
  
      /*
       * Enable support for Post Formats.
       *
       * See: https://codex.wordpress.org/Post_Formats
       */
      add_theme_support(
        'post-formats',
        array(
          'aside',
          'image',
          'video',
          'quote',
          'link',
          'gallery',
          'audio',
        )
      );
  
      add_theme_support( 'menus' );
      add_theme_support( 'custom-logo' );
      add_theme_support( 'editor-styles' );
    }
    

  
  
    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension.
     */
    public function add_to_twig( $twig ) {
      $twig->addExtension( new Twig\Extension\StringLoaderExtension() );
      
      // Gets pagenum_link object from Timber\Pagination pages object
      $twig->addFilter( new Twig\TwigFilter( 'pagenum_link', function($pages){
        $link = '';
        $out = array('path' => '/', 'query' => '');
        foreach ($pages as $page) {
          if ( array_key_exists('link', $page) ){
            $link = $page['link'];
            break;
          }
        }
        if ( !$link ) return $out;

        $link = preg_replace( '/page\/[0-9]\//', '', $link );
        $link = parse_url($link);
        if ( array_key_exists('path', $link) ) $out['path'] = $link['path'];
        if ( array_key_exists('query', $link) ) $out['query'] = $link['query'];
        return $out;

      } ) );
  
      return $twig;
    }

}