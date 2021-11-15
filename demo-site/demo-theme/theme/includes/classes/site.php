<?php
require_once( __DIR__ . '/views.php' );
require_once( __DIR__ . '/meta-data.php' );
require_once( __DIR__ . '/customizer.php' );
require_once( __DIR__ . '/menu.php' );
require_once( __DIR__ . '/blocks.php' );
require_once( __DIR__ . '/assets.php' );
require_once( __DIR__ . '/sidebars.php' );
require_once( __DIR__ . '/user.php' );
require_once( __DIR__ . '/post.php' );
require_once( __DIR__ . '/comments.php' );


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

    $this->blockSettings = array();
    foreach (UCDThemeBlocks::$registry as $slug => $meta) {
      if ( !array_key_exists('hasBrandColors', $meta) || !$meta['hasBrandColors']) continue;
      $shortSlug = explode("/", $slug)[1];
      $customColors = get_theme_mod('colors_blocks_' . $shortSlug, false);
      if (!$customColors || !is_array($customColors) || !count($customColors) ) continue;
      $this->blockSettings['color--' . $shortSlug] = $customColors;
    }

    // Register view paths with theme
    $this->views = new UCDThemeViews();

    // Non-customizer server-side metadata fields
    $this->metaData = new UCDThemeMetaData();

    // User-editable theme options
    $this->customizer = new UcdThemeCustomizer();

    // Queue up scripts and styles
    $this->assets = new UcdThemeAssets($this->scripts, $this->version);

    // Menu locations
    new UcdThemeMenu();

    // Gutenberg blocks
    $this->blockSettings = apply_filters('ucd-block-settings', $this->blockSettings);
    new UCDThemeBlocks( $this->scripts['editor'], $this->blockSettings );

    // Register widget areas (sidebars)
    new UcdThemeSidebars();

    // Remove comments
    new UcdThemeComments();

    // Hook onto actions and filters
    add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
    add_filter( 'timber/context', array( $this, 'add_to_context' ), 4);
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
    add_action( 'init', array( $this, 'register_post_types' ) );
    add_action( 'init', array( $this, 'register_taxonomies' ) );
    add_filter( 'timber/user/class', array( $this, 'extend_user' ), 10, 2 );
    add_filter( 'timber/post/classmap', array($this, 'extend_post') );
    parent::__construct();
    }

    public function extend_user($class, \WP_User $user){
      return UcdThemeUser::class;
    }

    public function extend_post($classmap) {
      $custom_classmap = array(
        'page' => UcdThemePost::class,
        'post' => UcdThemePost::class,
      );

    return array_merge( $classmap, $custom_classmap );
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
      remove_theme_support( 'core-block-patterns' );
    }

    /**
     * Checks if the "posts page" has additional query variables.
     * Used to hide custom page content on first page (if applicable), so that just post archive is shown.
     */
    public function isBasicPostsQuery(){

      global $wp_query;

      if ( is_home() && is_main_query() ) {
        $query_vars = array('author', 'cat', 'tag');
        foreach ($query_vars as $q) {
          if ( $wp_query->get($q) ) return false;
        }
        return true;
      }
      return false;
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

      $twig->addFunction( new Twig\TwigFunction( 'isBasicPostsQuery', array( $this, 'isBasicPostsQuery' ) ) );
  
      return $twig;
    }

}