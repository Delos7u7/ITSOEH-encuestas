package routes

import (
	"database/sql"
	"myproject/controllers"
	"myproject/middleware"
	"net/http"
)

func SetupRoutes(db *sql.DB, mux *http.ServeMux) {
	mux.HandleFunc("/crear-usuario", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			controllers.CreateUser(db, w, r)
		} else {
			http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			controllers.Login(db, w, r)
		} else {
			http.Error(w, "Metodo no permitido", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/check-auth", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
			return
		}
		middleware.CheckAuth(w, r)
	})

}
