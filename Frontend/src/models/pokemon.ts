
export interface IDeckCard {
	Id: string;
	Name: string;
	Image: string; // This comes from images.large in the card model in the API
	Type: string;
}

export interface Deck {
	Id:    string;
	Name:  string;
	Type:  string;
	Image: string;
	Cards: IDeckCard[];
}
