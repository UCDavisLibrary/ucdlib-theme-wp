<?php
/**
 * Search results page
 */
do_action( 'ucd-theme/template/search' );

global $wp_query;
$context = Timber::context();
$GLOBALS['timberContext'] = $context;
$context['title'] = 'Search results for ' . get_search_query();

$context['posts'] = Timber::get_posts($wp_query);

$context['found_posts'] = $wp_query->found_posts;
$context['breadcrumbs'] = true;
$context['search_query'] = get_search_query();

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('search') );

// Filters
$context = apply_filters( 'ucd-theme/context/search', $context );
$templates = apply_filters( 'ucd-theme/templates/search', $templates, $context );

Timber::render( $templates, $context );
