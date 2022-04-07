<?php
require_once( __DIR__ . '/menu.php' );

/**
 * @class UcdThemePost
 * @classdesc Base class for all post types on this site. 
 * When calling Timber::get_post(), this class, or an extension, will be returned
 * https://timber.github.io/docs/v2/guides/extending-timber/#extending-timber-classes
 */
class UcdThemePost extends Timber\Post {

  protected $hide_title;
  public function hide_title(){
    if ( ! empty( $this->hide_title ) ) {
      return $this->hide_title;
    }
    $this->hide_title = get_post_meta($this->ID, 'ucd_hide_title', true);
    return $this->hide_title;
  }

  protected $hide_breadcrumbs;
  public function hide_breadcrumbs(){
    if ( ! empty( $this->hide_breadcrumbs ) ) {
      return $this->hide_breadcrumbs;
    }
    $this->hide_breadcrumbs = get_post_meta($this->ID, 'ucd_hide_breadcrumbs', true);
    return $this->hide_breadcrumbs;
  }

  /**
   * Retrieve all ancestors of this post
   * @returns array - [parent, grandparent, etc]
   */
  protected $ancestors;
  public function ancestors(){
    if ( ! empty( $this->ancestors) ) return $this->ancestors;

    $ancestors = [];
    $post = $this;
    while (true) {
      $parent = $post->parent();
      if ( !$parent ) break;
      $ancestors[] = $parent;
      $post = $parent;
    }

    $this->ancestors = $ancestors;
    return $this->ancestors;
  }

  protected $breadcrumbs;
  public function breadcrumbs(){
    if ( ! empty( $this->breadcrumbs) ) return $this->breadcrumbs;
    $primary_nav = Timber::get_menu( 'primary' );
    $breadcrumbs = [
      ['link' => '/', 'title' => 'Home', 'object_id' => get_option('page_on_front')],
      ['link' => $this->link(), 'title' => $this->title(), 'object_id' => $this->id]
    ];
    $ancestors = $this->ancestors();

    // is a news article, which by are not hierarchical in wp
    if ( $this->post_type == 'post' ) {
      $page_for_posts_id = get_option('page_for_posts');
      if ( $page_for_posts_id ) {
        $page_for_posts = Timber::get_post( $page_for_posts_id );
        array_splice( $breadcrumbs, 1, 0, [['link' => $page_for_posts->link(), 'title' => $page_for_posts->title(), 'object_id' => $page_for_posts_id]] );
        $this->breadcrumbs = $breadcrumbs;
        return $this->breadcrumbs;
      }
    }
      
    // breadcrumbs are constructed from primary nav. bail if it doesn't exist
    if ( !$primary_nav ) {
      $this->breadcrumbs = $breadcrumbs;
      return $this->breadcrumbs;
    }
      
    $customParent = get_post_meta($this->ID, 'ucd_nav_parent', true);
    $in_nav = UcdThemeMenu::getDirectHierarchyinMenu( $primary_nav, $this->id );
    
    // user manually selected the breadcrumb parent
    if ( $customParent ) {
      $parent = UcdThemeMenu::getDirectHierarchybyId( $primary_nav, $customParent );
      if ( count($parent) ){
        array_splice( $breadcrumbs, 1, 0, $parent );
        $this->breadcrumbs = $breadcrumbs;
        return $this->breadcrumbs;
      }
    } 

    // check if ancestor has manually selected breadcrumb
    if ( count($ancestors) ) {
      $ancestors_with_auto_breadcrumb = [];
      foreach ($ancestors as $i => $ancestor) {
        $customParent = get_post_meta($ancestor->ID, 'ucd_nav_parent', true);
        if ( $customParent ) {
          $man_breadcrumb = UcdThemeMenu::getDirectHierarchybyId( $primary_nav, $customParent );
          if ( count($man_breadcrumb) ){
            array_splice( $breadcrumbs, 1, 0, [['link' => $ancestor->link(), 'title' => $ancestor->title()]] );
            array_splice( $breadcrumbs, 1, 0, $man_breadcrumb );
          }
          break;
        } else {
          $ancestors_with_auto_breadcrumb[] = $ancestor;
        }
      }
      if ( count($ancestors) != count($ancestors_with_auto_breadcrumb) ){
        foreach (array_reverse($ancestors_with_auto_breadcrumb) as $ancestor ) {
          array_splice($breadcrumbs, -1, 0, [['link' => $ancestor->link(), 'title' => $ancestor->title()]]);
        }
        $this->breadcrumbs = $breadcrumbs;
        return $this->breadcrumbs;
      }
    }

    // this page is in the primary nav
    if ( count($in_nav) > 1 ){
      array_splice( $breadcrumbs, 1, 0, array_slice($in_nav, 0, -1) );
      $this->breadcrumbs = $breadcrumbs;
      return $this->breadcrumbs;
    }
    
    // check if an ancestor is in primary nav
    if ( count($ancestors) ){
      $ancestors_not_in_nav = [];
      foreach ($ancestors as $i => $ancestor) {
        $in_nav = UcdThemeMenu::getDirectHierarchyinMenu( $primary_nav, $ancestor->id );
        if ( count($in_nav) ){
          array_splice( $breadcrumbs, 1, 0, $in_nav );
          break;
        }
        $ancestors_not_in_nav[] = $ancestor;
      }
      foreach (array_reverse($ancestors_not_in_nav) as $ancestor ) {
        array_splice($breadcrumbs, -1, 0, [['link' => $ancestor->link(), 'title' => $ancestor->title()]]);
      }

    }
    $this->breadcrumbs = $breadcrumbs;
    return $this->breadcrumbs;
  }

  /**
   * If page is in primary nav, and has nav item children, returns those children
   */
  protected $primary_nav_children;
  public function primary_nav_children(){
    if ( !empty($this->primary_nav_children) ) return $this->primary_nav_children;

    $primary_nav = Timber::get_menu( 'primary' );
    foreach ($primary_nav->get_items() as $parent) {
      if ( UcdThemeMenu::menuItemIsPost( $parent, $this->ID) ) {
        $this->primary_nav_children = $parent->children();
        return $this->primary_nav_children;
      }
      $children = $parent->get_items();
      if ( !$children ) continue;
      foreach ($children as $child) {
        if ( UcdThemeMenu::menuItemIsPost( $child, $this->ID) ) {
          $this->primary_nav_children = $child->children();
          return $this->primary_nav_children;
        }
        $grandchildren = $child->get_items();
        if ( !$grandchildren ) continue;
        foreach ($grandchildren as $grandchild) {
          if ( UcdThemeMenu::menuItemIsPost( $grandchild, $this->ID) ) {
            $this->primary_nav_children = $grandchild->children();
            return $this->primary_nav_children;
          }
        }
      }
    }
    return $this->primary_nav_children;
  }

  /**
   * Get the primary nav item to which this post belongs (if any)
   * Returns a Timber/MenuItem or false
   */
  protected $primay_nav_item;
  public function primay_nav_item(){
    if ( !empty($this->primay_nav_item) ) return $this->primay_nav_item;

    $breadcrumbs = $this->breadcrumbs();

    if ( count($breadcrumbs) > 1 && array_key_exists('object_id', $breadcrumbs[1]) ){
      $primary_nav = Timber::get_menu( 'primary' );
      if ( $primary_nav ) {
        foreach ($primary_nav->get_items() as $item) {
          if ( $breadcrumbs[1]['object_id'] == $item->object_id) {
            $this->primay_nav_item = $item;
            return $this->primay_nav_item;
          }
        }
      }
    }

    $this->primay_nav_item = false;
    return $this->primay_nav_item;
  }

  protected $hide_author;
  public function hide_author(){
    if ( ! empty( $this->hide_author ) ) {
      return $this->hide_author;
    }
    $this->hide_author = get_post_meta($this->ID, 'ucd_hide_author', true);
    return $this->hide_author;
  }

  protected $featured;
  public function featured(){
    if ( ! empty( $this->featured ) ) {
      return $this->featured;
    }
    $this->featured = get_post_meta($this->ID, 'ucd_featured', true);
    return $this->featured;
  }

  protected $hero;
  public function hero(){
    if ( ! empty( $this->hero ) ) {
      return $this->hero;
    }
    if ( $this->thumbnail_id() && get_post_meta($this->ID, 'ucd_show_hero', true) ) {
      $this->hero = $this->thumbnail();
    } else {
      $this->hero = false;
    }
    return $this->hero;
  }

  protected $brand_color;
  public function brand_color(){
    if ( ! empty( $this->brand_color ) ) {
      return $this->brand_color;
    }
    $this->brand_color = get_post_meta($this->ID, 'ucd_brand_color', true);
    return $this->brand_color;
  }

  protected $is_sticky;
  public function is_sticky(){
    if ( ! empty( $this->is_sticky ) ) {
      return $this->is_sticky;
    }
    $this->is_sticky = is_sticky($this->ID);
    return $this->is_sticky;
  }
}