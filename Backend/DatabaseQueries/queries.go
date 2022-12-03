package queries

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
	ID    int
	Title string
}

func Queries() {

	fmt.Println("Running queries")
	db, err := sql.Open("mysql", "root:adminroot@tcp(127.0.0.1:3306)/tutorial")

	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO posts(id,title) VALUES('2','My post')")
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()

	posts, err := db.Query("SELECT title FROM posts")
	if err != nil {
		panic(err.Error())
	}
	for posts.Next() {
		var post Post
		err := posts.Scan(&post.Title)
		if err != nil {
			panic(err.Error())
		}
		fmt.Println(post)
	}

	fmt.Println("end")
}

// func getPost(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	for _, item := range posts {
// 		if item.ID == params["id"] {
// 			json.NewEncoder(w).Encode(item)
// 			break
// 		}
// 		return
// 	}
// 	json.NewEncoder(w).Encode(&Post{})
// }

// func getPosts(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(posts)
// }
