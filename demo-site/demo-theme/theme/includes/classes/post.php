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
}