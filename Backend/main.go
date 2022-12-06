package main

import (
	"net/http"
	"pokemon-deck-generator-backend/api"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db := api.Api{}
	db.Initialize("root:adminroot@tcp(127.0.0.1:3306)/Pokemon-Smalldoor")

	db.Router.HandleFunc("/generate", db.GenerateDeck).Methods("GET") // TODO // Check the best method for this
	db.Router.HandleFunc("/deck", db.GetDeck).Methods("GET")
	db.Router.HandleFunc("/decklist", db.GetDeckList).Methods("GET")
	http.ListenAndServe(":8000", db.Router)
}
