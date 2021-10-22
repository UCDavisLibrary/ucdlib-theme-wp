<?php
/**
 * The tag template is used when visitors request posts by tag.
 */

$context = Timber::context();
$context['tag'] = Timber::get_term();
$context['posts'] = Timber::get_posts();

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('single-tag'));
Timber::render( $templates, $context );
