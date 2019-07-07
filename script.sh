#!/bin/sh
# Script utilizado para el despliegue de la aplicación

if [ "$1" = "firebase" ]
	# utilizando Angular Firebase
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
	echo "Utilice un parámetro válido: 'firebase'"
fi
