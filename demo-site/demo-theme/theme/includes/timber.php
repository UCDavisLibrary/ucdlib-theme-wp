<?php
/**
 * Loads Timber, which is required for this theme
 */
$composer_autoload = dirname( __DIR__ , 2) . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * If Timber is not activated, render warning to public and admin screens.
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you add it as a composer dependency. </p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return dirname( get_stylesheet_directory() ) . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Timber settings
 */
//Timber::$dirname = array( '../views' );
Timber::$autoescape = false;