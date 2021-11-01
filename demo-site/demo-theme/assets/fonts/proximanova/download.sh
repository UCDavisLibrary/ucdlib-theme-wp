#! /bin/bash

HOST="https://campusfont.ucdavis.edu"
BASE_PATH="/proxima-nova/proximanova_"
WEIGHTS=( "regular_macroman/proximanova-regular" "bold_macroman/proximanova-bold" "italic_macroman/proximanova-regularit"
 "bolditalic_macroman/proximanova-boldit" "black_macroman/proximanova-black")
FORMATS=("eot" "woff2" "woff" "ttf" "svg")

for weight in "${WEIGHTS[@]}"; do
  for format in "${FORMATS[@]}"; do
    wget "$HOST$BASE_PATH$weight-webfont.$format"
    # sleep 1
  done
done