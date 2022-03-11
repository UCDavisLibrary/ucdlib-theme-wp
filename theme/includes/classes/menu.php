<?php

/**
 * Initializes menu locations
 */
class UcdThemeMenu {

  public function __construct() {

    // slug => label
    $this->menuLocations = array(
      "primary" => "Header (Primary)",
      "brandingBar" => "Header (Branding Bar)",
      "quickLinks" => "Header (Quick Links)",
      "footerCol1" => "Footer (Column 1)",
      "footerCol2" => "Footer (Column 2)",
      "footerCol3" => "Footer (Column 3)",
      "footerCol4" => "Footer (Column 4)",
      "footerCol5" => "Footer (Column 5)",
      "copyright" => "Footer (Copyright)"
    );
    add_filter( 'timber/context', array( $this, 'add_to_context' ) );
    add_action( 'after_setup_theme', array( $this, 'register' ) );
  }

  public function register(){
    register_nav_menus($this->menuLocations);
  }

  public function add_to_context( $context ) {
    $locations = get_nav_menu_locations();
    $context['menu'] = array();
    foreach ($this->menuLocations as $slug => $label) {
      
      // add to context if location has menu data
      if ( array_key_exists($slug, $locations) && $locations[$slug] ) {
        $context['menu'][$slug] = Timber::get_menu($slug);
      }
      
    }
    return $context;
  }
  
  /**
   * @method getDirectHierarchyinMenu
   * @description Gets all ancestor menu items of a post in a menu (also menu item of the post itself)
   * @returns An array of menu items.
   */
  public static function getDirectHierarchyinMenu($menu, $post_id=0) {
    $out = [];
    if ( !$menu->items ) return $out;

    foreach ($menu->items as $parent) {
      
      // we are finding the currently displayed page in the menu
      if ( !$post_id ) {
        if ( $parent->current ) {
          $out[] = $parent;
          return $out;
        }
        if ( !$parent->current_item_ancestor ) continue;
        $out[] = self::getMenuItemBasics($parent);

        foreach ( $parent->children as $child ){
          if ( $child->current ) {
            $out[] = self::getMenuItemBasics($child);
            return $out;
          }
          if ( !$child->current_item_ancestor ) continue;
          $out[] = self::getMenuItemBasics($child);

          foreach ( $child->children as $grandchild ){
            if ( $grandchild->current ) {
              $out[] = self::getMenuItemBasics($grandchild);
              return $out;
            }
            if ( !$grandchild->current_item_ancestor ) continue;
            $out[] = self::getMenuItemBasics($grandchild);
          }
        }


      // we are finding a different page than what is currently displayed
      } else {
        if ( $parent->object_id == $post_id ){
          $out[] = self::getMenuItemBasics($parent);
          return $out;
        }
        foreach ( $parent->children as $child ){
          if ( $child->object_id == $post_id ){
            $out[] = self::getMenuItemBasics($parent);
            $out[] = self::getMenuItemBasics($child);
            return $out;
          }
        }
        foreach ( $child->children as $grandchild ){
          if ( $grandchild->object_id == $post_id ){
            $out[] = self::getMenuItemBasics($parent);
            $out[] = self::getMenuItemBasics($child);
            $out[] = self::getMenuItemBasics($grandchild);
            return $out;
          }
        }
      }
    }

    return $out;
  }

  public static function menuItemIsPost( $menu_item, $post_id ){
    return $menu_item->object_id == $post_id;
  }

  private static function getMenuItemBasics( $menu_item ){
    return [
      'link' => $menu_item->link(),
      'title' => $menu_item->title()
    ];
  }

}