package models

import (
	"database/sql"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID           int    `json:"id"`
	Matricula    string `json:"matricula"`
	Password     string `json:"password"`
	PasswordHash string `json:"-"`
}

type Claims struct {
	Matricula string `json:"matricula"`
	jwt.StandardClaims
}

func (u *User) CreateUser(db *sql.DB) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	query := `INSERT INTO users (email, password, role) VALUES (?,?,'user')`
	_, err = db.Exec(query, u.Matricula, string(hashedPassword))
	return err
}

func UserExist(db *sql.DB, matricula string) bool {
	var exist bool

	query := `SELECT EXISTS (SELECT 1 FROM users WHERE matricula = ?)`
	err := db.QueryRow(query, matricula).Scan(&exist)
	if err != nil {
		return false
	}
	return exist
}
