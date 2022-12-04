package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	// "pokemon-deck-generator-backend/models"
)

// Get the deck from the DB
func GetDeck(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	w.Header().Set("Content-Type", "application/json")
	// query := r.URL.Query()
	// deckId := query.Get("id")
	// var posts []models.Post
	// result, err := db.Query("SELECT id, title from posts")
	// if err != nil {
	// 	panic(err.Error())
	// }
	// defer result.Close()
	// for result.Next() {
	// 	var post models.Post
	// 	err := result.Scan(&post.ID, &post.Title)
	// 	if err != nil {
	// 		panic(err.Error())
	// 	}
	// 	posts = append(posts, post)
	// }
	// json.NewEncoder(w).Encode(posts)
	json.NewEncoder(w).Encode("as")
	return
}
