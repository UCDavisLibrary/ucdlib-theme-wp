<?php
// load Timber
require_once( __DIR__ . '/includes/timber.php' );
if ( ! class_exists( 'Timber' ) ) return;

// instantiate the site
require_once( __DIR__ . '/includes/classes/site.php' );
$GLOBALS['UcdSite'] = new UcdThemeSite();