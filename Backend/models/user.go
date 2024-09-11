package models

import (
	"database/sql"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID           int    `json:"id"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	PasswordHash string `json:"-"`
	Name         string `json:"name"`
}

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

func (u *User) CreateUser(db *sql.DB) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	query := `INSERT INTO users (email, password, role, name) VALUES (?,?,'user',?)`
	_, err = db.Exec(query, u.Email, string(hashedPassword), u.Name)
	return err
}

func UserExist(db *sql.DB, email string) bool {
	var exist bool

	query := `SELECT EXISTS (SELECT 1 FROM users WHERE email = ?)`
	err := db.QueryRow(query, email).Scan(&exist)
	if err != nil {
		return false
	}
	return exist
}
