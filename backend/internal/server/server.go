package server

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/SameerJadav/expense-tracker/tree/main/backend/internal/logger"
)

type server struct {
	port int
	db   *sql.DB
}

func NewServer(db *sql.DB) (*http.Server, error) {
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		return nil, err
	}

	s := &server{
		port: port,
		db:   db,
	}

	handler, err := s.routes()
	if err != nil {
		return nil, err
	}

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", s.port),
		Handler:      handler,
		ErrorLog:     logger.Error,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server, err
}
