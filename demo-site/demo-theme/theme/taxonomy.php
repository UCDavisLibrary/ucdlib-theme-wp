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
Timber::render( $templates, $context );
