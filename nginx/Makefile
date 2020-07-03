NAME		= license-nginx
URL			= docker.frafos.net
RELEASE	= dev

IMG_NAME	= $(URL)/$(NAME):$(RELEASE)

all: $(NAME)

$(NAME): docker-build

docker-build:
	docker build --rm -t $(NAME):$(RELEASE) .

docker-tag:
	docker tag $(NAME):$(RELEASE) $(IMG_NAME)

docker-push:
	docker push $(IMG_NAME)

.PHONY: all docker-build docker-tag docker-push clean

IMG_DEV	= $(NAME)-dev
