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

type Response struct {
	Message string `json:"message"`
	Token   string `json:"token,omitempty"`
}

func Login(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	var cred Credentials
	err := json.NewDecoder(r.Body).Decode(&cred)
	if err != nil {
		// Responder con error en formato JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{Message: "Datos inválidos"})
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var user models.User

	query := "SELECT id, email, password, name FROM users WHERE email = ?"
	err = db.QueryRow(query, cred.Email).Scan(&user.ID, &user.Email, &user.PasswordHash, &user.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			// Usuario no encontrado
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(Response{Message: "Usuario no encontrado"})
			w.WriteHeader(http.StatusUnauthorized)
			return
		} else {
			// Error interno en la base de datos
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(Response{Message: "Error interno del servidor"})
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(cred.Password))
	if err != nil {
		// Contraseña incorrecta
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{Message: "Contraseña incorrecta"})
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Generar el token JWT
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
		// Error generando el token
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{Message: "Error interno del servidor"})
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Enviar el token como cookie (opcional)
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

	// Responder con el token en el cuerpo del mensaje
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{
		Message: "Inicio de sesión exitoso",
		Token:   tokenString, // Enviar el token en el cuerpo de la respuesta
	})
}
