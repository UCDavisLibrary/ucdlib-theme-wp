<?php

/**
 * Sets up custom endpoints for the wordpress api
 */
class UCDThemeAPI {
  public function __construct($slug) {
    $this->slug = $slug;
    $this->menuSlug = 'menu';

    add_action( 'rest_api_init', array($this, 'register_menu_endpoint') );
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
    foreach ($menu->items as $_link) {
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
}