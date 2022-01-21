<?php
/**
 * The template for displaying all single posts with a post type of 'post' or something custom.
 */

$context = Timber::context();
$context['title'] = $context['post']->title();

$template = 'single';
if ( $context['post']->post_type == 'post' ) {
  $template = 'post';

  $context['sidebar'] = Timber::get_widgets( 'single-post' );

  // get categories for sidebar
  $context['categories'] = Timber::get_terms( [
    'taxonomy' => 'category',
    'hide_empty' => true,
    'exclude' => 1
 ] );

}

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate($template) );

// Filters
$context = apply_filters( 'ucd-theme/context/single', $context );
$templates = apply_filters( 'ucd-theme/templates/single', $templates, $context );

Timber::render( $templates, $context );
