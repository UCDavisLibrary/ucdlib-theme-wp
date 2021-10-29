<?php
/**
 * The tag template is used when visitors request posts by tag.
 */

$context = Timber::context();
$context['term'] = Timber::get_term();
$context['title'] = $context['term']->name;
$context['brandColor'] = $context['term']->meta('brand-color');
$context['breadcrumbs'] = true;

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('single-term'));
Timber::render( $templates, $context );
