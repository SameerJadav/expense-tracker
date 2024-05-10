package database

import (
	"database/sql"
	"errors"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var dbInstance *sql.DB

func New() (*sql.DB, error) {
	if dbInstance != nil {
		return dbInstance, nil
	}

	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		return nil, errors.New("database URL not found")
	}

	db, err := sql.Open("pgx", connStr)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	dbInstance = db

	return dbInstance, nil
}
