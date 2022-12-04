package main

import (
	"net/http"
	"pokemon-deck-generator-backend/api"

	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
	ID    int
	Title string
}

var err error

func main() {
	db := api.Api{}
	db.Initialize("root:adminroot@tcp(127.0.0.1:3306)/Pokemon-Smalldoor")

	db.Router.HandleFunc("/posts", db.GetPosts).Methods("GET")
	db.Router.HandleFunc("/generate", db.GenerateDeck).Methods("GET")
	http.ListenAndServe(":8000", db.Router)
}
