<?php
/**
 * The template for displaying the 'page' post type.
 */

$context = Timber::context();
$context['title'] = $context['post']->title();
$views = $GLOBALS['UcdSite']->views;

$templates = array( $views->getTemplate('page') );

Timber::render( $templates, $context );
