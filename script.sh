#!/bin/sh
# Script utilizado para el despliegue de la aplicación
# utilizando Angular Github Pages

echo "Inicia despliegue"
rm -rf dist
echo "Carpeta /dist borrada. Comienzo de la compilación"
# ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true --base-href "https://suga0828.github.io/App-Exchange/"
ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true
echo "Aplicación compilada"

# npx angular-cli-ghpages --dir=dist/App-Exchange
# echo "Aplicación cargada en la rama gh-pages del repositoro"

echo "Comienzo del despliegue"
# Script utilizado para el despliegue de la aplicación
# utilizando Firebase
firebase deploy --only hosting:intercambios-sin-fronteras
echo "Aplicación desplegada"