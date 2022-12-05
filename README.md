# Pokemon-deck-generator
We only expect this project to run on your local machine. 
    go to Backend folder and run `go run main.go`
    go to Frontend folder and run `npm start`

For this assessment, we would like you to build a deck generator of pokemon cards. In this assessment, please consider these rules for what a "complete" deck is:
A deck should contain exactly 60 cards
12-16 pokemon of a given type
10 energy cards for that type
The rest of the cards should be random trainer cards where no more than 4 cards of the same kind can be repeated

For the type of pokemon and energy, a list of valid types can be found here. 

*Requirements for the front-end*
* Needs to be completed with ReactJS
* A deck list page with a complete list of all previously generated decks, with links to pages containing deck details, and the ability to filter the deck list by pokemon type
* A deck details page containing a list of all the cards in the deck, with their names, images and other properties
* A form page for generating new decks

*Requirements for the backend*
* We use Rails and Ruby but you can complete this with any backend language you feel like, bonus point if you don’t use Javascript
* Data should be stored in a relational database (either MySQL or Postgres)

The pokemon API to use is this one 
https://docs.pokemontcg.io/

# Considerations
* The decks are generated randomly. Generation parameters will be available in the next release.
* Stage n pokemon need their previous evolutions to be played.
    * A stage 2 pokemon needs the two previous evolutions in the deck.
    * For example, Samurott needs Oshawott and Dewott.
        * For this reason, every time we have a stage n of a pokemon, we will make sure to have their previous evolutions.
* [A good deck has 4 cards of a "Hero Pokemon", which is usually a strong, stage 2 pokemon.](https://www.youtube.com/watch?v=608MuM7VtBA)
* A good deck has energy cards of the type of your pokemon.
    * In the example of Samurott, water energy cards need to be added.
    * In this project, we will add 10.
* Some pokemon have synergy with trainer cards.
    * The generator has no concept of synergy, and trainer cards are chosen randomly.
    * This will be adressed in the next release.

* You can't evolve a pokemon on the turn that you played it, and you can't evolve it more than once per turn.
    * So you need at least 3 turns to fully evolve your pokemon.
        * You can use the "Rare Candy" card to fully evolve your pokemon in a turn.
        * Rare candy is a powerful card, and it's recommended to have 4 of these cards in decks with stage 2 pokemon.
            * With Rare Candy cards, you should be able to have less stage 1 (middle stage) pokemon.

* In deck building, it's recommended to stick with a single pokemon type.
    * It's also good to add another pokemon of basic type to set up attack/defense quickly.

* Recap:
    * We have 16 pokemon cards:
        * We have a hero pokemon with 10-12 cards, x4 basic, x4 or x2 stage 1, x4 stage 2.
        * We have a support basic pokemon, x2 (Snorlax or Random).
        * We have a powerful basic pokemon, x4 (Random)
    * We have 10 energy cards.
    * We have 34 Trainer cards
        * Good practice (x18):
            * Quick Ball x4
            * Great Ball x2
            * Pokemon Communication x2
            * Professors research x4
            * Marine x2 
            * Rare Candy x4
        * Random (x16)


* In the future I want to add css libraries like tailwind to make styling easier and consistent.
# NOTES:
(I could delete this section.)
Add a button that says: "Use rare candy", which reduces the number of stage 1 (middle evolution) pokemon cards to 2 (from 4). And adds 4 rare candy cards. - Next release.

Add a dropdown that allows you to choose the type of pokemon. - This release.

A button to only use the original 151 would be fun. <- For version 1, we will only use the first 151 pokemon. Go Gen 1.

* I have to change the generate GET to POST

* For next release I can add sharing functionality.

* For the next release a state manager will be implemented

* There are components like DeckCard and PokemonCard that are reallty similar. But I will keep them separate because it's easier to extend in the future.

* There are a few interfaced that are missing in typescript. They are tech debt and must be created.

* If the user names it's deck something really long, the cards break. Next release fix.

* At the moment, in the navbar: Deck List and Deck Details are the same page. If you click the deck details tab, you will see an alert.

* Setting up tests is in progress. The code will be tested by next release. This is tech debt.

* A loading page for when a deck is being generated will be added in the next release.

* The data is cached, so you don't need to wait for data to be re-fetched.


# Pokemon rules:

* With the exception of energy, you can only have 4 of the same card in the deck.

* You can only play one supportive card per turn (supportive cards are a type of trainer cards)

* A player can only attach one energy card to one of their pokemon every turn.
    * Because of this, having a single pokemon can hinder performance. 
    * A good deck adds at least another pokemon to the deck.
        * Usually a pokemon with basic stage and/or stage 1 works.


# Design

This generator will follow conventions for a good deck. This means that the deck composition will always be:
    * 16 pokemon cards:
        * We have a hero pokemon with 10 cards, x4 basic, x2 stage 1, x4 stage 2.
        * We have a support basic pokemon, x2 (Snorlax VIV 131).
        * We have powerful basic pokemon, x4 (Random - Of deck type).
    * We have 10 energy cards of the type of our hero pokemon.
    * We have 34 Trainer cards
        * Good practice (x18):
            * Quick Ball SSH 179 x4
            * Great Ball CPA 52 x2
            * Pokemon Communication TEU 152 x2
            * Professor's research SSH 178 x4
            * Marnie SSH 169 x2 
            * Rare Candy SSH 180 x4
        * Random (x16)

A user can choose the pokemon type. (Water, Fire, etc...)

The website has 3 pages:
* /
    * This is the homepage, it has a dropdown to choose the type of the deck, an input for the deck name, and  a button to generate the deck.
    * Once you click the "Generate" button, it will push you to the deck details page and show you the new deck.

* /decks/:Id
    * This page will show you the deck details.
        * It contains a list of all the cards in the deck, with their names, images and other properties.
        * I envision this as showing the cards themselves.

* /decks
    * This page will have the list of decks, I envision this as showing the name of the deck and it's "Hero" card.
    * An space at the top with the name / icons of each energy type, and you click the icon and it filters. (Like the pokemon go wiki ones)


# Models
The models used in this site are:
DeckList {
    DeckId: number[];
}


Card {
    id: string;
    name: string;
    images: string; // This comes from images.large in the card model in the API
    supertype: string;
    type: string;
}

PokemonCard extends Card { // If it's a pokemon card.
    subtypes: string; "stage 1" || "stage 2" ||....
    evolvesFrom?: string;
}


Deck {
    id: number;
    name: string;
    type: string; "Water" || "Fire" || "....
    Cards: string[]; //Ids of cards, and pick everything from API.
    Image: string; // Taken from the hero pokemon.
}

# Deck generation
0. Each card is added to the Card model and pushed to a Deck.

1. Pick the hero pokemon from the API. - What happens if there is no stage 2 pokemon available?? - Pick a default per type.
    * https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Stage 2" types:"Fire"
    * This first pick will be delimited by the first generation pokemon. By stage 2 subtype. By type. The user can only choose type.
    * Add 4 of this cards to the deck.
    * Add the image of this card to the deck "Image" field.
2. Use the "evolvesFrom" field to get the pokemon that evolves to the stage 2 card.
    * https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon subtypes:"Stage 1" evolvesTo:Charizard
    * Add 2x of this cards to the deck.
3. use the "evolvesFrom" field to get the pokemon that evolve to the stage 1 card.
    * https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon subtypes:"Basic" evolvesTo:Charmeleon
    * Add 4x of this cards to the deck.

Note: Each API call returns many cards that match the pattern. From the cards that we fetch, pick one at random with the length of the list.

4. Now we have 10 cards in our deck.

5. Add 2 snorlax VIV 131 to our deck.

6. Add 4 random basic pokemon to our deck. - THAT ARE NOT THE ONE WE ALREADY HAVE - Couldn't find a way to exclude from API itself, so I decided to compare the pokemon name of the random selected card against the basic cards I have already.
    * https://api.pokemontcg.io/v2/cards?q=supertype:Pokemon nationalPokedexNumbers:[1 TO 151] subtypes:"Basic" types:"Fairy"
    * I could run this 4 times and have 4 different basic cards. But for the sake of not overloading the API and performance I'll choose one card four times.

7. Add 10 energy cards to the deck.

8. Now we have 26 cards in our deck. - And the rest are traier cards.

9. Add x18 good practice trainer cards.

10. Now we have 44 cards in our deck.

11. Add x16 random trainer cards.
    * Doing a real random search is difficult because of the size of the data in the API and because of the string ID's
    * To simulate randomness, I will use a random letter of the alphabet and random order (`name` or `-name`) and pick a random card from the first 25 cards.
        * https://api.pokemontcg.io/v2/cards?pageSize=50&q=supertype:Trainer name:w*&orderBy=-name
    * Check if we already have the card by comparing the Id of the card: swsh4-161, Trainer cards don't have the same names and different ID's like some pokemon cards.
    * Add x4 of the card.
    * If there are no valid cards, do the query again.

12. Now we have our 60 cards. SUCCESS!




# Defaults
* NOTE: The Fairy type did not come out until after the first generation. So I will sneakily exclude it.
    * In later releases this is the plan:
    * Fairy: Wigglytuff-GX || Clefable || Alolan Ninetales-GX
        * We will take 4x and 4x of the previous evolution. Then 2x of a random basic fairy. (Check if Mr.Mime is basic.)
            * Mr.Mime is basic, so pick 2x Mr.Mime.
    * Every other type has stage 2 pokemon available.

* The following types were excluded in the frontend: "Fairy", "Dragon", "Metal", "Darkness", "Colorless" because they were either introduced after the first generation of pokemon or there are not enough pokemon available to build viable decks with the types.


# Database structure:
We have a MySQL database called "Pokemon-Smalldoor".
This database contains a table called "Deck" which has the properties: Id: VARCHAR(100), Name: VARCHAR(100) , Type: VARCHAR(100), Image: VARCHAR(100), Cards: json

