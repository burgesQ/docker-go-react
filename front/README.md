# front

A basic react app - generated with `npx create-react-app front --use-npm`.

The only js extra code concerne : 
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
