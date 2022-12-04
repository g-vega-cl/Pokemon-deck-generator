package models

type Deck struct {
	Id     string
	Name   string
	Type   string
	Images string
	Cards  []string
}

type DeckList struct {
	DeckId []string
}

type ApiPokemonResponse struct {
	Data []Card
}
type Card struct {
	Id        string
	Name      string
	Images    CardImages // This comes from images.large in the card model in the API
	Supertype string
}

type CardImages struct {
	Large string
}
