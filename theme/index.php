<?php
/**
 * The main template file. It is required.
 * It is used in this theme:
 *  - when nothing more specific matches a query.
 * 
 */
do_action( 'ucd-theme/template/index' );

$context = Timber::context();
$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('404') );

// Filters
$context = apply_filters( 'ucd-theme/context/index', $context );
$templates = apply_filters( 'ucd-theme/templates/index', $templates, $context );

Timber::render( $templates, $context );
