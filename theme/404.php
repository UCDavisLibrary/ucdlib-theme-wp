<?php
/**
 * The template for displaying 404 pages
 */

$context = Timber::context();
$content['title'] = "Page Not Found";
echo "this is a true 404";
status_header(404);

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('404') );

// Filters
$context = apply_filters( 'ucd-theme_context_404', $context );
$templates = apply_filters( 'ucd-theme_templates_404', $templates, $context );

Timber::render( $templates, $context );
