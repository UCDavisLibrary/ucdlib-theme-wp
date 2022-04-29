<?php
/**
 * The template for displaying the 'page' post type.
 */
do_action( 'ucd-theme/template/page' );

$context = Timber::context();
$context['title'] = $context['post']->title();
$context['breadcrumbs'] = true;

// sitewide sidebar content
$context['hideSidebar'] = get_theme_mod('layout_page_sidebar_hide') || $context['post']->meta('ucd_hide_sidebar');
$context['rightSidebar'] = get_theme_mod('layout_page_sidebar_flipped');
$context['sidebar'] = Timber::get_widgets( 'single-page' );
if ( !$context['sidebar'] && !$context['post']->primay_nav_item() ){
    $context['hideSidebar'] = true;
}

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('page') );

// Filters
$context = apply_filters( 'ucd-theme/context/page', $context );
$templates = apply_filters( 'ucd-theme/templates/page', $templates, $context );

Timber::render( $templates, $context );
