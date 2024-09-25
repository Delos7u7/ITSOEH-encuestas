package middleware

import (
	"encoding/json"
	"myproject/models"
	"net/http"

	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("itsoeh")

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if isAuthenticated(w, r) {
			next(w, r)
		}
	}
}

func isAuthenticated(w http.ResponseWriter, r *http.Request) bool {
	cookie, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			return false
		}
		http.Error(w, "Error interno", http.StatusInternalServerError)
		return false
	}

	tokenStr := cookie.Value
	claims := &models.Claims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	return err == nil && token.Valid
}

func CheckAuth(w http.ResponseWriter, r *http.Request) {
	authenticated := isAuthenticated(w, r)
	json.NewEncoder(w).Encode(map[string]bool{"authenticated": authenticated}) // Corrección aquí
}
