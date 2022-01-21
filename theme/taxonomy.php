<?php
/**
 * The taxonomy term template is used when a visitor requests a term in a custom taxonomy.
 */

$context = Timber::context();
$context['term'] = Timber::get_term();
$context['title'] = $context['term']->name;
$context['brandColor'] = $context['term']->meta('brand-color');
$context['breadcrumbs'] = true;

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('single-term'));

// Filters
$context = apply_filters( 'ucd-theme/context/taxonomy', $context );
$templates = apply_filters( 'ucd-theme/templates/taxonomy', $templates, $context );

Timber::render( $templates, $context );
