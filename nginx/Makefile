NAME		= nginx
RELEASE	?= prod

CERT	= cert.pem
KEY		= key.pem

IMG_NAME	= $(NAME):$(RELEASE)

## all: Build the docker image
all: $(NAME)
$(NAME): docker-build

## gen-certs: Generate the openssl file (cert.pem and key.pem)
gen-certs: $(KEY)
$(CERT): $(KEY)
$(KEY):
	@ openssl req -new -newkey rsa:4096 -sha256 -days 365 -nodes \
	-subj "/C=DE/ST=Berlin/L=Berlin/O=Global Security/OU=IT Department/CN=example.com" \
	-out $(CERT) -keyout $(KEY)

.PHONY:	clean
## clean: Remove the generated certs
clean:
	@ rm -r $(CERT) $(KEY)

.PHONY:	docker-build
## docker-build: Build the release ready docker image
docker-build: $(CERT)
	@docker build --rm --target $(RELEASE) -t $(NAME):$(RELEASE) .

.PHONY:	docker-build-dev
## docker-build-dev: Build the dev docker image
docker-build-dev: $(CERT)
	@ $(MAKE) docker-build -e RELEASE="dev"

.PHONY:		help
## help: Prints this help message
help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
