<?php
/**
 * Search results page
 */
global $wp_query;
$context = Timber::context();
$context['title'] = 'Search results for ' . get_search_query();

$context['posts'] = Timber::get_posts($wp_query);

$context['found_posts'] = $wp_query->found_posts;
$context['breadcrumbs'] = true;
$context['search_query'] = get_search_query();

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('search') );
Timber::render( $templates, $context );
