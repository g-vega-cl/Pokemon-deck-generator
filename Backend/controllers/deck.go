package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"pokemon-deck-generator-backend/models"
)

// Get the deck from the DB
func GetDeck(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	w.Header().Set("Content-Type", "application/json")
	var deck models.Deck
	var cardsBytes []uint8
	query := r.URL.Query()
	deckId := query.Get("id")
	dbQuery := fmt.Sprintf("SELECT * from Deck WHERE id = '%s'", deckId)
	// I think there could be a way to unmarshall card bytes directly here. But It's fine for now.
	err := db.QueryRow(dbQuery).Scan(&deck.Id, &deck.Name, &deck.Type, &deck.Image, &cardsBytes)
	if err != nil {
		panic(err.Error())
	}
	json.Unmarshal(cardsBytes, &deck.Cards)
	json.NewEncoder(w).Encode(deck)
}

func GetDeckList(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	w.Header().Set("Content-Type", "application/json")
	var decks []models.Deck
	result, err := db.Query("SELECT Id, Name, Type, Image from Deck")
	if err != nil {
		panic(err.Error())
	}
	for result.Next() {
		var deck models.Deck
		err := result.Scan(&deck.Id, &deck.Name, &deck.Type, &deck.Image)
		if err != nil {
			panic(err.Error())
		}
		decks = append(decks, deck)
	}
	json.NewEncoder(w).Encode(decks)
}
