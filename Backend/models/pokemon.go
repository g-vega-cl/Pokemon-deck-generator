package models

type Deck struct {
	Id    string
	Name  string
	Type  string
	Image string
	Cards []string
}

type DeckList struct {
	DeckId []string
}

type ApiPokemonResponse struct {
	Data []Card
}
type Card struct {
	Id          string
	Name        string
	Images      CardImages // This comes from images.large in the card model in the API
	EvolvesFrom string
}

type CardImages struct {
	Large string
}
