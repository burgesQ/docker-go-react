NAME		=	go-react

FILE		?= docker-compose.prod.yaml

D_ARGS	?= #--build

all: $(NAME)
$(NAME): run

run:
	docker-compose -f $(FILE) up $(D_ARGS)

run-prod:
	$(MAKE) run -e FILE=docker-compose.prod.yaml
