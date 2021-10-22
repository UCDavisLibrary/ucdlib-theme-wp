<?php
/**
 * The home.php template is the post archive.
 * It is the homepage by default, hence the name.
 * However, the user can select a specific route/page in Admin > Settings > Reading, 
 * which will render this file instead of page.php.
 */

$context = Timber::context();
$context['posts'] = Timber::get_posts();
$views = $GLOBALS['UcdSite']->views;

$templates = array( $views->getTemplate('post-archive'));
Timber::render( $templates, $context );