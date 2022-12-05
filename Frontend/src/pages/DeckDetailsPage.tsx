import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard.tsx";

const fetchFromApi = async (cardId) => {
  const url = `https://api.pokemontcg.io/v2/cards?q=!id:${cardId}`;

  const response = fetch(url)
    .then((x) => x.json())
    .catch((error) => console.log(error));
  return response;
};

const DeckDetailsPage = () => {
  let { id } = useParams();

  const {
    isLoading: isLoadingDeck,
    data: deck,
    isError: isGetDeckError,
  } = useQuery({
    queryKey: [`deck`, id],
    queryFn: () => {
      return axios
        .get(`http://localhost:8000/deck?id=${id}`)
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  const {
    isLoading: isLoadingDeckCards,
    error: isGetDeckCardsError,
    data: deckCards,
  } = useQuery({
    queryKey: [`deckCards`, id],
    queryFn: async () => {
      const cards = {} as any; // TODO // CREATE THE MODEL.
      const fetchedCardIds = [] as string[];
      for (const cardId of deck.Cards) {
        if (fetchedCardIds.includes(cardId)) {
          continue;
        }
        const response = await fetchFromApi(cardId);
        fetchedCardIds.push(response.data[0].id);
        cards[response.data[0].id] = response.data[0];
      }
      return cards;
    },
    enabled: !isLoadingDeck && !isGetDeckError && deck.Cards.length > 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  console.log(
    "isLoadingDeckCards",
    isLoadingDeckCards,
    "deckCards",
    deckCards,
    "isGetDeckCardsError",
    isGetDeckCardsError
  );
  return (
    <Grid container spacing={4} sx={{margin:'10px'}}>
      {deckCards &&
        Object.keys(deckCards).length > 0 &&
        deck.Cards.map((cardId) => {
          return (
            <Grid xs={4} item={true}>
              <PokemonCard pokemonCard={deckCards[cardId]} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default DeckDetailsPage;
