<?php

$UCD_THEME_COMPONENTS = array(
  "ucd-theme/heading" => array("twig" => "ucd-theme-blocks/heading.twig"),
  "ucd-theme/button-link" => array("twig" => "ucd-theme-blocks/button-link.twig")
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
        )
    );
  }
  return $block_categories;
}