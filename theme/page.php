<?php
/**
 * The template for displaying the 'page' post type.
 */

$context = Timber::context();
$context['title'] = $context['post']->title();
$context['breadcrumbs'] = true;

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('page') );

// Filters
$context = apply_filters( 'ucd-theme_context_page', $context );
$templates = apply_filters( 'ucd-theme_templates_page', $templates, $context );

Timber::render( $templates, $context );
