NAME				= api
SRC					= ./

GIT_COMMIT	:= $(shell git rev-parse --short HEAD 2> /dev/null || echo "dev")
VERSION			?= $(shell git describe --tags --abbrev || echo "dev")

# go compile
GO_CC				= go
F_VERSION		= -ldflags "-X 'main.version=$(VERSION)-$(GIT_COMMIT)'"
LD_FLAGS		=	#
GC_FLAGS		= # -
M_VENDOR		= # -mod=vendor
DEV_ENV			= # CGO_ENABLED=0 GOOS=linux GOARCH=amd64
BUILD				= $(DEV_ENV) $(GO_CC) build     \
									-o $(NAME)  \
									$(F_VERSION)  \
									$(LD_FLAGS) \
									$(M_VENDOR) \
									$(GC_FLAGS)	$(SRC)

RM					= rm -f

# go vendor
VENDOR			= vendor
VENDOR_BALL = $(VENDOR).tgz

# swagger doc file
DOCS				= $(SRC)/docs/swagger.json
DOC_FILE		=	./main.go
SWAGGO			= swaggo-cli

# go lint
LINT				= golangci-lint run

# docker
CONTAINER		= $(NAME)
RELEASE		  ?= dev
D_R_ARG			?=-v `pwd`:/app --net=host

# go lint
LINT				= golangci-lint run

## all: Build the go API
all:		$(NAME)
$(NAME): $(DOCS)
	@echo " - Building $(NAME) ..."
	$(BUILD)
	@echo " - Building $(NAME) : done"

.PHONY: clean
## clean: Clean the go binary
clean:
	@echo " - Cleaning files ..."
	@$(RM) ./$(NAME) ~* *.# *.*.temp $(COVER_FILE)
	@echo " - Cleaning files : done"

.PHONY: re
## re: Clean then build the api
re:			clean all

## doc: Generate the swagger doc
doc:			$(DOCS)
$(DOCS):
	@echo " - Generating swagger doc ..."
	@swag init --parseDependency --generalInfo $(DOC_FILE)
	@echo " - Generating swagger doc : done"

.PHONY:		cdoc
## cdoc: clean the doc files
cdoc:
	@echo " - Removing doc files ..."
	@$(RM) $(DOCS)
	@echo " - Removing doc files : done"

.PHONY:		xdoc
## xdoc: Check the generated swagger file
xdoc: doc
	@echo " -- Checking swagger doc ..."
	@ docker run -it --rm -v `pwd`:/data quay.io/goswagger/swagger validate /data/$(DOCS)
	@echo " -- Checking swagger doc : done"

.PHONY:		rdoc
## rdoc: clean then re-build the docs
rdoc:		cdoc doc

## vendor: Build the vendor
$(VENDOR):
	@echo " - Building $(NAME) vendors ..."
	@ $(GO_CC) mod vendor
	@echo " - Building $(NAME) vendors : done"

## vendor.tgz: Build the vendor tar ball
$(VENDOR_BALL): $(VENDOR)
	@echo " - Building $(NAME) vendors tarball ..."
	@ tar cf $(VENDOR_BALL) $(VENDOR)
	@echo " - Building $(NAME) vendors tarball : done"

.PHONY: unpack
## unpack: Unpack the tarball
unpack:
	@echo " - Unpacking $(NAME) vendors tarball ..."
	@tar xf $(VENDOR_BALL)
	@echo " - Unpacking $(NAME) vendors tarball : done"

.PHONY: vendorized
## vendorized: Build from the vendor deps
vendorized: unpack4
	@echo " - Building $(NAME) from vendor ..."
	@ $(MAKE) re -e LD_FLAGS="-mod=vendor"
	@echo " - Building $(NAME) from vendor : done"

.PHONY: cvendor
## cvendor: Clean the vendorized deps
cvendor:
	@echo " - Removing $(NAME) vendors ..."
	@	$(RM) -r $(VENDOR)
	@echo " - Removing $(NAME) vendors : done"

.PHONY: rvendor
## rvendor: Clean then rebuild the vendor
rvendor: cvendor $(VENDOR)

.PHONY: build
## build: Build a release version of the API
build:
	$(MAKE) clean
	$(MAKE) unpack
# link the library staticly
	$(MAKE) all -e DEV_ENV='CGO_ENABLED=0 GOOS=linux GOARCH=amd64' -e LD_FLAGS='-ldflags "-s -w"'


.PHONY: fclean
## fclean: Force clean
fclean: cvendor cdoc clean

# docker

.PHONY: docker-build
## docker-build: Build a docker image
docker-build: fclean vendor
	@echo "Building the docker image for $(NAME) ..."
	docker build \
		-e VERSION=$(VERSION) \
		-t $(NAME):$(RELEASE) \
		--target $(RELEASE) \
		--rm \
		.

.PHONY: docker-build-prod
## docker-build-prod: Build a production docker image
docker-build-prod:
	$(MAKE) docker-build -e RELEASE=prod



.PHONY: docker-run
## docker-run: Start the docker image
docker-run: docker-rm
	@echo "Running $(NAME):$(RELEASE) in docker container $(CONTAINER) ..."
	@docker run \
		-it \
		--rm \
		--name $(CONTAINER) \
		$(D_R_ARG) \
		$(NAME):$(RELEASE)

.PHONY: docker-run-prod
## docker-run-prod: Run the production docker container
docker-run-prod: docker-build-prod
	$(MAKE) docker-run -e D_R_ARG="-p 4242:4242" -e RELEASE=prod

.PHONY: docker-stop
## docker-stop: Stop the runned docker container
docker-stop:
		@echo "Stopping $(CONTAINER) ..."
		@docker stop $(CONTAINER) ; true

.PHONY: docker-rm
## docker-rm: Remove docker containe
docker-rm: docker-stop
	@echo "Removing $(CONTAINER) ..."
	@docker rm $(CONTAINER) ; true

.PHONY:		tidy
## tidy: Tidy up the deps
tidy: ; @ $(GO_CC) mod tidy

.PHONY:		lint
## lint: run the go linter
lint: ; @cd $(SRC) && $(LINT)

.PHONY:		help
## help: Prints this help message
help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
