<?php
/**
 * The template for displaying the 'html_import' post type.
 */

$context = Timber::context();
$context['title'] = $context['post']->title();


$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('html-import') );

$context['template'] = get_query_var('template');

// Filters
$context = apply_filters( 'ucd-theme/context/html-import', $context );
$templates = apply_filters( 'ucd-theme/templates/html-import', $templates, $context );

Timber::render( $templates, $context );

exit();