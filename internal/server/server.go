package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/SameerJadav/expense-tracker/internal/logger"
)

type server struct {
	port int
}

func NewServer() (*http.Server, error) {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		return nil, err
	}

	s := &server{
		port: port,
	}

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", s.port),
		Handler:      s.routes(),
		ErrorLog:     logger.Error,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server, err
}
