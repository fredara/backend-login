# Título del Proyecto

Test para el puedo de Backend en Avilatek 

### Instalación 🔧

Copiar repositorio
Instalar las dependecias
Agregar el archivo . env al proyecto (Enviado al correo)

```
git clone https://github.com/fredara/avilatek-backend.git
```


```
Ejecutar el comando 'npm i'
```

```
Copiar el archivo . env en la raiz del proyecto './'
```

```
Ejecutar el comando  'npm run dev'
```

Server is lisetn on port:  4001
db is connect mongodb://localhost:27017/**name_of_database**

## Ejecutando las pruebas ⚙️


**Sign Up.** Puede Probar el Modelo usando Postman o cualquier plataforma que le permita usar una API. El modelo tiene una validacion que no permite guardar correos que ya esten registrados. http://localhost:4001/auth/signup (POST)

```
Para Probar el Sign Up. Ingresando el siguiente ejemplo en formato json (POST)
{
    "name": "David",
    "lastName": "Valecillos",
    "identification": "4521874",
    "email":"davidvalecilloscorreo@gmail.com",
    "password": "123contra"
}

```
**Sign In.** Puede Probar el Modelo usando Postman o cualquier plataforma que le permita usar una API, con http://localhost:4001/auth/signin (POST)

```
Para Probar el Sign In. Ingresando el siguiente ejemplo en formato json
{
    "email":"davidvalecilloscorreo@gmail.com",
    "password": "123contra"
}

```
**Sign Out.** Puede Probar el Modelo usando Postman o cualquier plataforma que le permita usar una API (POST)
```
http://localhost:4001/auth/signout


```
**Buscar Logueado.** Puede Probar el Modelo usando Postman o cualquier plataforma que le permita usar una API  

```
Para Buscar el Usuario Logeado. Ingresando el siguiente ejemplo  http://localhost:4001/auth/getUserLogin (GET)


```

**Paginacion de Usuarios.** Puede Probar el Modelo usando Postman o cualquier plataforma que le permita usar una API  

```
Ingresando el siguiente ejemplo  http://localhost:4001/auth/getalluser?page=1&limit=10 (GET)


```



## Construido con 🛠️

Nodejs 14.17.0
Express 4.18.2
MongoDB
Mongoose 6.7.1
cors
Cookie-session
bcryptjs

* [NodeJs](https://nodejs.org/en/docs/) 
* [Express](https://expressjs.com/en/5x/api.html) 
* [MongoDB](https://www.mongodb.com/docs/) 
* [Mongoose](https://mongoosejs.com/docs/) 




## Autor ✒️

* **Freddy Ramirez** - *Desarrollador* - [fredara](https://github.com/fredara)