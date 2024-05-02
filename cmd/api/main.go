package main

import (
	"github.com/SameerJadav/fuzi/internal/logger"
	"github.com/SameerJadav/fuzi/internal/server"
)

func main() {
	server, err := server.NewServer()
	if err != nil {
		logger.Error.Fatalln(err)
	}

	logger.Info.Printf("starting server on http://localhost%s", server.Addr)
	if err = server.ListenAndServe(); err != nil {
		logger.Error.Fatalln(err)
	}
}
