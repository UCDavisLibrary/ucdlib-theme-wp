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

    if ( isset($post_id) ) {
      $new['post'] = Timber::get_post( $post_id );
      $attrs = array_merge($attrs, $new);
    }
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
}
?>