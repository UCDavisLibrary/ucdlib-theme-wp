<?php

/**
 * Sets up html imports for sharing twig template partials from this site.
 * Here is code hosted on another site:
 * <html>
 * <head>
 *   <title>A Different Site Than This</title>
 *   <meta name="viewport" content="width=device-width, initial-scale=1">
 *   <script src="https://brand.library.ucdavis.edu/ui/loader.js"></script>
 * </head>
 * <body>
 *   <script src="http://this-site/html-import?template=header"></script>
 *   <main class="l-main">
 *     <p>custom content</p>
 *   </main>
 *  <script src="http://this-site/html-import?template=footer"></script>
 *</body>
 *</html>
 */
class UCDThemeHtmlImport {

  public $templateFile='html-import.php';
  public $matchingPath='html-import';
  public $queryVar='template';

  public function __construct() {

    add_filter( 'template_include', [$this, 'loadTemplate'], 99 );
    add_filter( 'query_vars', [$this, 'registerQueryVar'] );
    add_filter( 'wp_headers', [$this, 'updateHeaders'] );

  }

  // loads html import template if url path matches
  public function loadTemplate( $template ){
    if ( $this->isMatch() ) {
      $htmlImport = locate_template( [$this->templateFile] );
      if ( $htmlImport != '' ) return $htmlImport;
    }
    return $template;
  }

  // url matches what we want
  public function isMatch(){
    global $wp;
    return $wp->request == $this->matchingPath;
  }

  // give php template access to specified url query variable
  public function registerQueryVar( $vars ){
    if ( $this->isMatch() ) $vars[] = $this->queryVar;
    return $vars;
  }

  // set headers to js content type
  public function updateHeaders($headers){
    if ( $this->isMatch() ) $headers['Content-Type'] = 'text/javascript; charset=utf-8';
    return $headers;
  }

}
