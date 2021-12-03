<?php
/**
 * Customizations to Wordpress routing
 * https://wordpress.org/support/article/using-permalinks/
 * https://developer.wordpress.org/reference/classes/wp_rewrite/
 */
class UCDThemeRewrite {
  function __construct(){
    add_action('init',array($this, 'author'));
  }

  public function author(){
    global $wp_rewrite;
    add_rewrite_rule($wp_rewrite->author_base . '/([^/]+)/?$', 'index.php?author_name=$matches[1]', 'top');
  }
}