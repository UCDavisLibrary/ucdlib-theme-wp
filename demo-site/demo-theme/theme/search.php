<?php
/**
 * Search results page
 */

$templates = array( 'search.twig', 'archive.twig', 'index.twig' );

$context = Timber::context();
$context['title'] = 'Search results for ' . get_search_query();
$context['posts'] = new Timber\PostQuery();

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('search') );
Timber::render( $templates, $context );
