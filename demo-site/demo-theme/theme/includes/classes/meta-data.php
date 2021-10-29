<?php

class UCDThemeMetaData {

  function __construct(){
    // Assign a UCD theme color to a category
    add_action('category_add_form_fields', array($this, 'display_taxonomy_color'), 4, 1);
    add_action('category_edit_form_fields', array($this, 'display_taxonomy_color'), 4, 1);
    add_action('edited_category', array($this, 'save_taxonomy_color'), 4, 1);
    add_action('create_category', array($this, 'save_taxonomy_color'), 10, 2);
    add_filter( 'rest_prepare_category', array($this, 'api_taxonomy_color'), 10, 3);

    // Subtitle on news items
    add_action( 'add_meta_boxes', array($this, 'add_subTitle') );
    add_action( 'save_post', array($this, 'save_subTitle') );  


  }

  /**
   * Renders input box for adding a subtitle to a post
   */
  function add_subTitle(){
    add_meta_box(
      'ucd_subtitle', 
      'SubTitle',
      array($this, 'render_subTitle'),
      'post',
      'side'
    );
  }

  function render_subTitle( $post ){
    $context = array(
      'value' => get_post_meta( $post->ID, 'ucd_subtitle', true )
    );
    Timber::render( "@ucd/admin/subtitle.twig", $context );
  }

  function save_subTitle( $post_id ) {
    if ( array_key_exists( 'ucd_subtitle', $_POST ) ) {
        update_post_meta(
            $post_id,
            'ucd_subtitle',
            $_POST['ucd_subtitle']
        );
    }
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