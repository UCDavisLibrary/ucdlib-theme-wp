<?php
/**
 * The tag template is used when visitors request posts by tag.
 */
do_action( 'ucd-theme/template/tag' );

$context = Timber::context();
$GLOBALS['timberContext'] = $context;
$context['term'] = Timber::get_term();
$context['title'] = $context['term']->name;
$context['brandColor'] = $context['term']->meta('brand-color');
$context['breadcrumbs'] = true;

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('single-term'));

// Filters
$context = apply_filters( 'ucd-theme/context/tag', $context );
$templates = apply_filters( 'ucd-theme/templates/tag', $templates, $context );

Timber::render( $templates, $context );
