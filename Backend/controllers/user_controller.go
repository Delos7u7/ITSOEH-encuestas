package controllers

import (
	"database/sql"
	"encoding/json"
	"myproject/models"
	"net/http"
)

func CreateUser(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	if models.UserExist(db, user.Matricula) {
		http.Error(w, "Usuario ya existe", http.StatusConflict)
		return
	}

	err = user.CreateUser(db)

	if err != nil {
		http.Error(w, "Error al crear al usuario", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Usuario Creado con éxito")
}
