# front

A basic react app, generated with `npx create-react-app front --use-npm`.

The only code addons are : 
 - a request to the go backend API (use of `axios` package)
 - a notification in case of request failure (use of `react-toastify` package)
 
 The docker image have 3 stage :
 - dev   : node_modules is saved into the docker image, app live in the /app directory
 - build : build the react app 
 - prod  : serve via nginx the previously builded static app
 
## stuffs
 
### dockerignore

Add file and directory to the dickerignore file so they're not 
copyed into the docker image (Build & Run time).

### node_modules

The node_modules is saved into the docker container. To avoid conflict while 
mounting a shared volumes, the node_modules is saved in a separate docker volumes.
- cli usage : `docker run node_modules-vol:/app/node_modules ...`
- docker-compose usage : see `../docker-compose.yaml`, declaration of the docker volume + link via volume cmd

### CHOKIDAR_USEPOLLING

Allow hot reload in dev mode for dockerized react app ([help me](https://stackoverflow.com/questions/22111060/what-is-the-difference-between-expose-and-publish-in-docker))
