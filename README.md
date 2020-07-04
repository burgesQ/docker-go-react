# README.md

This docker stack allow to expose both an backend API (go in this case) and a 
frontend client (react here) via a single ports. 

The hack reside in the nginx config, which internaly redirect every request to 
the desired service based on the uri (`/api` in this case redirect to the go
backend).

Docker ease the task, by allowing the container to internaly reach eachother on 
the network by their container name (which happen to also be their hostname). 


- `:80` redirect to `:443`
- `/api/v1/doc/index.html` to browse the swagger doc
- `:443` to access the react app (which perfom a request to the API)

## dev

The dev target allow a "hot reload" "on the fly" of both the client and API - 
meaning they'll be auto re-compiled on every edit (use of `modd` for go, 
`CHOKIDAR_USEPOLLING` for react).

## prod

The prod target build "release ready" docker image. 

- `api`: docker scratch image, staticly compiled binary (**TODO: size down binary**)
- `front`: nginx image, serve a builded version of the react app
- `nginx`: **TODO: LE certbot**: same as dev ATM ...

### Makefile

One to rule them all :ring: :eye:

```bash
16:25:51 ❯ make help
Usage: 

  nginx-req   Build the nginx requirements
  run         Run the docker-stack
  run-prod    Run the production docker-stack
  help        Prints this help message
```

## Contributuing

First of all, **thank you** for contributing :hearts:

If you find any typo/misconfiguration/... please send me a PR or open an issue.

Also, while creating your Pull Request on GitHub, please write a description 
which gives the context and/or explains why you are creating it.

