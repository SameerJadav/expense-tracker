package auth

import (
	"os"

	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
)

func Init() {
	key := os.Getenv("SESSION_KEY")
	maxAge := 86400 * 30
	isProd := false

	store := sessions.NewCookieStore([]byte(key))

	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = isProd

	gothic.Store = store

	githubId := os.Getenv("GITHUB_ID")
	githubSecret := os.Getenv("GITHUB_SECRET")
	githubCallbackURL := "http://localhost:8080/auth/github/callback"
	github := github.New(githubId, githubSecret, githubCallbackURL)

	goth.UseProviders(github)
}
