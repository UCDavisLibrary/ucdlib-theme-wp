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
	$context['title'] = $author->name();
}
$context['breadcrumbs'] = true;

// sidebar content
$context['sidebar'] = Timber::get_widgets( 'single-author' );
$context['hideSidebar'] = get_theme_mod('layout_author_sidebar_hide');
$context['rightSidebar'] = get_theme_mod('layout_author_sidebar_flipped');

if ( !$context['sidebar'] and !$context['hideSidebar'] ){
}

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('author'));
Timber::render( $templates, $context );
