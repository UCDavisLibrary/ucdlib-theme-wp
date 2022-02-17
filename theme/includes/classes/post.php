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

  protected $breadcrumbs;
  public function breadcrumbs(){
    if ( ! empty( $this->breadcrumbs) ) return $this->breadcrumbs;
    $primary_nav = Timber::get_menu( 'primary' );
    $breadcrumbs = [
      ['link' => '/', 'title' => 'Home'],
      ['link' => $this->link(), 'title' => $this->title()]
    ];

    // is a news article, which by are not hierarchical in wp
    if ( $this->post_type == 'post' ) {
      $page_for_posts_id = get_option('page_for_posts');
      if ( $page_for_posts_id ) {
        $page_for_posts = Timber::get_post( $page_for_posts_id );
        array_splice( $breadcrumbs, 1, 0, [['link' => $page_for_posts->link(), 'title' => $page_for_posts->title()]] );
      }
      
    // check if in primary nav
    } else if ( $primary_nav ){
      $in_nav = UcdThemeMenu::getDirectHierarchyinMenu( $primary_nav );
      if ( count($in_nav) > 1 ){
        array_splice( $breadcrumbs, 1, 0, array_slice($in_nav, 0, -1) );
      // check if parent is in primary nav
      } elseif ( !count($in_nav) && $this->parent() ){
        $in_nav = UcdThemeMenu::getDirectHierarchyinMenu( $primary_nav, $this->parent()->id );
        if ( count($in_nav) ){
          array_splice( $breadcrumbs, 1, 0, $in_nav );
        }
      }

    // check if parent is in primary nav
    } 
    $this->breadcrumbs = $breadcrumbs;
    return $this->breadcrumbs;
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