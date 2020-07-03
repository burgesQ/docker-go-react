NAME			= front

RM				= rm -f

CONTAINER = front
RELEASE   = dev

## all? Build the docker
all:		$(NAME)
$(NAME): docker\:build

.PHONY: docker\:build
## docker:build? Build the prod ready docker image
docker\:build:
	@echo "Building the docker image for $(NAME) ..."
	docker build \
		-t $(NAME):$(RELEASE) \
		--rm \
		.

.PHONY: docker\:run
## docker:run? Start the previously builded image
docker\:run: docker\:rm
	@echo "Running $(NAME):$(RELEASE) in docker container $(CONTAINER) ..."
	@docker run \
		-p 3000:3000 \
		--rm \
		--name $(CONTAINER) \
		$(NAME):$(RELEASE)

.PHONY: docker\:stop
## docker:stop? Stop the runned docker container
docker\:stop:
		@echo "Stopping $(CONTAINER) ..."
		@docker stop $(CONTAINER) ; true

.PHONY: docker\:rm
## docker:rm? Remove docker containe
docker\:rm: docker\:stop
	@echo "Removing $(CONTAINER) ..."
	@docker rm $(CONTAINER) ; true

.PHONY: docker\:build\:dev
## docker:build:dev? Build a docker container until the dev step
docker\:build\:dev:
	docker build \
		-t front-dev:latest \
		--target dev \
		--rm \
		.

.PHONY: docker\:run\:dev
## docker:run:dev? Run the docker container until the dev step
docker\:run\:dev:
	docker run \
		--name=front-dev\
		--rm \
		-it \
		--network=host \
		-v `pwd`:/app \
		-e CHOKIDAR_USEPOLLING=true \
		front-dev:latest

.PHONY:		help
## help? Prints this help message
help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s '?' |  sed -e 's/^/ /'
