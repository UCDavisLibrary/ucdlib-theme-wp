<?php
/**
 * The template for displaying 404 pages
 */

$context = Timber::context();
echo "this is a true 404";
status_header(404); 
$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('404') );

Timber::render( $templates, $context );
