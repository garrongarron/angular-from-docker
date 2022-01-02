## Crear un proyecto desde cero
### Crear un contenedor con  el CLI de Angular
Usando el dockerfile que esta dentro de la carpeta builder...
```
FROM node:lts-alpine
RUN npm install -g @angular/cli
WORKDIR /app
```
Ejecuta el siguiente comando para crear una iamgen que contendra un ambiente con ng de manera global

```
sudo docker build -t ngbuilder ./builder
```
Crea contenedor con esa imagen creada
```
sudo docker run -itd -v ${PWD}:/app --name angularWeb ngbuilder
```

- checa con `sudo docker images | grep ngbuilder`
- checa con `sudo docker ps -a | grep angularWeb`

### Crea la estructura del proyecto
Ingresa dentro del contenedor cuando se este ejecutando
- y ejecuta el comando "ng new projectName" en el contenedor angularWeb
- de esta manera se crea el proyecto y se lo coloca en el directorio raiz asignandole el nombre projectName
```
sudo docker exec -it angularWeb ng new projectName --directory=.
```
*En este paso se crearon los archivos iniciales del proyecto, (un projecto hello wolrd)*

(Si estas en linux) Cambia en dueño de los archivos, por que pertenecen al usuario y al grupo ***root***
```
sudo chown -R $USER:$(id -gn $USER) ./*
sudo chown -R $USER:$(id -gn $USER) ./.[^.]*
```

Elimina el contenedor que no usaremos mas (opcional)
```
sudo docker rm -f angularWeb
```
## Crear un ambiente de desarrollo

- Levanta un contenedor que quede funcionando
- Usa el siguiente archivo Dockerfile 
```
FROM node:lts-alpine
RUN npm install -g @angular/cli
WORKDIR /app
COPY package.json ./
RUN npm install
EXPOSE 4200 49153
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "500"]
```
- y el docker-compose.yml
```
version: '3'
services:
    web:
        build: .
        ports:
            - "4200:4200"
            - "49153:49153"
    volumes:
        - "/app/node_modules"
        - ".:/app"
```
Corriendo el siguiente comando 
```
sudo docker-compose up -d
```
## Crea un back up si piensas que has dedicado mucho tiempo en crear el proyecto "Hello world" o este ambiente

```
CTRL+C CTRL+V
```
## Ahora puedes utilizar comandos del CLI de Angular
**Recordar que web es el nombre del servicio en el archivo docker-compose.yml**
Ejecutar un comando `docker-compose exec web commandToRun`
```
sudo docker-compose exec web ng generate component xyz
```

[ver esto renderizado](https://stackedit.io/app#) 
