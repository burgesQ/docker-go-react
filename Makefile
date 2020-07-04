NAME		=	go-react

FILE		?= docker-compose.prod.yaml

D_ARGS	?= #--build

NGINX_R = nginx/cert.pem

all: $(NAME)
$(NAME): run

## nginx-req: Build the nginx requirements
nginx-req: $(NGINX_R)
$(NGINX_R):
	@ cd nginx;  make cert.pem

.PHONY: run
## run: Run the docker-stack
run: nginx-req
	docker-compose -f $(FILE) up $(D_ARGS)

.PHONY: run-prod
## run-prod: Run the production docker-stack
run-prod:
	$(MAKE) run -e FILE=docker-compose.prod.yaml

.PHONY:		help
## help: Prints this help message
help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
