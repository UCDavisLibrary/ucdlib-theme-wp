<?php
class UcdThemeSidebars {
  public function __construct() {
    add_action( 'widgets_init', array($this, 'register') );
  }

  public function register(){
    register_sidebar(
      array(
        'id'            => 'single-post',
        'name'          => "Single Post",
        'description'   => "Widgets for a single news/blog item.",
        'before_widget' => '',
        'after_widget' => ''
      )
    );
    register_sidebar(
      array(
        'id'            => 'single-category',
        'name'          => "Single Category",
        'description'   => "Widgets for a category archive page",
        'before_widget' => '',
        'after_widget' => ''
      )
    );
    register_sidebar(
      array(
        'id'            => 'post-archive',
        'name'          => "Post Archive",
        'description'   => "Widgets for news/blog landing/query pages.",
        'before_widget' => '',
        'after_widget' => ''
      )
    );
    register_sidebar(
      array(
        'id'            => 'single-author',
        'name'          => "Single Author",
        'description'   => "Widgets for a single site author",
        'before_widget' => '',
        'after_widget' => ''
      )
    );
  }
}