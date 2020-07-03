FROM golang:1.13 as dev

# install extra packages
RUN GO111MODULE=on go get github.com/cortesi/modd/cmd/modd

WORKDIR /app

COPY . .

CMD modd

FROM golang:1.13 as build

# Install tools required for project
COPY --from=dev $GOPATH $GOPATH
COPY --from=dev /app /app

# define work directory
WORKDIR /app

ARG MAKE_CMD='build'
ARG MAKE_ENV='-e M_VENDOR=-mod=vendor'

# build it
RUN ls ;  make $MAKE_CMD $MAKE_ENV

FROM scratch as prod

ARG API_PORT=4242

COPY --from=build /app/api /api
COPY --from=build /app/config /config/

EXPOSE $API_PORT

ENTRYPOINT [ "/api", "-dev" ]
