package controllers

import (
	"database/sql"
	"encoding/json"
	"myproject/models"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("itsoeh")

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	var cred Credentials
	err := json.NewDecoder(r.Body).Decode(&cred)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	var user models.User

	query := "SELECT id, email, password, name FROM users WHERE email = ?"

	err = db.QueryRow(query, cred.Email).Scan(&user.ID, &user.Email, &user.PasswordHash, &user.Name)
	if err != nil {
		if err != sql.ErrNoRows {
			http.Error(w, "Usuario no encontrado", http.StatusUnauthorized)
			return
		} else {
			http.Error(w, "Error interno", http.StatusInternalServerError)
		}
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(cred.Password))
	if err != nil {
		http.Error(w, "Contraseña Incorrecta", http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &models.Claims{
		Email: user.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		http.Error(w, "Error interno", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  expirationTime,
		Domain:   "localhost",
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
	})
}
