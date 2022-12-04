package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"pokemon-deck-generator-backend/models"
)

func GenerateDeck(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	fmt.Println("runnng")
	query := r.URL.Query()

	deckType := query.Get("type")
	requestStrng := `https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Stage 2" types:` + deckType
	response, err := http.Get(requestStrng)

	if err != nil {
		panic(err.Error())
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		panic(err.Error())
	}
	// fmt.Println(string(responseData))

	var responseObject models.ApiPokemonResponse
	json.Unmarshal(responseData, &responseObject)
	fmt.Println("responseObject.Data", responseObject.Data)
}
