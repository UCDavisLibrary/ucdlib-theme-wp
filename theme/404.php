<?php
/**
 * The template for displaying 404 pages
 */

do_action( 'ucd-theme/template/404' );

$context = Timber::context();
$content['title'] = "Page Not Found";
echo "this is a true 404";
status_header(404);

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('404') );

// Filters
$context = apply_filters( 'ucd-theme/context/404', $context );
$templates = apply_filters( 'ucd-theme/templates/404', $templates, $context );

Timber::render( $templates, $context );
