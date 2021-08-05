<?php

$UCD_THEME_COMPONENTS = array(
  "ucd-theme/heading" => array("twig" => "ucd-theme-blocks/heading.twig")
);

// hack to remove is-style class prefix
// https://github.com/WordPress/gutenberg/issues/11763
function UCDThemeRemoveStylePrefix($name, $classes) {
  if (strpos($name, 'ucd-theme/') === 0) {
    $classes = str_replace("is-style-","",$classes);
  }
  return $classes;
}