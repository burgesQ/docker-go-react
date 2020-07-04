NAME		=	go-react

FILE		?= docker-compose.prod.yaml

D_ARGS	?= #--build

NGINX_R = nginx/cert.pem

all: $(NAME)
$(NAME): run

nginx-req: $(NGINX_R)

$(NGINX_R):
	cd nginx;  make cert.pem

run: nginx-req
	docker-compose -f $(FILE) up $(D_ARGS)

run-prod:
	$(MAKE) run -e FILE=docker-compose.prod.yaml
