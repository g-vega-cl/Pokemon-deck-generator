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
	db.Initialize("root:adminroot@tcp(127.0.0.1:3306)/tutorial")

	db.Router.HandleFunc("/posts", db.GetPosts).Methods("GET")
	http.ListenAndServe(":8000", db.Router)
}
