<?php
/**
 * The date/time template is used when posts are requested by date or time. 
 * For example, the pages generated with these slugs:
 * http://example.com/2021/
 * http://example.com/2021/05/
 * http://example.com/2021/05/26/
 */


$context = Timber::context();

if ( is_day() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'D M Y' );
} elseif ( is_month() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'M Y' );
} elseif ( is_year() ) {
	$context['title'] = 'Archive: ' . get_the_date( 'Y' );
} 
$context['posts'] = Timber::get_posts();

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('date-archive'));
Timber::render( $templates, $context );
