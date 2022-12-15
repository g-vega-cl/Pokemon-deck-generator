# Pokemon-deck-generator

[Preview video](https://drive.google.com/file/d/1sjrnCzugxzX4aWUXVjxE-_YWe6bChRT2/view?usp=share_link)

We only expect this project to run on your local machine.

You can run the repo using `docker-compose up` in the ./ folder

If you want to run it without docker, follow the next instructions:

1. If you want a local database: set up a MySQL with the following properties:
	* name = Pokemon-Smalldoor
	* username = root
	* Password = adminroot
	* URL:PORT = 127.0.0.1:3306
	* See the Database structure section below for table configuration.
2. go to Backend folder and run `go run main.go`
	* If the server is not listening, try seeing if you have an instance running on port 8000.
3. go to Frontend folder and run `npm start`

Note: To make running this repo easier. A MySQL database was created in the cloud so the user does not have to worry about creating a local database

---

For this assessment, we would like you to build a deck generator of Pokemon cards. In this assessment, please consider these rules for what a "complete" deck is:
* A deck should contain exactly 60 cards.
* 12-16 Pokemon of a given type.
* 10 energy cards for that type.
* The rest of the cards should be random trainer cards where no more than 4 cards of the same kind can be repeated


***Requirements for the front-end***
* Needs to be completed with ReactJS
* A deck list page with a complete list of all previously generated decks, with links to pages containing deck details, and the ability to filter the deck list by Pokemon type
* A deck details page containing a list of all the cards in the deck, with their names, images and other properties
* A form page for generating new decks

***Requirements for the backend***
* Data should be stored in a relational database (either MySQL or Postgres)

The Pokemon API to use is this one: https://docs.Pokemontcg.io/

  

# Pokemon TGC Deck rules.

* Stage N Pokemon need their previous evolutions to be played.
	* That means a stage 2 Pokemon needs the two previous evolutions in the deck.
	* For example, Charizard needs Charmeleon and Charmander.
* You can't evolve a Pokemon on the turn that you played it, and you can't evolve it more than once per turn.
* With the exception of energy, you can only have 4 of the same card in the deck.
* You can only play one supportive card per turn (supportive cards are a type of trainer cards)
* A player can only attach one energy card to one of their Pokemon every turn.

  
# Pokemon TGC Deck Good Practices (meta)
 
 * [A good deck has 4 cards of a "Hero Pokemon", which is usually a strong, stage 2 Pokemon.](https://www.youtube.com/watch?v=608MuM7VtBA)
 * A good deck has energy cards of the type of your Pokemon. And only one type of energy card
	 * If you have a Blastoise, water energy cards need to be added.
* Try to use trainer cards that have synergy with your Pokemon
* It's recommended to stick with a single Pokemon type.
* It's good to have Pokemon of basic type to set up attack and defense quickly.


# Deck Composition using good practices: 
  
* A good deck has 16-20 Pokemon cards:
	* A hero Pokemon with 10-12 cards, x4 basic, x2 stage 1, x4 stage 2.
	* A support basic Pokemon, x2 (Snorlax).
	* We have a powerful basic Pokemon, x4 (Random)
* We have 10 energy cards of the type of our hero Pokemon.
* We have 34 Trainer cards
	* Good practice (x18):
		* Quick Ball - SSH 179 - x4
		* Great Ball - CPA 52 - x2
		* Pokemon Communication - TEU 152 -  x2
		* Professor's research - SSH 178 - x4
		* Marnie - SSH 169 - x2
		* Rare Candy - SSH 180 - x4
	* Random (x16)

# Next release:
## For TGC players:
* Generation parameters will be available in the next release.
	* For example: A button that says: "No rare candy", which increases the number of stage 1 (middle evolution) Pokemon cards to 4 (from 2) and removes the rare candy cards.
* The card generator will have a concept of synergy that chooses trainer cards that synergize with the Pokemon cards.
* A button to choose which generation of Pokemon you want to play with .
* Add a social media "Share Deck" button.
* At the moment in the Navbar: Deck List and Deck Details are the same page. If you click the deck details tab, you will see an alert.
	* A modal will be created to avoid using the alert
* Shorter times to generate decks.


## For developers:
* In the future I want to add css libraries like tailwind to make styling easier and consistent.
* Research if GET or POST is better for the "Generate deck" api route. 
* Use a global state manager like redux or react-context
	* This will make our navigation (Navbar) more consistent.
* There are a few interfaces that are missing in typescript. They are tech debt and must be created.
* Fix bug where if a deck name is really long, the cards showing the deck information break.
* Set up testing.
* Optimize the times to generate decks.
	* This will likely include saving card details in our database and bypassing the Pokemon Api.
* Add docker compose to the whole repo so the backend, frontend and database can be run using `docker-compose up`
# Design
* This generator will follow conventions for a good deck. This means that the deck composition will always follow the good practice structure detailed above.
* This site only uses the first generation of Pokemon to generate a deck.
	* The following types were excluded: "Fairy", "Dragon", "Metal", "Darkness", "Colorless" because they were either introduced after the first generation of Pokemon or there are not enough Pokemon available to build viable decks with the types.
* A user can choose the Pokemon type. (Water, Fire, etc...)
## Frontend.
* The data is cached, so a user does not need to wait for data to be re-fetched.
* There are components like DeckCard and PokemonCard that are really similar. But I decided keep them separate because it's easier to extend in the future.



# Website structure.
* The website has 3 pages:
	* `/`
		* This is the homepage, it has a dropdown to choose the type of the deck, an input for the deck name, and a button to generate the deck.
		* Once you click the "Generate" button, it will push you to the deck details page (`/decks/:id`)and show you the new deck.

	* `/decks/:Id`
		* This page will show the deck details.
		* It contains a list of all the cards in the deck, with their names, images and other properties.

	* `/decks/list`
		* This page has the list of decks.
		* It has a dropdown at the top to filter decks by type.

# Deck generation

0. Adding a card to the deck means pushing it's ID to the "Cards" field in the Deck model.
1. Pick the hero Pokemon type from the API. - There is always at least one stage 2 Pokemon available.
	* https://api.Pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Stage 2" types:"Fire"
	* Pick a random card from the results and  add 4x of this card to the deck.
2. Use the "evolvesFrom" field from the API to get the Pokemon that evolves to the Hero card.
	* https://api.Pokemontcg.io/v2/cards?q=supertype:Pokemon subtypes:"Stage 1" evolvesTo:Charizard
	* Add 2x of this cards to the deck.
3. use the "evolvesFrom" field of the card in the previous step get the Pokemon that evolves to the stage 1 card.
	* https://api.Pokemontcg.io/v2/cards?q=supertype:Pokemon subtypes:"Basic" evolvesTo:Charmeleon
	* Add 4x of this cards to the deck.
4. Now we have 10 cards in our deck.
5. Add 2 snorlax VIV 131 to our deck.
6. Add 4 random basic Pokemon to our deck. We make sure that cards do not repeat with cards we already have
	* Couldn't find a way to exclude cards from API itself, so I decided to compare the Pokemon name of the random selected card against the basic cards I already have.
	* https://api.Pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Basic" types:"Fire"
	* I could run this 4 times and have 4 different basic cards. But for the sake of not overloading the API and performance I'll choose one card four times.
7. Add 10 energy cards of the proper type to the deck.
8. Now we have 26 cards in our deck. - And the rest are traier cards.
9. Add x18 good practice trainer cards.
10. Now we have 44 cards in our deck.
11. Add x16 random trainer cards.
	* Doing a real random search is difficult because of the size of the data in the API and because of the string ID's
	* To simulate randomness, and get as much variety as possible, I will use a random letter of the alphabet, pick a random order (`name` or `-name`) and pick a random card from the first 20 cards.
	* https://api.Pokemontcg.io/v2/cards?pageSize=20&q=supertype:Trainer name:w*&orderBy=-name
	* Check if we already have the card by comparing the Id of the card: swsh4-161, Trainer cards don't have the same names and different ID's like some Pokemon cards.
	* Add x4 of the card.
	* If there are no valid cards, run the query again.
12. Now we have our 60 cards. SUCCESS!


# Database structure:
This database contains a table called "Deck" which has the properties: 
* Id: VARCHAR(100)
* Name: VARCHAR(100) 
* Type: VARCHAR(100)
* Image: VARCHAR(100)
* Cards: json
## Localhost:
We have a MySQL database called "Pokemon-Smalldoor".

# Docker.
You can run the repo with: `docker-compose up`
## Backend
you can run the backend by:
1. Go to /Backend
2. Run `docker-compose up`

## Frontend
You can run the backend by:
1. Go to /Frontend
2. Run `docker-compose up`
