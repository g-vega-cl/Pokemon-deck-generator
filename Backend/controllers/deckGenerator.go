package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"pokemon-deck-generator-backend/models"

	"github.com/google/uuid"
)

func pickHeroCard(deckType string) models.Card {
	requestStrng := `https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Stage 2" types:` + deckType
	response, err := http.Get(requestStrng)

	if err != nil {
		panic(err.Error())
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		panic(err.Error())
	}

	var responseObject models.ApiPokemonResponse
	json.Unmarshal(responseData, &responseObject)
	heroCard := responseObject.Data[rand.Intn(len(responseObject.Data))]
	return heroCard
}

func GenerateDeck(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	fmt.Println("runnng")
	query := r.URL.Query()
	deckType := query.Get("type")
	heroCard := pickHeroCard(deckType)

	deck := models.Deck{
		Id:    uuid.New().String(),
		Name:  query.Get("name"),
		Type:  deckType,
		Cards: []string{},
		Image: heroCard.Images.Large,
	}

	fmt.Println("deck", deck)

}
