package api

import (
	"database/sql"
	"fmt"
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
		fmt.Println()
		panic(err.Error())
	}

	api.Router = mux.NewRouter()
}

func (api *Api) GenerateDeck(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Generating deck...")
	controllers.GenerateDeck(w, r, api.DB)
}

func (api *Api) GetDeck(w http.ResponseWriter, r *http.Request) {
	controllers.GetDeck(w, r, api.DB)
}

func (api *Api) GetDeckList(w http.ResponseWriter, r *http.Request) {
	controllers.GetDeckList(w, r, api.DB)
}
