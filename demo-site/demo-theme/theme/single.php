<?php
/**
 * The template for displaying all single posts with a post type of 'post' or something custom.
 */

$context = Timber::context();
$context['title'] = $context['post']->title();

$template = 'single';
if ( $context['post']->post_type == 'post' ) {
  $template = 'post';
}


$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate($template) );

Timber::render( $templates, $context );
