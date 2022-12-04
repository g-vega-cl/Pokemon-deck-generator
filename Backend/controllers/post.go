package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"pokemon-deck-generator-backend/models"
)

func GetPosts(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	w.Header().Set("Content-Type", "application/json")
	var posts []models.Post
	result, err := db.Query("SELECT id, title from posts")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var post models.Post
		err := result.Scan(&post.ID, &post.Title)
		if err != nil {
			panic(err.Error())
		}
		posts = append(posts, post)
	}
	json.NewEncoder(w).Encode(posts)
}

func CreatePost(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	stmt, err := db.Prepare("INSERT INTO posts(title) VALUES(?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	title := keyVal["title"]
	_, err = stmt.Exec(title)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New post was created")
}
