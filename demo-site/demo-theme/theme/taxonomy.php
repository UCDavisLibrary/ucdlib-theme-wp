<?php
/**
 * The taxonomy term template is used when a visitor requests a term in a custom taxonomy.
 */

$context = Timber::context();
$context['tag'] = Timber::get_term();
$context['posts'] = new Timber\PostQuery();

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('single-term'));
Timber::render( $templates, $context );
