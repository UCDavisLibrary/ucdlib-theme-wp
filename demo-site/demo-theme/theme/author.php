<?php
/**
 * The author page template is used whenever a visitor loads an author page.
 *
 */

global $wp_query;

$context = Timber::context();
$context['posts'] = Timber::get_posts();
if ( isset( $wp_query->query_vars['author'] ) ) {
	$author = Timber::get_user( $wp_query->query_vars['author'] );
	$context['author'] = $author;
}

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('author'));
Timber::render( $templates, $context );
