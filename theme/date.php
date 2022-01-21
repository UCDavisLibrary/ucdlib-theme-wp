<?php
/**
 * The date/time template is used when posts are requested by date or time. 
 * For example, the pages generated with these slugs:
 * http://example.com/2021/
 * http://example.com/2021/05/
 * http://example.com/2021/05/26/
 */


$context = Timber::context();

$title = ucwords(get_theme_mod('layout_posts_title', 'Posts'));

if ( is_day() ) {
	$context['title'] = $title . ' from ' . get_the_date( 'D M Y' );
} elseif ( is_month() ) {
	$context['title'] = $title . ' from ' . get_the_date( 'M Y' );
} elseif ( is_year() ) {
	$context['title'] = $title . ' from ' . get_the_date( 'Y' );
}
$context['breadcrumbs'] = true;

// sidebar content
$context['sidebar'] = Timber::get_widgets( 'post-archive' );
$context['hideSidebar'] = get_theme_mod('layout_posts_sidebar_hide');
$context['rightSidebar'] = get_theme_mod('layout_posts_sidebar_flipped');

if ( !$context['sidebar'] and !$context['hideSidebar'] ){
  $context['categories'] = Timber::get_terms( array(
    'taxonomy' => 'category',
    'hide_empty' => true,
    'exclude' => 1
   ) );
   $context['top_tags'] = Timber::get_terms( array(
    'taxonomy' => 'post_tag',
    'hide_empty' => true,
    'orderby' => 'count',
    'order' => 'DESC',
    'number' => 10
   ));
}

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('date-archive'));

// Filters
$context = apply_filters( 'ucd-theme/context/date', $context );
$templates = apply_filters( 'ucd-theme/templates/date', $templates, $context );

Timber::render( $templates, $context );
