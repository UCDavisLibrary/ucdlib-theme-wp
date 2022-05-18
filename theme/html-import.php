<?php
// will be 404 by default if page doesn't exist
status_header(200);

// get template string from url query
$queryVar = $GLOBALS['UcdSite']->htmlImport->queryVar;
$template = sanitize_file_name(get_query_var($queryVar));

// check for cached response, return if exists
// TODO: check if caching plugin works, if so, remove this transient
if ( false !== ( $htmlImport = get_transient( "htmlImport_$template" ) ) ) {
  if ( !substr( $htmlImport, 0, 14 ) === "document.write") status_header(404);
  echo $htmlImport;
  exit();
}

// get context
$context = Timber::context();
$views = $GLOBALS['UcdSite']->views;
$templates = array( $views->getTemplate('html-import') );
$context['template'] = $template;

// cache and echo requested twig template
try {
  ob_start();
  Timber::render( $templates, $context );
  $htmlImport = ob_get_clean();
  // TODO: remove if cache plugin obviates transient solution
  set_transient( "htmlImport_$template", $htmlImport, 60 * MINUTE_IN_SECONDS );
  echo $htmlImport;
} catch (\Throwable $th) {
  echo "console.warn('$template template does not exist')";
  status_header(404);
}


exit();