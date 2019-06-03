Estados de las operaciones durante todo el proceso.
Aplicación: Intercambios Sin Fronteras

0.- Se crea la operación.
Estado: 'Solicitada'

	1- Se cancela la operación por parte del cliente.
		Estado: 'Cancelada'

	1- Se rechaza la operación por parte de administración.
		Estado: 'Rechazada

0.1- Se acepta la operación por parte de administración.
	Estado: 'En proceso'

0.2- Se agrega comprobante de la operación por parte del cliente.
	Estado: 'En revisión'

0.3- Se agrega comprobante del pago de la operación por parte de administración.
	Estado: 'Procesada'

1- Se cierra el proceso y se da por concluida la operación.
	Estado: 'Exitosa'

```
INICIO: 'Solicitada'────────────────────────────────────────────────'Rechazada': FIN
																						|
																			Se rechaza por
																			administración

INICIO: 'Solicitada'────────────────────────────────────────────────'Cancelada': FIN
																						|
																			Se cancela por
																				el cliente

INICIO: 'Solicitada'─────────'En proceso'─────────'En revisión'─────────'Procesada'─────────'Exitosa': FIN
												|										 |										|											|
									Se acepta por					Se agrega							Se agrega							Se cierra
									administración			 comprobante					 comprobante				por administración
																			por el cliente			por administración				
```
