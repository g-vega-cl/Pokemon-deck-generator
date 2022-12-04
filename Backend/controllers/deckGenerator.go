package controllers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"pokemon-deck-generator-backend/models"
	"regexp"
	"strings"

	"github.com/google/uuid"
)

func checkWhitespace(s string) bool {
	whitespace := regexp.MustCompile(`\s`).MatchString(s)
	return whitespace
}

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func returnServerError(w http.ResponseWriter, err error) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(500)
	json.NewEncoder(w).Encode(err)
}

// All my functions with "Pick" at the beginning (I think it's an anti-pattern). These functions should be merged into a single one.
// This is tech debt and will be adressed if I have time.

func pickHeroCard(deckType string) models.Card {
	requestString := `https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Stage 2" types:` + deckType
	response, err := http.Get(requestString)

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

func pickPreviousEvolutionCard(evolvesFrom string) (models.Card, error) {
	var requestString string
	if checkWhitespace(evolvesFrom) {
		requestString = `https://api.pokemontcg.io/v2/cards?q=!name:` + `"` + evolvesFrom + `"`
	} else {
		requestString = `https://api.pokemontcg.io/v2/cards?q=!name:` + evolvesFrom
	}

	response, err := http.Get(requestString)

	if err != nil {
		return models.Card{}, err
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return models.Card{}, err
	}

	var responseObject models.ApiPokemonResponse
	json.Unmarshal(responseData, &responseObject)
	dataLength := len(responseObject.Data)
	if dataLength == 0 {
		noCardError := errors.New("no card found")
		return models.Card{}, noCardError
	}
	stageOneCard := responseObject.Data[rand.Intn(dataLength)]
	return stageOneCard, nil
}

func pickRandomBasicPokemon(deckType string) (models.Card, error) {
	requestString := `https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Basic" types:` + deckType
	response, err := http.Get(requestString)

	if err != nil {
		return models.Card{}, err
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return models.Card{}, err
	}

	var responseObject models.ApiPokemonResponse
	json.Unmarshal(responseData, &responseObject)
	dataLength := len(responseObject.Data)
	if dataLength == 0 {
		noCardError := errors.New("no card found")
		return models.Card{}, noCardError
	}
	basicCard := responseObject.Data[rand.Intn(dataLength)]
	return basicCard, nil
}

func pickEnergyCard(deckType string) (string, error) {
	energyNameString := deckType + " Energy"
	requestString := `https://api.pokemontcg.io/v2/cards?q=supertype:Energy name:` + `"` + energyNameString + `"`

	response, err := http.Get(requestString)

	if err != nil {
		return "", err
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}

	var responseObject models.ApiPokemonResponse
	json.Unmarshal(responseData, &responseObject)
	dataLength := len(responseObject.Data)
	if dataLength == 0 {
		noCardError := errors.New("no card found")
		return "", noCardError
	}
	energyCard := responseObject.Data[rand.Intn(dataLength)]
	return energyCard.Id, nil
}

func pickRandomTrainerCard() (models.Card, error) {
	charset := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	randomLetter := string(charset[rand.Intn(len(charset))])
	requestString := "https://api.pokemontcg.io/v2/cards?q=supertype:Trainer name:" + randomLetter + "*&orderBy=-name"
	response, err := http.Get(requestString)

	if err != nil {
		return models.Card{}, err
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return models.Card{}, err
	}

	var responseObject models.ApiPokemonResponse
	json.Unmarshal(responseData, &responseObject)
	dataLength := len(responseObject.Data)
	if dataLength == 0 {
		noCardError := errors.New("no card found")
		return models.Card{}, noCardError
	}
	basicCard := responseObject.Data[rand.Intn(dataLength)]
	return basicCard, nil
}

func pickSixteenTrainerCards(deck *models.Deck, w http.ResponseWriter) { //Make sure you are appending to deck
	for i := 0; i < 4; i++ {
		ok := true
		var trainerCard models.Card
		for ok {
			fmt.Println("Loop 2 ok")
			var err error
			trainerCard, err = pickRandomTrainerCard()

			if err != nil {
				returnServerError(w, err)
				return
			}

			if !contains(deck.Cards, trainerCard.Id) {
				// Append if the names are different.
				ok = false
				//Add 4 trainer cards
				for i := 0; i < 4; i++ {
					deck.Cards = append(deck.Cards, trainerCard.Id)
				}
			}
		}

	}
}

func GenerateDeck(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	fmt.Println("runnng")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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

	// Append 4 hero cards to the deck.
	for i := 0; i < 4; i++ {
		deck.Cards = append(deck.Cards, heroCard.Id)
	}

	// stageOneHeroCard, err := pickPreviousEvolutionCard(`"` + heroCard.EvolvesFrom + `"`)
	stageOneHeroCard, err := pickPreviousEvolutionCard(heroCard.EvolvesFrom)

	if err != nil {
		returnServerError(w, err)
		return
	}

	// Append 2 stage one hero cards to the deck.
	for i := 0; i < 2; i++ {
		deck.Cards = append(deck.Cards, stageOneHeroCard.Id)
	}

	basicHeroCard, err := pickPreviousEvolutionCard(stageOneHeroCard.EvolvesFrom)

	if err != nil {
		returnServerError(w, err)
		return
	}

	// Append 4 basic hero cards to the deck.
	for i := 0; i < 4; i++ {
		deck.Cards = append(deck.Cards, basicHeroCard.Id)
	}

	// Append 2 snorlax cards to the deck.
	for i := 0; i < 2; i++ {
		deck.Cards = append(deck.Cards, "swsh4-131")
	}

	//Append 4 cards of a random basic pokemon.
	ok := true
	var basicCard models.Card
	for ok {
		fmt.Println("Loop ok")
		var err error
		basicCard, err = pickRandomBasicPokemon(deckType)

		if err != nil {
			returnServerError(w, err)
			return
		}

		//There is a chance that we get "Squirtle" and "Dark Squirtle", or "Dark Squirtle" and "Squirtle".
		if !(strings.Contains(basicCard.Name, basicHeroCard.Name) || strings.Contains(basicHeroCard.Name, basicCard.Name)) {
			// Exit if the names are different.
			ok = false
		}
	}

	//Append 4 basic cards.
	for i := 0; i < 4; i++ {
		deck.Cards = append(deck.Cards, basicCard.Id)
	}

	// YAY, We have all our pokemon cards!!

	// Now let's add 10 energy cards

	energyCardId, err := pickEnergyCard(deckType)
	if err != nil {
		returnServerError(w, err)
		return
	}

	for i := 0; i < 10; i++ {
		deck.Cards = append(deck.Cards, energyCardId)
	}

	// Now we add 18 good practice trainer cards.
	// * Quick Ball SSH 179 x4
	// * Great Ball CPA 52 x2
	// * Pokemon Communication TEU 152 x2
	// * Professor's research SSH 178 x4
	// * Marnie SSH 169 x2
	// * Rare Candy SSH 180 x4

	deck.Cards = append(deck.Cards, "swsh1-179", "swsh1-179", "swsh1-179", "swsh1-179", "swsh35-52", "swsh35-52", "hgss1-98", "hgss1-98", "swsh45-60", "swsh45-60", "swsh45-60", "swsh45-60", "swsh35-56", "swsh35-56", "pop5-7", "pop5-7", "pop5-7", "pop5-7")

	//Now we have 44 cards in our deck.
	// We need 16x random trainer cards.
	pickSixteenTrainerCards(&deck, w)

	// NOW WE SHOULD HAVE OUR DECK!!!

	fmt.Println("Deck integrity", checkDeckIntegrity(deck.Cards))
	// fmt.Println("deck final", deck)

	// RETURN DECK
	addDeckToDatabase(deck, db)
	json.NewEncoder(w).Encode(deck)
}

func moreThan4OfACard(cardsIds []string) bool {
	freq := make(map[string]int)
	for _, num := range cardsIds {
		freq[num] = freq[num] + 1
	}
	for key, _ := range freq {
		if freq[key] > 4 && freq[key] != 10 {
			return true
		}
	}
	return false
}
func checkDeckIntegrity(deckCards []string) bool {
	if len(deckCards) != 60 {
		return false
	}

	if moreThan4OfACard(deckCards) {
		return false
	}

	return true
}

func addDeckToDatabase(deck models.Deck, db *sql.DB) {
	cardsJson, err := json.Marshal(deck.Cards)
	if err != nil {
		fmt.Println("Error in marshalling deck")
		panic(err.Error())
	}

	dbQuery := fmt.Sprintf("INSERT INTO Deck(Id,Name,Type,Image,Cards) VALUES('%s','%s','%s','%s','%s')", deck.Id, deck.Name, deck.Type, deck.Image, cardsJson)
	stmt, err := db.Prepare(dbQuery)

	// INSERT INTO posts(id,title) VALUES('2','My post')
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec()
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Added deck to database")
}
