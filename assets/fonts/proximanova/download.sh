#! /bin/bash

HOST="https://campusfont.ucdavis.edu"
BASE_PATH="/proxima-nova/proximanova_"
WEIGHTS=( "regular_macroman/proximanova-regular" "bold_macroman/proximanova-bold" "extrabold_macroman/proximanova-extrabold"
 "italic_macroman/proximanova-regularit" "bolditalic_macroman/proximanova-boldit" "extrabolditalic_macroman/proximanova-extraboldit"
 "light_macroman/proximanova-light" "lightitalic_macroman/proximanova-lightit")
FORMATS=("woff2" "woff" "ttf" "svg")

for weight in "${WEIGHTS[@]}"; do
  for format in "${FORMATS[@]}"; do
    wget "$HOST$BASE_PATH$weight-webfont.$format"
    # sleep 1
  done
done