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
require_once( __DIR__ . '/roles.php' );
require_once( __DIR__ . '/rewrite.php' );
require_once( __DIR__ . '/thumbnails.php' );


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

    // Build params
    $this->buildParams = array(
      "APP_VERSION" => array("label" => "Build: ", "value" => getenv('APP_VERSION')),
      "BUILD_TIME" => array("label" => "Build Time: ", "value" => getenv('BUILD_TIME')),
      "WEBSITE_TAG" => array("label" => "Website Tag: ", "value" => getenv('WEBSITE_TAG'))
    );

    // Custom gutenberg block modifications
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
    $this->blockSettings = apply_filters('ucd-theme_block_settings', $this->blockSettings);
    $this->customBlocks = new UCDThemeBlocks( $this->scripts['editor'], $this->blockSettings );

    // Register widget areas (sidebars)
    new UcdThemeSidebars();

    // Remove comments
    new UcdThemeComments();

    // Customizations to roles and capabilities
    new UcdThemeRoles();

    // Permalink/routing customizations
    new UcdThemeRewrite();

    // Set post featured image sizes
    new UcdThemeThumbnails();

    // Hook onto actions and filters
    add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
    add_filter( 'timber/context', array( $this, 'add_to_context' ), 4);
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
    add_action( 'init', array( $this, 'modify_native_post_types' ) );
    add_filter( 'timber/user/class', array( $this, 'extend_user' ), 10, 2 );
    add_filter( 'timber/post/classmap', array($this, 'extend_post'), 4 );
    add_filter( 'post_type_labels_post', array($this, 'change_post_labels') );

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


    public function modify_native_post_types() {
      add_post_type_support( 'page', 'excerpt' );
    }

    function change_post_labels( $args ) {
      foreach( $args as $key => $label ){
          $args->{$key} = str_replace( [ __( 'Posts' ), __( 'Post' ) ], __( 'News' ), $label );
      }

      return $args;
    }

  
    public function add_to_context( $context ) {
      $context['site']  = $this;
      return $context;
    }
  
    public function theme_supports() {
      // Adds RSS feed links to <head>. 
      // https://codex.wordpress.org/Automatic_Feed_Links
      add_theme_support( 'automatic-feed-links' );
  
      // https://codex.wordpress.org/Title_Tag
      add_theme_support( 'title-tag' );
  
      // https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
      add_theme_support( 'post-thumbnails' );

      // https://codex.wordpress.org/Theme_Markup
      add_theme_support(
        'html5',
        array(
          'comment-form',
          'comment-list',
          'gallery',
          'caption',
        )
      );
  
      // https://codex.wordpress.org/WordPress_Menu_User_Guide
      add_theme_support( 'menus' );

      // The image in the header, not the favicon
      // Can be uploaded in Customizer 'Site Identity' menu
      add_theme_support( 'custom-logo' );

      // Allows us to load main ucd stylesheet into the editor
      add_theme_support( 'editor-styles' );

      // https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/
      remove_theme_support( 'core-block-patterns' );

      // https://make.wordpress.org/core/2021/06/16/introducing-the-template-editor-in-wordpress-5-8/
      remove_theme_support( 'block-templates' );
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