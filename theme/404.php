<?php
/**
 * The template for displaying 404 pages
 */

do_action( 'ucd-theme/template/404' );

$context = Timber::context();
$GLOBALS['timberContext'] = $context;
$title = "Page Not Found";
$context['title'] = $title;
status_header(404);

$widgetArea =  Timber::get_widgets( 'four-oh-four' );
if ( trim($widgetArea) ) {
  $context['content'] = $widgetArea;
} else {
  $context['content'] = "<p>Sorry, we couldn't find what you're looking for.</p>";
}

$context['breadcrumbs'] = [
  ['link' => '/', 'title' => 'Home'],
  ['link' => "", 'title' => $title]
];

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('404') );

// Filters
$context = apply_filters( 'ucd-theme/context/404', $context );
$templates = apply_filters( 'ucd-theme/templates/404', $templates, $context );

Timber::render( $templates, $context );
