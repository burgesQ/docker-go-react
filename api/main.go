package main

import (
	"net/http"

	"github.com/burgesQ/gommon/log"
	"github.com/burgesQ/webfmwk/v4"
	"github.com/burgesQ/webfmwk/v4/handler"
)

var (
	version = "undef"
)

func main() {
	log.SetLogLevel(log.LogDEBUG)

	s := webfmwk.InitServer(
		webfmwk.WithLogger(log.GetLogger()),
		webfmwk.SetPrefix("/api/v1"),
		webfmwk.CheckIsUp(),
		webfmwk.WithHandlers(handler.Logging))

	// expose /hello
	s.GET("/hello", func(c webfmwk.Context) error {
		return c.JSONBlob(http.StatusOK, []byte(`{ "message": "hello world" }`))
	})

	s.DumpRoutes()

	log.Infof("starting on :4242 (version %q)", version)

	// start asynchronously on :4242
	s.Start(":4242")

	// ctrl+c is handled internaly
	defer s.WaitAndStop()
}
