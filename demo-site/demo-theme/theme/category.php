<?php
/**
 * The category template is used when visitors request posts by category.
 */

$context = Timber::context();
$context['category'] = Timber::get_term();
$context['posts'] = new Timber\PostQuery();

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('single-category'));
Timber::render( $templates, $context );

