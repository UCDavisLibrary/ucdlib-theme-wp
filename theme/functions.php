<?php
// load Timber
require_once( __DIR__ . '/includes/timber.php' );
if ( ! class_exists( 'Timber' ) ) return;

// instantiate the site
require_once( __DIR__ . '/includes/classes/site.php' );
$GLOBALS['UcdSite'] = new UcdThemeSite();

// just for testing of query block
// remove this
add_action('init', function(){
    register_taxonomy(
        $taxonomy    = 'ucd-subject',
        $object_type = 'post',
        $args        = array(
          'hierarchical' => true,
          'query_var'    => true,
          'show_ui'      => true,
          'public' => true,
          'hide_meta_box' => false,
          'show_admin_column' => true,
          'labels'       => array(
            'name'              => _x( 'Subjects', 'taxonomy general name' ),
            'singular_name'     => _x( 'Subject', 'taxonomy singular name' ),
            'search_items'      => __( 'Search Subjects' ),
            'all_items'         => __( 'All Subjects' ),
            'parent_item'       => __( 'Parent Subject' ),
            'parent_item_colon' => __( 'Parent Subject:' ),
            'edit_item'         => __( 'Edit Subject' ),
            'update_item'       => __( 'Update Subject' ),
            'add_new_item'      => __( 'Add New Subject' ),
            'new_item_name'     => __( 'New Subject' ),
            'menu_name'         => __( 'Subjects' ),
          ),
          'show_in_rest' => true,
          'capabilities' => array(
            'manage_terms' => 'edit_users',
            'edit_terms' => 'edit_users',
            'delete_terms' => 'edit_users',
            'assign_terms' => 'edit_posts'
          )
        )
      );
});