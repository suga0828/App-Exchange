Estructura de la base de datos.
Aplicación: Intercambios Sin Fronteras

```
app-exchange/
└───accounts/
|		└───$uid
|				└───accountId
|						└───accountType?
|						└───date
|						└───email?
|						└───entity?
|						└───id
|						└───plataform?
|						└───numberAccount?
|						└───type
|
└───plataforms/
|		└───$plataformId
|				└───id
|				└───name
|				└───tax
|
└───operations/
|		└───$uid
|			└───$operationId
|					└───amount
|					└───comment?
|					└───date
|					└───destinationAccount?
|					└───originAccount
|					└───status
|					└───type
|
└───users/
		└───$uid
		└───balance
		└───birthdate?
		└───country?
		└───displayName
		└───email
		└───idDocument?
		└───idDocumentImage?
		└───isAdmin?
		└───isVerified
		└───phoneNumber?
		└───uid
```
