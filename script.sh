#!/bin/sh
# Script utilizado para el despliegue de la aplicación
# Existen dos opciones: Angular Github Pages y Firebase

if [ "$1" = "github-pages" ]
# utilizando Angular Github Pages
	then
		echo "Inicia despliegue con Angular Github Pages"
		rm -rf dist
		echo "Carpeta /dist borrada. Comienzo de la compilación"
		ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true --base-href "https://suga0828.github.io/App-Exchange/"
		echo "Aplicación compilada. Lista para cargar al servidor"
		npx angular-cli-ghpages --dir=dist/App-Exchange
		echo "Aplicación cargada en la rama gh-pages del repositoro"
		echo "Puede visualizarla en https://suga0828.github.io/App-Exchange/"
elif [ "$1" = "firebase" ]
# utilizando Angular Github Pages
	then
		echo "Inicia despliegue con Firebase"
		rm -rf dist
		echo "Carpeta /dist borrada. Comienzo de la compilación"
		ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true
		echo "Aplicación compilada"
		echo "Lista para cargar al servidor"
		firebase deploy --only hosting:intercambios-sin-fronteras
		echo "Aplicación desplegada"
		echo "Puede visualizarla en https://intercambios-sin-fronteras.web.app"
else
	echo "Utilice un parámetro válido: github-pages o firebase"
fi