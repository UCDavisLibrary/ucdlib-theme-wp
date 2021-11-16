<?php
/**
 * The author page template is used whenever a visitor loads an author page.
 *
 */

global $wp_query;

$views = $GLOBALS['UcdSite']->views;
$context = Timber::context();
if ( isset( $wp_query->query_vars['author'] ) ) {
  $author = Timber::get_user( $wp_query->query_vars['author'] );
  $context['author'] = $author;
  $context['title'] = $author->name();
}
else {
  status_header(404); 
  $templates = array( $views->getTemplate('404'));
  Timber::render( $templates, $context );
}

$context['breadcrumbs'] = true;

// additional metadata
$context['description'] = get_user_meta($author->ID, 'description', true);
foreach ($GLOBALS['UcdSite']->metaData->userMetaFields as $k => $v) {
  $context[$k] = get_user_meta($author->ID, $v['slug'], true);
}
foreach ($GLOBALS['UcdSite']->metaData->userContactFields as $k => $v) {
  $context[$k] = get_user_meta($author->ID, $v['slug'], true);
}

// profile picture
$context['profilePictures'] = array();
if ( $context['profilePicture'] ) {
  $context['profilePictures']['post'] = Timber::get_post($context['profilePicture']);
  $context['profilePictures']['src'] = $context['profilePictures']['post']->src();
} else {
  $gravitar = $author->verify_gravitar(580);
  if ( $gravitar ) {
    $context['profilePictures']['hasGravitar'] = true;
    $context['profilePictures']['src'] = $gravitar;
  } else {
    $context['profilePictures']['hasGravitar'] = false;
  }
}


// sidebar content
$context['sidebar'] = Timber::get_widgets( 'single-author' );
$context['hideSidebar'] = get_theme_mod('layout_author_sidebar_hide');
$context['rightSidebar'] = get_theme_mod('layout_author_sidebar_flipped');

if ( !$context['sidebar'] and !$context['hideSidebar'] ){
  $context['posts'] = Timber::get_posts(array(
    'posts_per_page' => 3
  ));
  #var_dump($context['posts']->found_posts);
}

$templates = array( $views->getTemplate('author'));
Timber::render( $templates, $context );
