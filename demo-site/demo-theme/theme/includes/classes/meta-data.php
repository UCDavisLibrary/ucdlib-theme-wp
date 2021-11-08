<?php

/**
 * Sets up extra metadata fields. 
 * Will normally be saved in either the 'wp_termmeta', 'wp_postmeta', or 'wp_usermeta' tables
 */
class UCDThemeMetaData {

  function __construct(){
    // Assign a UCD theme color to a category
    add_action('category_add_form_fields', array($this, 'display_taxonomy_color'), 4, 1);
    add_action('category_edit_form_fields', array($this, 'display_taxonomy_color'), 4, 1);
    add_action('edited_category', array($this, 'save_taxonomy_color'), 4, 1);
    add_action('create_category', array($this, 'save_taxonomy_color'), 10, 2);
    add_filter( 'rest_prepare_category', array($this, 'api_taxonomy_color'), 10, 3);

    // Register metadata fields handled by gutenberg
    add_action('init', array($this, 'register_post_meta'));

    // Author/user metadata
    $this->userContactFields = array(
      "emailToDisplay" => array('slug' => 'email_to_display', 'label' => "Email Displayed to Public"),
      "phone_1" => array('slug' => "phone_1", 'label' => "Phone 1"),
      "phone_2" => array('slug' => "phone_2", 'label' => "Phone 2")
    );
    $this->userMetaFields = array(
      "officeRoom" => array('slug' => 'office-room', 'hide' => false),
      "officeAddress" => array('slug' => 'office-address', 'hide' => false),
      "officeHours" => array('slug' => 'office-hours', 'hide' => false),
      "orgPositionTitle" => array('slug' => 'org-position-title', 'hide' => false),
      "orgUnit" => array('slug' => 'org-unit', 'hide' => false),
      "preferredPronouns" => array('slug' => 'preferred-pronouns', 'hide' => false),
      "profilePicture" => array('slug' => 'profile-picture', 'hide' => false)
    );
    add_filter( 'user_contactmethods', array($this, 'user_contactmethods'), 4 );
    add_action( 'show_user_profile', array($this, 'add_user_meta'), 4 );
    add_action( 'edit_user_profile', array($this, 'add_user_meta'), 4 );
    add_action( 'personal_options_update', array($this, 'save_user_meta'), 4 );
    add_action( 'edit_user_profile_update', array($this, 'save_user_meta'), 4 );
    add_action('user_edit_form_tag', function(){
      echo ' enctype="multipart/form-data"';
    });

  }

  function register_post_meta(){

    register_post_meta( 'page', 'ucd_hide_title', array(
      'show_in_rest' => true,
      'single' => true,
      'default' => false,
      'type' => 'boolean',
    ) );
    register_post_meta( 'page', 'ucd_hide_breadcrumbs', array(
      'show_in_rest' => true,
      'single' => true,
      'default' => false,
      'type' => 'boolean',
    ) );
    register_post_meta( 'post', 'ucd_subtitle', array(
      'show_in_rest' => true,
      'single' => true,
      'default' => '',
      'type' => 'string',
    ) );
  }

  function add_user_meta($user){
    $context = array();
    $userMetaFields = apply_filters('ucd_show_profile_fields', $this->userMetaFields);
    foreach ($userMetaFields as $k => $v) {
      $context[$k] = array(
        'value' => get_user_meta($user->ID, $v['slug'], true)
      );
      if ( array_key_exists('hide', $v) ){
        $context[$k]['hide'] = $v['hide'];
      }
    }
    Timber::render( "@ucd/admin/user_profile.twig", $context );
  }

  function save_user_meta($user_id){

    if ( ! current_user_can( 'edit_user', $user_id ) ) {
   	 return false;
    }

    foreach ($this->userMetaFields as $k => $v) {
      
      // upload profile picture
      if ( $v['slug'] == 'profile-picture' ){
        if( array_key_exists($v['slug'], $_FILES) && $_FILES[$v['slug']]['error'] === UPLOAD_ERR_OK ) {

          if ( ! function_exists( 'wp_handle_upload' ) ) {
            require_once( ABSPATH . 'wp-admin/includes/file.php' );
          }

          $_POST['action'] = 'wp_handle_upload';
          $upload_overrides = array( 'test_form' => false );
          $upload = wp_handle_upload( $_FILES[$v['slug']], $upload_overrides );

          if ( $upload && ! isset( $upload['error'] ) ) {

            $file_loc = $upload['file'];
            $file_name = preg_replace('/\.[^.]+$/', '', basename($file_loc));
            $file_type = $upload['type'];

            $attachment = array(
              'post_mime_type' => $file_type,
              'post_title' => $file_name,
              'post_content' => '',
              'post_status' => 'inherit'
            );

            $attach_id = wp_insert_attachment($attachment, $file_loc);
            $attach_data = wp_generate_attachment_metadata($attach_id, $file_loc);
            wp_update_attachment_metadata($attach_id, $attach_data);

            update_user_meta( $user_id, $v['slug'], $attach_id );
          }
          
        }
        else if ( isset($_POST['clear_profile_picture']) ){
          delete_user_meta( $user_id, $v['slug'] );
        }

      }

      // save all other text fields
      else if ( isset( $_POST[$v['slug']] ) ) {
        if ( $_POST[$v['slug']] ) {
          update_user_meta( $user_id, $v['slug'], $_POST[$v['slug']] );
        } else {
          delete_user_meta( $user_id, $v['slug'] );
        }
      }
    }

  }

  function user_contactmethods( $methods ){
    foreach ($this->userContactFields as $k => $v) {
      $methods[$v['slug']] = $v['label'];
    }
    return $methods;
  }

  /**
   * Renders input box for specifying a theme color for a taxonomy term.
   */
  function display_taxonomy_color($term){
    $context = array(
      'current_filter' => current_filter(),
      'term' => $term
    );
    if ( is_object($term) ) {
      $context['selected_color'] = get_term_meta($term->term_id, 'brand-color', true);
    }
    Timber::render( "@ucd/admin/category_colors.twig", $context );
  }

  /**
   * Saves theme color for a taxonomy term
   */
  function save_taxonomy_color($term_id){
    if (!isset($_POST['brand-color'])) {
      return;
    }
    update_term_meta($term_id, 'brand-color', sanitize_text_field($_POST['brand-color']));
  }

  /**
   * Displays theme color in category rest api
   */
  function api_taxonomy_color($response, $term, $request){
    $color = get_term_meta($term->term_id, 'brand-color', true);
    $response->data['brandColor'] = $color ?: '';
    return $response;
  }
}

?>