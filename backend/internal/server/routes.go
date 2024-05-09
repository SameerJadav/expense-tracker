package server

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/SameerJadav/expense-tracker/tree/main/backend/internal/logger"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
)

func (s *server) routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /auth/{provider}", s.handleAuth)
	mux.HandleFunc("GET /auth/{provider}/callback", s.handleAuthCallback)
	mux.HandleFunc("GET /logout/{provider}", s.handleLogout)
	mux.HandleFunc("GET /user", s.getUser)

	return mux
}

type user struct {
	AvatarURL string `json:"avatarURL"`
	Name      string `json:"name"`
	Email     string `json:"email"`
}

func (s *server) handleAuth(w http.ResponseWriter, r *http.Request) {
	provider := r.PathValue("provider")
	if provider == "" {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	gothic.BeginAuthHandler(w, r)
}

func (s *server) handleAuthCallback(w http.ResponseWriter, r *http.Request) {
	provider := r.PathValue("provider")
	if provider == "" {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		logger.Error.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	store, _ := gothic.Store.Get(r, "user_session")

	store.Values["user"] = user

	if err = store.Save(r, w); err != nil {
		logger.Error.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// TODO: change redirect url
	http.Redirect(w, r, "http://localhost:8080", http.StatusTemporaryRedirect)
}

func (s *server) handleLogout(w http.ResponseWriter, r *http.Request) {
	gothic.Logout(w, r)

	store, _ := gothic.Store.Get(r, "user_session")

	delete(store.Values, "user")

	if err := store.Save(r, w); err != nil {
		logger.Error.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// TODO: change redirect url
	http.Redirect(w, r, "http://localhost:8080", http.StatusTemporaryRedirect)
}

func (s *server) getUser(w http.ResponseWriter, r *http.Request) {
	store, _ := gothic.Store.Get(r, "user_session")

	val, ok := store.Values["user"]
	if !ok || val == nil {
		http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		return
	}

	gothUser, ok := val.(goth.User)
	if !ok {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	user := &user{
		AvatarURL: gothUser.AvatarURL,
		Name:      gothUser.Name,
		Email:     gothUser.Email,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		logger.Error.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
