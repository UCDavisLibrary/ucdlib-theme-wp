<?php
/**
 * The home page template is the front page by default 
 * unless the user selects a specific page in Admin > Settings > Reading.
 */

$context = Timber::context();
$context['posts'] = new Timber\PostQuery();
$views = $GLOBALS['UcdSite']->views;

$templates = array( $views->getTemplate('home'));
Timber::render( $templates, $context );