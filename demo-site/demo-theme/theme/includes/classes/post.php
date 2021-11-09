<?php
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