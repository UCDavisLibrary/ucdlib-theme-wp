<?php
/**
 * The template for displaying all single posts with a post type of 'post' or something custom.
 */

$context = Timber::context();
$context['title'] = $context['post']->title();

$template = 'single';
if ( $context['post']->post_type == 'post' ) {
  $template = 'post';

  // Get sidebar panels
  $sidebar_panels = array();
  $i = 0;
  foreach ($GLOBALS['UcdSite']->customizer->sidebar_panels as $panel_id) {
    $panel = array(
      "slug" => $panel_id,
      "hide" => get_theme_mod('layout_post_sidebar_' . $panel_id . "_hide"),
      "order" => intval(get_theme_mod('layout_post_sidebar_' . $panel_id . "_order", $i))
    );
    $sidebar_panels[] = $panel;
    $i++;
  }
  usort($sidebar_panels, function($a, $b){
    if ($a['order'] == $b['order']) {
      return 0;
    }
    return ($a['order'] < $b['order']) ? -1 : 1;
  });

  // get categories for sidebar
  $context['categories'] = Timber::get_terms( [
    'taxonomy' => 'category',
    'hide_empty' => true,
    'exclude' => 1
 ] );
  $context['sidebar_panels'] = $sidebar_panels;
}


$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate($template) );

Timber::render( $templates, $context );
