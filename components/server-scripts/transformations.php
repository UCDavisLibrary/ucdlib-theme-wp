<?php

// Contains methods that transform the attributes of a block (mostly fetching additional data)
// See 'transform' property in $UCD_THEME_COMPONENTS array.
class UCDThemeBlockTransformations {

  public static function marketingHighlight($attrs=array()) {
    $new = array();
    if ( array_key_exists('post', $attrs) && array_key_exists('id', $attrs['post']) ) {
      $post_id = $attrs['post']['id'];
      $new['post'] = Timber::get_post( $post_id );
    }
    $attrs = array_merge($attrs, $new);
    return $attrs;
  }

  public static function poster($attrs=array()){
    $new = array();
    if ( array_key_exists('post', $attrs) && array_key_exists('id', $attrs['post']) ) {
      $post_id = $attrs['post']['id'];
      $new['post'] = Timber::get_post( $post_id );
    }
    $attrs = array_merge($attrs, $new);
    return $attrs;
  }
}
?>