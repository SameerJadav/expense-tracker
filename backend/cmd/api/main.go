package main

import (
	"github.com/SameerJadav/expense-tracker/tree/main/backend/internal/logger"
	"github.com/SameerJadav/expense-tracker/tree/main/backend/internal/server"
	_ "github.com/joho/godotenv/autoload"
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
