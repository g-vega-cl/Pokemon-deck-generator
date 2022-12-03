package api

import (
	"database/sql"
	"net/http"
	"pokemon-deck-generator-backend/controllers"

	"github.com/gorilla/mux"
)

type Api struct {
	DB     *sql.DB
	Router *mux.Router
}

func (api *Api) Initialize(dbstring string) {
	var err error
	api.DB, err = sql.Open("mysql", dbstring)
	if err != nil {
		panic(err.Error())
	}
	// defer db.DB.Close()

	api.Router = mux.NewRouter()
}

func (api *Api) GetPosts(w http.ResponseWriter, r *http.Request) {
	controllers.GetPosts(w, r, api.DB)
}
