<?php
require_once(__DIR__ . "/transformations.php");

$UCD_THEME_COMPONENTS = array(
  "ucd-theme/button-link" => array("twig" => "ucd-theme-blocks/button-link.twig"),
  "ucd-theme/heading" => array("twig" => "ucd-theme-blocks/heading.twig"),
  "ucd-theme/marketing-highlight" => array(
    "twig" => "ucd-theme-blocks/marketing-highlight.twig", 
    "transform" => UCDThemeBlockTransformations::marketingHighlight())
);

// hack to remove is-style class prefix
// https://github.com/WordPress/gutenberg/issues/11763
function UCDThemeRemoveStylePrefix($name, $classes) {
  if (strpos($name, 'ucd-theme/') === 0) {
    $classes = str_replace("is-style-","",$classes);
  }
  return $classes;
}

function UCDThemeAddBlockCategories( $block_categories, $editor_context ){
  if ( ! empty( $editor_context->post ) ) {
    array_push(
        $block_categories,
        array(
            'slug'  => 'ucd-links',
            'title' => 'Stylized Links',
            'icon'  => null,
        ),
        array(
          'slug'  => 'ucd-cards',
          'title' => 'Cards and Panels',
          'icon'  => null,
      ),
    );
  }
  return $block_categories;
}