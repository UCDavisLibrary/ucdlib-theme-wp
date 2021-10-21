<?php
/**
 * The main template file. It is required.
 * It is used:
 *  - for a single post from a custom post type
 *  - when nothing more specific matches a query.
 * 
 */

$context = Timber::context();
$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('404') );

Timber::render( $templates, $context );
