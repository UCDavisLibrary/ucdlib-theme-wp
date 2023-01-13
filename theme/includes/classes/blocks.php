<?php
require_once( __DIR__ . '/block-transformations.php' );
require_once( __DIR__ . '/block-renderer.php');

/** 
 * Handles server-side rendering of UCD blocks through WP actions and filters on class instantiation.
 * 
 * @param string $editor_script_slug - The identifier for your editor JS script registered with WP
 * @param array $settings - Override any of the default settings
 * 
 */
class UCDThemeBlocks extends UCDThemeBlockRenderer {
  public $editor_script_slug;
  public $settings;

  function __construct($editor_script_slug, $settings=array()) {
    parent::__construct();
    $this->editor_script_slug = $editor_script_slug;
    $this->set_settings($settings);

    $this->iconsUsed = [
      'ucd-public:fa-star',
      'ucd-public:fa-circle-chevron-right'
    ];

    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
    add_action( 'enqueue_block_editor_assets', array( $this, "enqueue_block_editor_assets" ), 5 );
    add_action('block_categories_all', array($this, 'addCategories'), 10,2);
    add_filter( 'render_block', array($this, 'modifyCoreBlock'), 10, 2 );
    add_action( 'init', array($this, 'setPageBlockTemplate'), 100);
    add_filter('excerpt_allowed_wrapper_blocks', array($this, 'excerpt_allowed_wrapper_blocks'));
  }

  public static $transformationClass = 'UCDThemeBlockTransformations';

  /**
   * Meta for each block goes here.
   */
  public static $registry = array(
    "ucd-theme/background-color" => array("twig" => "@ucd/blocks/background-color.twig"),
    "ucd-theme/background-image" => array(
      "twig" => "@ucd/blocks/background-image.twig",
      "transform" => array("getImage")
    ),
    "ucd-theme/brand-textbox" => array(
      "twig" => "@ucd/blocks/brand-textbox.twig",
      "hasBrandColors" => true
    ),
    "ucd-theme/button-link" => array(
      "twig" => "@ucd/blocks/button-link.twig", 
      "transform" => array("removeStylePrefix", 'getPermalink')
    ),
    "ucd-theme/career" => array(
      "twig" => "@ucd/blocks/career.twig",
      "transform" => ['makeJobJsonLd']
    ),
    "ucd-theme/careers" => array(
      "twig" => "@ucd/blocks/careers.twig"
    ),
    "ucd-theme/category-filter" => array(
      "twig" => "@ucd/blocks/category-filter.twig", 
      "transform" => array("getCategories")
    ),
    "ucd-theme/contact-list" => array(
      "twig" => "@ucd/blocks/contact-list.twig", 
      "transform" => array("formatContactList")
    ),
    "ucd-theme/faq" => array(
      "twig" => "@ucd/blocks/faq.twig",
      "transform" => array("addSpacing")
    ),
    "ucd-theme/faq-item" => array(
      "twig" => "@ucd/blocks/faq-item.twig"
    ),
    'ucd-theme/featured-article' => [
      'twig' => "@ucd/blocks/featured-article.twig",
      "transform" => array("getPost", "addSpacing")
    ],
    "ucd-theme/focal-link" => array(
      "twig" => "@ucd/blocks/focal-link.twig",
      "hasBrandColors" => true,
      "transform" => array("getPermalink")
    ),
    "ucd-theme/footer-column" => array(
      "twig" => "@ucd/blocks/footer-column.twig"
    ),
    "ucd-theme/footer-columns" => array(
      "twig" => "@ucd/blocks/footer-columns.twig"
    ),
    "ucd-theme/footer-nav" => array(
      "twig" => "@ucd/blocks/footer-nav.twig",
      'transform' => ['getMenu']
    ),
    "ucd-theme/google-maps" => array( "twig" => "@ucd/blocks/google-maps.twig" ),
    "ucd-theme/heading" => array(
      "twig" => "@ucd/blocks/heading.twig", 
      "transform" => array("removeStylePrefix", 'mergeClassWithAttribute')
    ),
    "ucd-theme/heading-with-icon" => array(
      "twig" => "@ucd/blocks/heading-with-icon.twig",
      "hasBrandColors" => true
    ),
    "ucd-theme/hero-banner" => array(
      "twig" => "@ucd/blocks/hero-banner.twig",
      "transform" => array("getPost", 'addSpacing'),
      "hasBrandColors" => true
    ),
    "ucd-theme/image-landscape" => array(
      "twig" => "@ucd/blocks/image-landscape.twig", 
      "transform" => array("getImage", "getPermalink", 'addSpacing')
    ),
    "ucd-theme/marketing-highlight" => array(
      "twig" => "@ucd/blocks/marketing-highlight.twig",
      "img" => "640x480.png",
      "transform" => array("getPost", "addSpacing"),
      "hasBrandColors" => true
    ),
    "ucd-theme/marketing-highlight-horizontal" => array(
      "twig" => "@ucd/blocks/marketing-highlight-horizontal.twig",
      "img" => "1280x720.png",
      "transform" => array("getPost", "addSpacing"),
      "hasBrandColors" => true
    ),
    "ucd-theme/media-link" => array(
      "twig" => "@ucd/blocks/media-link.twig",
      "img" => "135x135.png",
      "transform" => array("getPost", "getImage"),
      "uses_context" => array('media-links/hideImage')
    ),
    "ucd-theme/media-links" => array(
      "twig" => "@ucd/blocks/media-links.twig",
      "transform" => array("addSpacing"),
      "provides_context" => array('media-links/hideImage' => 'hideImage')
    ),
    "ucd-theme/poster" => array(
      "twig" => "@ucd/blocks/poster.twig",
      "img" => "1280x720.png",
      "transform" => array("getPost", "addSpacing"),
      "hasBrandColors" => true
    ),
    "ucd-theme/poster-list" => array("twig" => "@ucd/blocks/poster-list.twig"),
    "ucd-theme/prefixed-icon-link" => array(
      "twig" => "@ucd/blocks/prefixed-icon-link.twig",
      "hasBrandColors" => true,
      "transform" => array("getPermalink")
    ),
    "ucd-theme/primary-subnav" => array(
      "twig" => "@ucd/blocks/primary-subnav.twig",
      "transform" => array("getCurrentPost", 'addSpacing'),
    ),
    "ucd-theme/priority-link" => array(
      "twig" => "@ucd/blocks/priority-link.twig",
      "hasBrandColors" => true,
      "transform" => array("getPermalink")
    ),
    "ucd-theme/priority-links-item" => array(
      "twig" => "@ucd/blocks/priority-links-item.twig"
    ),
    "ucd-theme/priority-links" => array("twig" => "@ucd/blocks/priority-links.twig"),
    "ucd-theme/lander-nav" => array(
      "twig" => "@ucd/blocks/lander-nav.twig", 
      "transform" => array("getCurrentPost", "getNavOrPageChildren", "addSpacing")
    ),
    "ucd-theme/layout-basic" => array("twig" => "@ucd/blocks/layout-basic.twig"),
    "ucd-theme/column" => array("twig" => "@ucd/blocks/layout-column.twig"),
    "ucd-theme/layout-columns" => array("twig" => "@ucd/blocks/layout-columns.twig"),
    "ucd-theme/layout-container" => array("twig" => "@ucd/blocks/layout-container.twig"),
    "ucd-theme/layout-shrink" => array("twig" => "@ucd/blocks/layout-shrink.twig"),
    "ucd-theme/layout-quad" => array("twig" => "@ucd/blocks/layout-quad.twig"),
    "ucd-theme/manual-subnav" => array(
      "twig" => "@ucd/blocks/manual-subnav.twig",
      "transform" => array('getNavPermalinks', 'addSpacing')
    ),
    "ucd-theme/object-box" => array("twig" => "@ucd/blocks/object-box.twig"),
    "ucd-theme/panel-with-icon" => array(
      "twig" => "@ucd/blocks/panel-with-icon.twig",
      "hasBrandColors" => true,
      "transform" => array("getPermalink")
    ),
    "ucd-theme/query" => array(
      "twig" => "@ucd/blocks/query.twig",
      "transform" => array("getPosts", 'addSpacing')
    ),
    "ucd-theme/recent-posts" => array(
      "twig" => "@ucd/blocks/recent-posts.twig",
      "transform" => array("getPosts", 'addSpacing')
    ),
    "ucd-theme/reusable" => array(
      "twig" => "@ucd/blocks/reusable.twig",
      "transform" => array("getPost")
    ),
    "ucd-theme/sils-search-redirect" => array("twig" => "@ucd/blocks/sils-search-redirect.twig"),
    "ucd-theme/separator" => array(
      "twig" => "@ucd/blocks/separator.twig",
      "hasBrandColors" => true
    ),
    "ucd-theme/slideshow" => [
      'twig' => '@ucd/blocks/slideshow.twig',
      'transform' => ['getSlideshowPosts']
    ],
    "ucd-theme/social-media" => array("twig" => "@ucd/blocks/social-media.twig"),
    "ucd-theme/spacer" => array("twig" => "@ucd/blocks/spacer.twig"),
    "ucd-theme/teaser" => array(
      "twig" => "@ucd/blocks/teaser.twig",
      "img" => "135x135.png",
      "transform" => array("getPost", "getImage"),
      "hasBrandColors" => true,
      "uses_context" => array(
        'teasers/hideImage',
        'teasers/hideByline',
        'teasers/hideExcerpt',
        'teasers/hideCategories'
        )
    ),
    "ucd-theme/teasers" => array(
      "twig" => "@ucd/blocks/teasers.twig",
      "transform" => array('addSpacing'),
      "provides_context" => array(
        'teasers/hideImage' => 'hideImage',
        'teasers/hideByline' => 'hideByline',
        'teasers/hideExcerpt' => 'hideExcerpt',
        'teasers/hideCategories' => 'hideCategories')
    ),
    "ucd-theme/trumba" => [
      'twig' => '@ucd/blocks/trumba.twig'
    ],
    'ucd-theme/trumba-filters' => [
      'twig' => '@ucd/blocks/trumba-filters.twig'
    ],
    'ucd-theme/trumba-upcoming' => [
      'twig' => '@ucd/blocks/trumba-upcoming.twig'
    ]
  );

  /**
   * Will be used unless overridden by user settings on construction.
   * Some settings are also dynamically constructed from registry array.
   */
  public static $default_settings = array(
    "imgByAspectRatio" => array(
      "1x1" => "135x135.png",
      "4x3" => "640x480.png",
      "16x9" => "1280x720.png"
    )
  );

  /**
   * Core blocks to unregister. 
   * Most because they are redundant of a ucd block.
   */
  public static $excluded_core_blocks = array(
    "core/buttons",
    "core/button",
    "core/calendar",
    "core/categories",
    "core/columns",
    "core/column",
    "core/cover",
    //"core/gallery",
    "core/latest-comments",
    "core/latest-posts",
    "core/loginout",
    "core/navigation",
    "core/nextpage",
    "core/post-content",
    "core/post-date",
    "core/post-excerpt",
    "core/post-featured-image",
    "core/page-list",
    "core/post-template",
    "core/post-terms",
    "core/post-title",
    "core/pullquote",
    "core/site-logo",
    "core/site-tagline",
    "core/site-title",
    "core/separator",
    "core/social-links",
    "core/spacer",
    "core/tag-cloud",
    "core/query",
    "core/query-pagination",
    "core/query-pagination-next",
    "core/query-pagination-numbers",
    "core/query-pagination-previous",
    "core/query-title",
    "core/search",
  );

  /**
   * Custom block categories
   */
  public function addCategories($block_categories, $editor_context){
    $customCategories = array(
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
      array(
        'slug'  => 'ucd-fancy-lists',
        'title' => 'Fancy Lists',
        'icon'  => null,
      ),
      array(
        'slug'  => 'ucd-layout',
        'title' => 'Layouts',
        'icon'  => null,
      ),
      array(
        'slug'  => 'ucd-query',
        'title' => 'Queries',
        'icon'  => null,
      ),
      array(
        'slug'  => 'ucd-sils',
        'title' => 'SILS',
        'icon'  => null,
      )
    );
      
    $textIndex = array_search('text', array_column($block_categories, 'slug'));
    if ( $textIndex !== false) {
      array_splice( $block_categories, $textIndex+1, 0, $customCategories );
    } else {
      array_push(
        $block_categories,
        ...$customCategories
      );
    }
    return $block_categories;
  }

  // let innerblocks of these blocks be rendered in an excerpt
  // https://developer.wordpress.org/reference/functions/excerpt_remove_blocks/
  public function excerpt_allowed_wrapper_blocks($blocks){
    $b = [
      "ucd-theme/layout-basic",
      "ucd-theme/column",
      "ucd-theme/layout-columns",
      "ucd-theme/layout-container",
      "ucd-theme/layout-shrink",
      "ucd-theme/layout-quad",
      "ucd-theme/object-box"
    ];
    return array_merge( $blocks, $b );
  }

  /**
   * Merges default and user settings
   */
  private function set_settings($user_settings){
    if ( is_array($user_settings) ) {
      $settings = array_merge(self::$default_settings, $user_settings);
    } else {
      $settings = self::$default_settings;
    }

    if ( !array_key_exists('imgBase', $settings) ){
      $settings["imgBase"] = dirname( get_template_directory_uri() ) . "/assets/img/block-defaults/";
    }

    // merge settings from block registry
    foreach (self::$registry as $slug => $meta) {
      $shortSlug = explode("/", $slug)[1];

      // default image
      $imgProp = 'img--' . $shortSlug;
      if ( array_key_exists('img', $meta) && !array_key_exists($imgProp, $settings) ) {
        $settings[$imgProp] = $meta["img"];
      }

      // custom color palette
      $colorProp = "color--" . $shortSlug;
      if ( array_key_exists('color', $meta) && !array_key_exists($colorProp, $settings) ) {
        $settings[$colorProp] = $meta["color"];
      }
    }
    $settings['excludedCoreBlocks'] = self::$excluded_core_blocks;

    $settings["watercolorBase"] = dirname( get_template_directory_uri() ) . "/assets/img/watercolors/";

    $settings = apply_filters( 'ucd-theme/block-settings', $settings );

    $this->settings = $settings;

  }

  /**
   * Adds settings object to window, so gutenberg blocks can access.
   */
  public function enqueue_block_editor_assets(){
    $editorBundleSlug = $this->editor_script_slug; 
    $editorBundleSlug = apply_filters( 'ucd-theme/assets/editor-settings-slug', $editorBundleSlug );
    wp_add_inline_script($editorBundleSlug, "window.UCDBlockSettings=" . json_encode($this->settings) , 'before');
  }

  /**
   * Sets the default block template loaded when a new page is created
   */
  public function setPageBlockTemplate(){
    if ( !get_theme_mod('layout_page_template') ) return;
    $page_type_object = get_post_type_object( 'page' );
    $template = [
      ['ucd-theme/layout-basic', ['sideBarLocation' => 'right', 'modifier' => 'flipped'], [
        ['ucd-theme/column', ['layoutClass' => 'l-content', 'forbidWidthEdit' => true], [['core/paragraph']]],
        ['ucd-theme/column', ['layoutClass' => 'l-sidebar-first', 'forbidWidthEdit' => true], [['ucd-theme/primary-subnav']]]
      ]]
    ];
    $template = apply_filters( 'ucd-theme/block-template/page', $template );
    $page_type_object->template = $template;
  }

  /**
   * Adds handy functions and filters to twig
   */
  public function add_to_twig( $twig ){
    $twig->addFunction( new Twig\TwigFunction( 'DefaultImage', array( $this, 'getBlockImageDefault' ) ) );
    $twig->addFunction( new Twig\TwigFunction( 'DefaultImageByAspectRatio', array( $this, 'getImageByAspectRatio' ) ) );
		return $twig;
  }

  /**
   * Retrieves url of default for image for a block
   */
  public function getBlockImageDefault($slug){
    if ( !array_key_exists('img--' . $slug, $this->settings) ) return "";
    $img = $this->settings['img--' . $slug];
    return $this->settings['imgBase'] . $img;
  }

  /**
   * Retrieves url of default image for a given aspect ratio
   */
  public function getImageByAspectRatio($aspectRatio){
    if ( 
      !array_key_exists("imgByAspectRatio", $this->settings) ||
      !array_key_exists($aspectRatio, $this->settings["imgByAspectRatio"])
    ) return "";
    $img = $this->settings["imgByAspectRatio"][$aspectRatio];
    return $this->settings['imgBase'] . $img;
  }

  public function modifyCoreBlock( $block_content, $block ) {
    if ( $block['blockName'] === 'core/table' ) {
      $content = '<div class="responsive-table" role="region" aria-label="Scrollable Table" tabindex="0">';
      $content .= $block_content;
      $content .= '</div>';
      return $content; 
    }
    return $block_content;
  }
    
}

?>