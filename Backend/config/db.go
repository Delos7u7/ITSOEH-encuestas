package config

import (
	"database/sql"
	"fmt"
	"log"
)

func ConnectDB() *sql.DB {
	dsn := "root:123456@tcp(127.0.0.1:3306)/itsaeh_encuestas"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Conectado a la bse de datos MySQL con éxito")
	return db
}
