#!/bin/sh
# Script utilizado para el proceso de despliegue de la aplicación.

rm -rf dist
echo "Carpeta /dist borrada. Comienzo de la compilación"
ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true --base-href "https://suga0828.github.io/App-Exchange/"
echo "Aplicación compilada"
npx angular-cli-ghpages --no-silent --dir=dist/App-Exchange
echo "Aplicación cargada en la rama gh-pages"