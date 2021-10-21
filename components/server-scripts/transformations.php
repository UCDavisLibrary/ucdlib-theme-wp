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
   * Retrieves image object and saves in "image" attribute
   */
  public static function getImage($attrs=array()){
    $new = array();

    if ( array_key_exists('imageId', $attrs) ){
      $new['image'] = new Timber\Image($attrs['imageId']);
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
}
?>