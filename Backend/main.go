package main

import (
	"fmt"
	"net/http"
	"pokemon-deck-generator-backend/api"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	api := api.Api{}
	// api.Initialize("root:adminroot@tcp(127.0.0.1:3306)/Pokemon-Smalldoor") // <- Local DB
	api.Initialize("sql9583215:UYxXbd1FBI@tcp(sql9.freesqldatabase.com:3306)/sql9583215") // <- Cloud DB - Please don't abuse.

	api.Router.HandleFunc("/generate", api.GenerateDeck).Methods("GET") // TODO // Check the best method for this
	api.Router.HandleFunc("/deck", api.GetDeck).Methods("GET")
	api.Router.HandleFunc("/decklist", api.GetDeckList).Methods("GET")
	fmt.Println("Listening in port 8000")
	http.ListenAndServe(":8000", api.Router)
}
