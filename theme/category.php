<?php
/**
 * The category template is used when visitors request posts by category.
 */

do_action( 'ucd-theme/template/category' );

$context = Timber::context();
$context['term'] = Timber::get_term();
$context['title'] = $context['term']->name;
$context['brandColor'] = $context['term']->meta('brand-color');
$context['breadcrumbs'] = true;
$context['sidebar'] = Timber::get_widgets( 'single-category' );
$context['breadcrumbs'] = true;
$context['categories'] = Timber::get_terms( [
    'taxonomy' => 'category',
    'hide_empty' => true,
    'exclude' => 1
 ] );

$context['hideSidebar'] = get_theme_mod('layout_category_sidebar_hide');
$context['rightSidebar'] = get_theme_mod('layout_category_sidebar_flipped');

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('single-category'));

// Filters
$context = apply_filters( 'ucd-theme/context/category', $context );
$templates = apply_filters( 'ucd-theme/templates/category', $templates, $context );

Timber::render( $templates, $context );

