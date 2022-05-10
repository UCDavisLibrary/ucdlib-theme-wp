<?php
// load Timber
require_once( __DIR__ . '/includes/timber.php' );
if ( ! class_exists( 'Timber' ) ) return;

// instantiate the site
require_once( __DIR__ . '/includes/classes/site.php' );
$GLOBALS['UcdSite'] = new UcdThemeSite();

// JM - SP, PLEASE help make betters
// for html-import script wrapping
function dynamic_js_wp_headers( $headers ) {
  // it's really important no printing happens before this function is called
  if( preg_match('/^\/html-import\//', $_SERVER['REQUEST_URI']) ) {
    $headers['Content-Type'] = 'text/javascript; charset=utf-8';
  }

  return $headers;
}
add_filter( 'wp_headers', 'dynamic_js_wp_headers' );

function add_html_template_query_vars_filter( $vars ){
  if( preg_match('/^\/html-import\//', $_SERVER['REQUEST_URI']) ) {
    $vars[] = "template";
  }
  return $vars;
}
add_filter( 'query_vars', 'add_html_template_query_vars_filter' );