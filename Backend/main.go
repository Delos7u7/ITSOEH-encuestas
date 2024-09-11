package main

import (
	"log"
	"myproject/config"
	"myproject/routes"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Credentials")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	db := config.ConnectDB()
	defer db.Close()

	mux := http.NewServeMux()
	routes.SetupRoutes(db, mux)

	handler := enableCors(mux)

	log.Println("Servidor escuchando en el puerto 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))

}
