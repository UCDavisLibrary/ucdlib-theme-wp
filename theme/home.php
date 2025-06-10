<?php
/**
 * The home.php template is the post archive.
 * It is the homepage by default, hence the name.
 * However, the user can select a specific route/page in Admin > Settings > Reading,
 * which will render this file instead of page.php.
 */

do_action( 'ucd-theme/template/home' );

$context = Timber::context();
$GLOBALS['timberContext'] = $context;

$page_for_posts_id = get_option('page_for_posts');
if ( $page_for_posts_id ) {
  $page_for_posts = Timber::get_post( $page_for_posts_id );
  $context['page_for_posts'] = array();
  $context['page_for_posts']['post'] = $page_for_posts;
  $context['page_for_posts']['location'] = get_theme_mod('layout_posts_page_content', 'hide');
  $context['title'] = $page_for_posts->title();
} else {
  $context['title'] = get_theme_mod('layout_posts_homepage_title', 'Posts');
}

$context['is_paged']= is_paged();
$context['breadcrumbs'] = true;
$context['latest_news_title'] = get_theme_mod('layout_posts_list_title', 'Latest News');

// teaser settings
$context['teaserSettings'] = [
  'hideImage' => get_theme_mod('layout_posts_teaser_hide_image') ? true : false,
  'hideExcerpt' => get_theme_mod('layout_posts_teaser_show_excerpt') ? false : true
];

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
$templates = array( $views->getTemplate('post-archive'));

// Filters
$context = apply_filters( 'ucd-theme/context/home', $context );
$templates = apply_filters( 'ucd-theme/templates/home', $templates, $context );

Timber::render( $templates, $context );
