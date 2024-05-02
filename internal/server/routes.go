package server

import "net/http"

func (s *server) routes() http.Handler {
	mux := http.NewServeMux()

	return mux
}
