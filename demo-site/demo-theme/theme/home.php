<?php
/**
 * The home.php template is the post archive.
 * It is the homepage by default, hence the name.
 * However, the user can select a specific route/page in Admin > Settings > Reading, 
 * which will render this file instead of page.php.
 */

$context = Timber::context();
$context['posts'] = Timber::get_posts();

$page_for_posts_id = get_option('page_for_posts');
if ( $page_for_posts_id ) {
  $page_for_posts = Timber::get_post( $page_for_posts_id );
  $context['title'] = $page_for_posts->title();
} else {
  // Todo: make homepage title option
}

$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('post-archive'));
Timber::render( $templates, $context );