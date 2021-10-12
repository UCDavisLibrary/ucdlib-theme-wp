<?php

class UCDThemeMetaData {
  function __construct(){

    // Assign a UCD theme color to a category
    add_action('category_add_form_fields', array($this, 'display_taxonomy_color'), 10, 2);
    add_action('category_edit_form_fields', array($this, 'display_taxonomy_color'), 10, 2);
    add_action('edited_category', array($this, 'save_taxonomy_color'), 10, 2);
    add_action('create_category', array($this, 'save_taxonomy_color'), 10, 2);
    add_filter( 'rest_prepare_category', array($this, 'api_taxonomy_color'), 10, 3);
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
      $context['selected_color'] = get_term_meta($term->term_id, 'theme-color', true);
    }
    Timber::render( "@ucd/admin/category_colors.twig", $context );
  }

  /**
   * Saves theme color for a taxonomy term
   */
  function save_taxonomy_color($term_id){
    if (!isset($_POST['theme-color'])) {
      return;
    }
    update_term_meta($term_id, 'theme-color', sanitize_text_field($_POST['theme-color']));
  }

  /**
   * Displays theme color in category rest api
   */
  function api_taxonomy_color($response, $term, $request){
    $color = get_term_meta($term->term_id, 'theme-color', true);
    $response->data['themeColor'] = $color ?: '';
    return $response;
  }
}

?>