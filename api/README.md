# api's README

## What

A go API exposing a single endpoint (`/api/v1/version`) and a swagger doc (`/api/doc/index.html`).

`modd` is used to "hot-reload" the server on the fly (recompile the server on modification).

## Build

### requirements

`go 1.13` and `make`

Run `make docker-build`

## Run

Run `make docker-run-dev`

## Makefile targets

```bash
13:41:09 ❯ make help
Usage: 

  all                Build the go API
  clean              Clean the go binary
  re                 Clean then build the api
  doc                Generate the swagger doc
  cdoc               clean the doc files
  xdoc               Check the generated swagger file
  rdoc               clean then re-build the docs
  vendor             Build the vendor
  vendor.tgz         Build the vendor tar ball
  unpack             Unpack the tarball
  vendorized         Build from the vendor deps
  cvendor            Clean the vendorized deps
  rvendor            Clean then rebuild the vendor
  build              Build a release version of the API
  fclean             Force clean
  docker-build       Build the prod ready docker image
  docker-run         Start the previously builded image
  docker-stop        Stop the runned docker container
  docker-rm          Remove docker containe
  docker-build-dev   Build a docker container until the dev step
  docker-run-dev     Run the docker container until the dev step
  tidy               Tidy up the deps
  lint               run the go linter
  help               Prints this help message
```
