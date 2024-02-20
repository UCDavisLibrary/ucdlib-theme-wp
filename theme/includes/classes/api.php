<?php

/**
 * Sets up custom endpoints for the wordpress api
 */
class UCDThemeAPI {

  public $slug;
  public $menuSlug;

  public function __construct($slug) {
    $this->slug = $slug;
    $this->menuSlug = 'menu';

    add_action( 'rest_api_init', array($this, 'register_menu_endpoint') );
    add_action( 'rest_api_init', array($this, 'register_subnav_endpoint') );
    add_action( 'rest_api_init', array($this, 'register_posts_with_block_endpoint') );

    add_filter("rest_post_tag_collection_params", function($params) {
      $params['per_page']['maximum'] = 1000;
      return $params;
    });
    add_filter("rest_category_collection_params", function($params) {
      $params['per_page']['maximum'] = 1000;
      return $params;
    });
  }

  /**
   * While there is a native menu endpoint, it is restricted to admin.
   * We need the average user to be able to see menu items (to construct breadcrumbs)
   */
  public function register_menu_endpoint(){
    register_rest_route($this->slug, "$this->menuSlug/(?P<menu>[a-zA-Z0-9-]+)", array(
      'methods' => 'GET',
      'callback' => array($this, 'epcb_nav'),
      'permission_callback' => function (){return true;}
    ) );
    register_rest_route($this->slug, "$this->menuSlug", array(
      'methods' => 'GET',
      'callback' => array($this, 'epcb_all_menus'),
      'permission_callback' => function (){return true;}
    ) );
  }

  /**
   * Retrieve the subnav links (the primary nav item to which it belongs) for a given page
   */
  public function register_subnav_endpoint(){
    register_rest_route($this->slug, "subnav/(?P<id>\d+)", array(
      'methods' => 'GET',
      'callback' => array($this, 'epcb_subnav'),
      'permission_callback' => function (){return true;}
    ) );
  }

  public function register_posts_with_block_endpoint(){
    register_rest_route($this->slug, "posts-with-block", array(
      'methods' => 'GET',
      'args' => array(
        'block' => array(
          'required' => true,
          'validate_callback' => function($param, $request, $key){
            return is_string($param);
          }
        )
      ),
      'callback' => array($this, 'epcb_posts_with_block'),
      'permission_callback' => [$this, 'applicationPasswordIsAdmin']
    ) );
  }

  public function epcb_subnav( $request ){
    $post = Timber::get_post( $request['id'] );
    if ( !$post ) {
      return new WP_Error( 'rest_not_found', 'Post does not exist', array( 'status' => 404 ) );
    }
    $menu = $post->primay_nav_item();
    if ( !$menu ) return new WP_Error( 'rest_not_found', 'Post does not have subnav', array( 'status' => 404 ) );
    return rest_ensure_response($this->menuToArray($menu));
  }

  public function epcb_all_menus( $request ){
    $menus = get_terms( 'nav_menu', array( 'hide_empty' => true ) );
    return rest_ensure_response($menus);
  }

  public function epcb_nav( $request ){
    if ( !$request['menu'] ){
      return new WP_Error( 'rest_not_found', 'Menu parameter required' );
    }
    if ( $request['menu'] == 'header' ) {
      return rest_ensure_response($this->getHeaderMenus());
    }
    $menu = Timber::get_menu($request['menu']);
    if ( !$menu ) {
      return new WP_Error( 'rest_not_found', 'Menu does not exist' );
    }

    return rest_ensure_response($this->menuToArray( $menu ));
  }

  public function epcb_posts_with_block( $request ){
    if ( !$request['block'] ){
      return new WP_Error( 'rest_not_found', 'Block parameter required' );
    }
    // sanitize the block name
    $request['block'] = sanitize_text_field( $request['block'] );

    $posts = $this->getAllPostsWithBlock( $request['block'] );

    $out = [];
    foreach ($posts as $post) {
      $out[] = [
        'id' => intval($post->ID),
        'title' => html_entity_decode($post->post_title),
        'type' => $post->post_type,
        'link' => html_entity_decode($post->guid),
      ];
    }
    return rest_ensure_response($out);
  }

  private function getHeaderMenus(){
    $out = [];
    $menus = ['primary', 'brandingBar', 'quickLinks'];
    foreach ($menus as $menuSlug) {
      $menu = Timber::get_menu($menuSlug);
      if ( $menu ) {
        $out[$menuSlug] = $this->menuToArray( $menu );
      } else {
        $out[$menuSlug] = null;
      }
    }
    return $out;
  }

  /**
   * Converts a Timber menu class to an array of its items
   */
  private function menuToArray( $menu ){
    $out = [];
    $items = $menu->items ? $menu->items : [$menu];
    foreach ($items as $_link) {
      $link = $this->baseMenuItem($_link);
      foreach ($_link->children as $_child) {
        $child = $this->baseMenuItem($_child);
        foreach ($_child->children as $_grandchild) {
          $child['children'][] = $this->baseMenuItem($_grandchild);
        }
        $link['children'][] = $child;
      }
      $out[] = $link;
    }
    return $out;
  }

  /**
   * Get the import properties from a Timber menu item
   */
  private function baseMenuItem($item) {

    $out = [
      "title" => $item->title(),
      "link" => $item->link(),
      "id" => $item->id,
      'isExternal' => $item->is_external(),
      "children" => [],
    ];

    if ( $item->object_id ) {
      $_wpObj = $item->master_object();
      $wpObj = ['id' => $item->object_id];
      if ( is_a($_wpObj, 'Timber\Post') ){
        $wpObj['type'] = 'post';
        $wpObj['postType'] = $_wpObj->post_type;
      } else if( is_a($_wpObj, 'Timber\Term') ) {
        $wpObj['type'] = 'term';
        $wpObj['taxonomy'] = $_wpObj->taxonomy;
        $wpObj['term'] = $_wpObj->name;
      }
      $out['wpObj'] = $wpObj;
    } else {
      $out['wpObject'] = null;
    }
    return $out;
  }

  // returns the id, guid, post_title, post_type of all posts with the given block
  private function getAllPostsWithBlock( $block ) {
    global $wpdb;
    $post_content = "%<!-- wp:$block%";

    $query = $wpdb->prepare(
      "SELECT ID, post_title, post_type, guid
      FROM $wpdb->posts
      WHERE post_content LIKE %s
      AND post_status = 'publish'
      ORDER BY post_title",
      $post_content
    );

    return $wpdb->get_results($query);
  }

  // checks if request has an application password in basic auth, and if associated user is an admin
  public function applicationPasswordIsAdmin(){
    if ( !isset($_SERVER['HTTP_AUTHORIZATION']) ) return false;
    $auth = $_SERVER['HTTP_AUTHORIZATION'];
    if ( strpos($auth, 'Basic') !== 0 ) return false;
    $auth = base64_decode( substr($auth, 6) );
    $auth = explode(':', $auth);
    if ( count($auth) != 2 ) return false;
    $user = wp_authenticate_application_password(null, $auth[0], $auth[1]);
    if ( is_wp_error($user) ) return false;
    return user_can($user, 'administrator');
  }
}
