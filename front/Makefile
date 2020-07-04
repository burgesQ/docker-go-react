NAME			= front

RM				= rm -f

CONTAINER = $(NAME)
RELEASE   ?= dev
D_R_ARG		?=-v node_modules-vol:/app/node_modules -v `pwd`:/app -e CHOKIDAR_USEPOLLING=true --user `id -u`:`id -g`

## all: Build the docker
all:		$(NAME)
$(NAME): docker-build

.PHONY: docker-build
## docker-build: Build the dev docker image
docker-build:
	@echo " -- Building the docker image for $(NAME) ..."
	docker build \
		--target $(RELEASE) \
		-t $(NAME):$(RELEASE) \
		--rm \
		.

.PHONY: docker-run
## docker-run: Start the docker image
docker-run: docker-rm
	@echo " -- Running $(NAME):$(RELEASE) in docker container $(CONTAINER) ... $(D_R_ARG)"
	@docker run \
		--rm \
		-it \
		--name $(CONTAINER) \
		$(D_R_ARG)	\
		$(NAME):$(RELEASE)

.PHONY: docker-stop
## docker-stop: Stop the front docker container
docker-stop:
		@echo " -- Stopping $(CONTAINER) ..."
		@docker stop $(CONTAINER) ; true

.PHONY: docker-rm
## docker-rm: Remove docker containe
docker-rm: docker-stop
	@echo " -- Removing $(CONTAINER) ..."
	@docker rm $(CONTAINER) ; true

.PHONY: docker-build-prod
## docker-build-prod: Build a release docker container
docker-build-prod:
	$(MAKE) docker-build -e RELEASE=prod

.PHONY: docker-run-prod
## docker-run-prod: Run the docker container until the dev step
docker-run-prod:
	$(MAKE) docker-run -e D_R_ARG="-p 3000:3000" -e RELEASE=prod

.PHONY:		help
## help: Prints this help message
help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
