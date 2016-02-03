#!/bin/bash

mkdir ./tmp
cp *.png ./tmp

for f in ./tmp/*.png
do
	mogrify -resize 60% -modulate 15 $f
done

spritesheet-js --trim -n backPlanets -f pixi.js -p ../ ./tmp/*.png

rm -r ./tmp
