<?php

// Contains methods that transform the attributes of a block (mostly fetching additional data)
// See 'transform' property in $registry array in UCDThemeBlocks class.
class UCDThemeBlockTransformations {

  /**
   * Retrieves post object and saves in "post" attribute.
   */
  public static function getPost($attrs=array()){
    $new = array();
    if ( array_key_exists('post', $attrs) ) {
      if ( is_array($attrs['post']) && array_key_exists('id', $attrs['post'])  ){
        $post_id = $attrs['post']['id'];
      }
    }
    elseif ( array_key_exists('postId', $attrs) ) {
      $post_id = $attrs['postId'];
    }
    elseif ( array_key_exists('blockId', $attrs) ){
      $post_id = $attrs['blockId'];
    }

    if ( isset($post_id) ) {
      $new['post'] = Timber::get_post( $post_id );
      $attrs = array_merge($attrs, $new);
    }
    return $attrs;
  }

  /**
   * Retrieves a collections of posts based on the attributes passed, which roughly
   * correspond to recognized args from the WP API:
   * https://developer.wordpress.org/rest-api/reference/posts/
   * https://developer.wordpress.org/rest-api/reference/pages/
   */
  public static function getPosts($attrs=array()){
    $args = [];

    if ( array_key_exists('postType', $attrs) ) {
      $args['post_type'] = $attrs['postType'];
    } else {
      $args['post_type'] = 'post';
    }
    if ( array_key_exists('author', $attrs) ) $args['author'] = $attrs['author'];
    if ( array_key_exists('search', $attrs) ) $args['s'] = $attrs['search'];
    if ( array_key_exists('orderBy', $attrs) ) $args['orderby'] = $attrs['orderBy'];
    if ( array_key_exists('order', $attrs) ) $args['order'] = $attrs['order'];
    if ( array_key_exists('postCt', $attrs) ) {
      $args['posts_per_page'] = $attrs['postCt'];
    } else {
      $args['posts_per_page'] = 5;
    }

    if ( array_key_exists('terms', $attrs) ){
      $tax_query = [];
      foreach ($attrs['terms'] as $tax => $terms) {
        if ( count($terms) ){
          $tax_query[] = [
            'taxonomy' => $tax,
            'field' => 'term_id',
            'terms' => $terms
          ];
        }
      }
      $args['tax_query'] = $tax_query;
    }
    $attrs['posts'] = Timber::get_posts( $args );
    return $attrs;
  }

  /**
   * If page is in primary nav, returns its children
   * If page is part of hierarchy, return its children
   */
  public static function getNavOrPageChildren($attrs=array()){
    if ( array_key_exists('lookInWpMenu', $attrs) && $attrs['lookInWpMenu'] ){
      return self::getNavChildren($attrs);
    } else {
      return self::getPageChildren($attrs);
    }
  }

  /**
   * If page is in primary nav, returns its nav-item children
   */
  public static function getNavChildren($attrs=array()){
    $attrs['children'] = [];
    if ( !array_key_exists('post', $attrs) || !$attrs['post']) return $attrs;
    $childrenFromNav = $attrs['post']->primary_nav_children();
    if ( $childrenFromNav && count($childrenFromNav) ) {
      foreach ($childrenFromNav as $child) {
        if ( $child->type == 'post_type' ) {
          $attrs['children'][] = Timber::get_post($child->object_id );
        } else {
          $attrs['children'][] = $child;
        };
      }
    }
    return $attrs;
  }

  /**
   * Return all children of a page
   */
  public static function getPageChildren( $attrs=[] ){
    $attrs['children'] = [];
    if ( !array_key_exists('post', $attrs) || !$attrs['post']) return $attrs;

    $query = [
      'post_parent' => $attrs['post']->ID,
      'nopaging' => true,
      'post_type' => 'any'
    ];

    if ( array_key_exists('orderBy', $attrs) ) $query['orderby'] = $attrs['orderBy'];
    if ( array_key_exists('order', $attrs) ) $query['order'] = $attrs['order'];

    $attrs['children'] = Timber::get_posts($query);

    return $attrs;
  }

  /**
   * Retrieves current post object and saves in "post" attribute
   */
  public static function getCurrentPost($attrs=array()){
    $attrs['post'] = Timber::get_post();
    return $attrs;
  }

  /**
   * Adds padding (o-box) and bottom margin (panel) to block.
   */
  public static function addSpacing( $attrs=array() ){
    if ( !array_key_exists('panel', $attrs) ) $attrs['panel'] = true;
    if ( !array_key_exists('oBox', $attrs) ) $attrs['oBox'] = true;
    return $attrs;
  }

  /**
   * Retrieve permalink of postId or taxId attribute and saves in permalink attribute
   */
  public static function getPermalink($attrs=array()){
    if ( array_key_exists('postId', $attrs) ){
      $attrs['permalink'] = get_permalink($attrs['postId']);
    } elseif (array_key_exists('taxId', $attrs)){
      $attrs['permalink'] = get_term_link($attrs['taxId']);
    }
    return $attrs;
  }

  /**
   * Retrieve permalinks for any nav items listed in a 'titleLink' or 'links' attribute array
   * Also, reformats data to match the wp menu schema
   */
  public static function getNavPermalinks($attrs=array()){
    if ( array_key_exists('links', $attrs) ){
      $attrs['links'] = self::_getNavPermalinks($attrs['links']);
    }
    if ( array_key_exists('showTitle', $attrs) && array_key_exists('titleLink', $attrs) ){
      if ( array_key_exists('kind', $attrs['titleLink']) && array_key_exists('id', $attrs['titleLink']) ){
        if ( $attrs['titleLink']['kind'] == 'post-type' ){
          $attrs['titleLink']['url'] = get_permalink($attrs['titleLink']['id']);
        } elseif ( $attrs['titleLink']['kind'] == 'taxonomy' ){
          $attrs['titleLink']['url'] = get_term_link($attrs['titleLink']['id']);
        }
      }
    }
    return $attrs;
  }

  private static function _getNavPermalinks($links){
    foreach($links as &$link) {
      if ( array_key_exists('link', $link) ){

        if ( array_key_exists('opensInNewTab', $link['link']) && $link['link']['opensInNewTab'] ){
          $link['is_target_blank'] = true;
        }

        if ( array_key_exists('label', $link) ){
          $link['title'] = $link['label'];
        }

        if ( array_key_exists('kind', $link['link']) && array_key_exists('id', $link['link']) ){
          if ( $link['link']['kind'] == 'post-type' ){
            $link['link'] = get_permalink($link['link']['id']);
          } elseif ( $link['link']['kind'] == 'taxonomy' ){
            $link['link'] = get_term_link($link['link']['id']);
          } elseif ( array_key_exists('url', $link['link'] )) {
            $link['link'] = $link['link']['url'];
          }
        } elseif ( array_key_exists('url', $link['link'] ) ) {
          $link['link'] = $link['link']['url'];
        } else {
          $link['link'] = false;
        }

        if ( array_key_exists('subItems', $link) ){
          $link['children'] = self::_getNavPermalinks($link['subItems']);
        }
      }
    }
    return $links;
  }

  /**
   * Retrieves categories for site
   */
  public static function getCategories($attrs=array()){
    $new = array();

    // get all categories
    $query = array('taxonomy' => 'category', 'hide_empty' => true, 'exclude' => 1);
    if (array_key_exists('showUncategorized', $attrs) && $attrs['showUncategorized']){
      unset($query['exclude']);
    }
    $new['categories'] = Timber::get_terms($query);

    // check if we are on a category archive page
    $new['queriedTerm'] = Timber::get_term();

    $attrs = array_merge($attrs, $new);
    return $attrs;
  }

  public static function makeJobJsonLd($attrs=[]){
    if ( !array_key_exists('title', $attrs) || !$attrs['title'] ) return $attrs;

    $attrs['json'] = [
      "@context" => "https://schema.org/",
      "@type" => "JobPosting",
      "title" => $attrs['title'],
      "hiringOrganization" => [
        "@type" => "Organization",
        "name" => "UC Davis Library",
        "sameAs" => "https://library.ucdavis.edu/",
        "logo" => "https://library.ucdavis.edu/wp-content/themes/ucdlib-theme-wp/assets/img/site-icon.png"
      ],
      "jobLocation" => [
        "@type" => "Place",
        "address" => [
            "@type" => "PostalAddress",
            "streetAddress" => "1 Shields Ave",
            "addressLocality" => "Davis",
            "addressRegion" => "CA",
            "postalCode" => "95616",
            "addressCountry" => "US"
        ]
      ],
      "employmentType" => array_key_exists('employmentType', $attrs) ? $attrs['employmentType'] : 'FULL_TIME'
    ];

    if ( !array_key_exists('datePosted', $attrs)){
      $attrs['json']['datePosted'] = (new DateTime('now'))->format('Y-m-d');
    } else {
      $attrs['json']['datePosted'] = $attrs['datePosted'];
    }

    if ( array_key_exists('link', $attrs) ) {
      $attrs['json']['url'] = $attrs['link'];
    }

    if ( array_key_exists('finalFilingDate', $attrs) ) {
      $attrs['json']['validThrough'] = $attrs['finalFilingDate'];
    }

    if (array_key_exists('description', $attrs) ){
      $attrs['json']['description'] = $attrs['description'];
    } else {
      $attrs['json']['description'] = "This is a job at the UC Davis Library.";
    }

    if ( !array_key_exists('salaryFrequency', $attrs) ){
      $attrs['salaryFrequency'] = 'HOUR';
    }
    if ( array_key_exists('salaryMin', $attrs) && array_key_exists('salaryMax', $attrs)){
      $attrs['json']['baseSalary'] = [
        "@type" => "MonetaryAmount",
        "currency" => "USD",
        "value" => [
          "@type" => "QuantitativeValue",
          "value" => $attrs['salaryMin'] . ' - ' . $attrs['salaryMax'],
          "unitText" => $attrs['salaryFrequency']
        ]
      ];
    }

    $attrs['json'] = json_encode($attrs['json']);
    return $attrs;
  }

  /**
   * Retrieves image object and saves in "image" attribute
   */
  public static function getImage($attrs=array()){
    $new = array();

    if ( array_key_exists('imageId', $attrs) ){
      $new['image'] = Timber::get_post($attrs['imageId']);
      $attrs = array_merge($attrs, $new);
    }

    return $attrs;
  }

  /**
   * Retrieves recent posts and saves in "posts" attribute
   */
  public static function getRecentPosts($attrs=array()){
    $new = array();
    $postCt = 5;

    if ( array_key_exists('postCt', $attrs) ){
      $postCt = $attrs['postCt'];
    }

    $new['posts'] = Timber::get_posts(array(
      'post_type'=> 'post',
      'posts_per_page'=> $postCt
    ));
    $attrs = array_merge($attrs, $new);

    return $attrs;
  }

  /**
   * Strips is-style prefix from block classlist
   * Necessary until this issue is implemented:
   *  https://github.com/WordPress/gutenberg/issues/11763
   */
  public static function removeStylePrefix($attrs=array()){
    $new = array();
    if ( array_key_exists('className', $attrs) ) {
      $new['className'] = str_replace("is-style-","", $attrs['className']);
    }
    $attrs = array_merge($attrs, $new);
    return $attrs;
  }

  public static function getSlideshowPosts($attrs=[]){
    if ( !array_key_exists('images', $attrs) ) {
      $attrs['images'] = [];
      return;
    }
    $images = [];
    foreach ($attrs['images'] as $image) {
      $id = $image['id'];
      if ( !$id ) continue;
      $images[] = Timber::get_image($id);
    }
    $attrs['images'] = $images;
    return $attrs;
  }

  public static function getMenu( $attrs=[] ){
    if ( !array_key_exists('menuId', $attrs) ) {
      $attrs['menuId'] = [];
      return;
    }
    $attrs['menu'] = Timber::get_menu($attrs['menuId']);
    return $attrs;
  }


  /**
   * Makes alt style blocks backwards compatible
   * https://github.com/UCDavisLibrary/ucdlib-theme-wp/issues/127
   */
  public static function mergeClassWithAttribute($attrs){
    if ( array_key_exists('classSuffix', $attrs) ) {
      $attrs['className'] = $attrs['classSuffix'];
    }
    return $attrs;
  }

  public static function formatContactList( $attrs ) {
    $contact = [];
    $defaultIcon = 'ucd-public:fa-network-wired';
    $icons = [
      'phone' => 'ucd-public:fa-phone',
      'email' => 'ucd-public:fa-envelope',
      'appointment' => 'ucd-public:fa-calendar-check',
      'google-scholar' => $defaultIcon,
      'linkedin' => 'ucd-public:fa-linkedin',
      'orcid' => 'ucd-public:fa-orcid',
      'twitter' => 'ucd-public:x-twitter',
      'other' => $defaultIcon
    ];
    $attrs['icons'] = [];

    if ( array_key_exists('emails', $attrs) && is_array($attrs['emails']) && count($attrs['emails'])) {
      $attrs['icons'][] = $icons['email'];
      foreach ($attrs['emails'] as $email) {
        if ( array_key_exists('value', $email) && $email['value'] ) {
          $contact[] = [
            'value' => $email['value'],
            'link' => 'mailto:' . $email['value'],
            'label' => array_key_exists('label', $email) && $email['label'] ? $email['label'] : $email['value'],
            'icon' => $icons['email']
          ];
        }
      }
    }

    if ( array_key_exists('phones', $attrs) && is_array($attrs['phones']) && count($attrs['phones'])) {
      $attrs['icons'][] = $icons['phone'];
      foreach ($attrs['phones'] as $phone) {
        if ( array_key_exists('value', $phone) && $phone['value'] ) {
          $label = $phone['value'];
          if ( array_key_exists('label', $phone) && $phone['label'] ) {
            $label = $phone['label'];
          } elseif ( strlen($phone['value']) == 10) {
            $label = substr($phone['value'], 0, 3) . '-' . substr($phone['value'], 3, 3) . '-' . substr($phone['value'], 6, 4);
          } else if ( strlen($phone['value']) == 7 ) {
            $label = substr($phone['value'], 0, 3) . '-' . substr($phone['value'], 3, 4);
          }
          $contact[] = [
            'value' => $phone['value'],
            'link' => 'tel:' .  $phone['value'],
            'label' => $label,
            'icon' => $icons['phone']
          ];
        }
      }
    }

    if ( array_key_exists('appointment', $attrs) && $attrs['appointment'] ) {
      $attrs['icons'][] = $icons['appointment'];
      $contact[] = [
        'value' => $attrs['appointment'],
        'link' => $attrs['appointment'],
        'label' => 'Book an Appointment',
        'icon' => $icons['appointment']
      ];
    }

    if ( array_key_exists('websites', $attrs) && is_array($attrs['websites']) ) {
      foreach ($attrs['websites'] as $website) {
        if ( array_key_exists('value', $website) && $website['value'] ) {

          if(array_key_exists('icon', $website) && $website['type'] && $website['type'] == 'other'){
            $ic = $website['icon'];
            $icon = $ic['iconSet'] . ':' . $ic['icon'];
          } else {
            $icon = array_key_exists('type', $website) && $website['type'] && array_key_exists($website['type'], $icons) ? $icons[$website['type']] : $defaultIcon;
          }

          $attrs['icons'][] = $icon;
          $contact[] = [
            'value' => $website['value'],
            'link' => $website['value'],
            'label' => array_key_exists('label', $website) && $website['label'] ? $website['label'] : $website['value'],
            'icon' => $icon
          ];
        }
      }
    }


    $attrs['contact'] = $contact;
    return $attrs;
  }
}
?>
