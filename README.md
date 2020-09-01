## Crear un proyecto desde cero
### Creat un contenedor con  el CLI de Angular
Usando el dockerfile que esta dentro de la carpeta builder
```
FROM node:lts-alpine
RUN npm install -g @angular/cli
WORKDIR /app
```
Ejecuta el siguiente comando

```
sudo docker build -t ngbuilder ./builder
```
Crea contenedor con la imagen creada
```
sudo docker run -itd -v ${PWD}:/app --name angularWeb ngbuilder
```

- checa con `sudo docker images | grep ngbuilder`
- checa con `sudo docker ps -a | grep angularWeb`

### Crea la estructura del proyecto
Ingresa dentro del contenedor cuando esta corriendo
- y ejecuta el comando "ng new projectName" en el contenedor angularWeb
- creando el proyecto y colocandolo en el directorio raiz
```
sudo docker exec -it angularWeb ng new projectName --directory=.
```
*En este paso se crearon los archivos iniciales del proyecto*

Cambia en dueño de los archivos, por que pertenecen al usuario y al grupo ***root***
```
sudo chown -R $USER:$(id -gn $USER) ./*
sudo chown -R $USER:$(id -gn $USER) ./.[^.]*
```

Elimina el contenedor que no usaremos mas (opcional)
```
sudo docker rm -f angularWeb
```
## Crear un ambiente de desarrollo

- Levanta un contenedor y queda funcionando
- Usando el Dockerfile 
```
FROM node:lts-alpine
RUN npm install -g @angular/cli
WORKDIR /app
COPY package.json  ./
RUN npm install
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
```
- y el docker-compose.yml
```
version: '3'
services:
    web:
        build: .
        ports:
            - "4200:4200"
    volumes:
        - "/app/node_modules"
        - ".:/app"
```
Corriendo el siguiente comando 
```
sudo docker-compose up -d
```
## Crear un back up si has notado  que tardaste mucho tiempo en crear este ambiente

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
