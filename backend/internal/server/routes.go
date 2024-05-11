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

	mux.HandleFunc("GET /api/auth/{provider}", s.handleAuth)
	mux.HandleFunc("GET /api/auth/{provider}/callback", s.handleAuthCallback)
	mux.HandleFunc("GET /api/logout/{provider}", s.handleLogout)

	mux.HandleFunc("GET /api/user", s.getUser)

	mux.HandleFunc("POST /api/expenses/create", s.createExpense)

	return mux
}

type user struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	UserID    string `json:"userID"`
	AvatarURL string `json:"avatarURL"`
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

	http.Redirect(w, r, "http://localhost:3000", http.StatusTemporaryRedirect)
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

	http.Redirect(w, r, "http://localhost:3000", http.StatusTemporaryRedirect)
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
		Name:      gothUser.Name,
		Email:     gothUser.Email,
		UserID:    gothUser.UserID,
		AvatarURL: gothUser.AvatarURL,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		logger.Error.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}

type expense struct {
	UserID string  `json:"userId"`
	Title  string  `json:"title"`
	Amount float64 `json:"amount"`
	Date   string  `json:"date"`
}

func (s *server) createExpense(w http.ResponseWriter, r *http.Request) {
	if !validateContentType(w, r) {
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, 1048576)
	defer r.Body.Close()

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	expense := &expense{}

	if err := dec.Decode(expense); err != nil {
		handleJSONDecodeErrors(w, err)
		return
	}

	if !validateSignleJSONObject(w, r) {
		return
	}

	stmt := "INSERT INTO expenses (user_id, title, amount, date) VALUES ($1, $2, $3, $4)"

	_, err := s.db.Exec(stmt, expense.UserID, expense.Title, expense.Amount, expense.Date)
	if err != nil {
		logger.Error.Fatalln(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
