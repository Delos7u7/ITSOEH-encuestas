package routes

import (
	"database/sql"
	"net/http"
)

func SetupRoutes(db *sql.DB, mux *http.ServeMux) {
	mux.HandleFunc("/crear-usuario", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {

		}
	})
}
