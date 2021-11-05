<?php
class UcdThemeUser extends Timber\User {
  
  /**
   * Checks if a user has a gravitar.
   * Returns url if so, false if not.
   */
  public function verify_gravitar( $size=null ){
    $hashkey = md5(strtolower(trim($this->user_email)));
    $uri = 'http://www.gravatar.com/avatar/' . $hashkey . '?d=404';
    
    $data = wp_cache_get($hashkey);
    if (false === $data) {
      $response = wp_remote_head($uri);
      if( is_wp_error($response) ) {
        $data = 'not200';
      } else {
        $data = $response['response']['code'];
      }
        wp_cache_set($hashkey, $data, $group = '', $expire = 60*5);
  
    }		
    if ($data == '200'){
      if ( $size ) {
        $uri = $uri . "&s=" . $size;
      }
      return $uri;
    } else {
      return false;
    }
  }
}