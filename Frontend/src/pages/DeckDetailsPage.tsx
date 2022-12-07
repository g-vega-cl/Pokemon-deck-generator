import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../components/ErrorPage.tsx";
import LoadingPage from "../components/LoadingPage.tsx";
import PokemonCard from "../components/PokemonCard.tsx";

const fetchPokemonCardFromApi = async (cardId) => {
  const url = `https://api.pokemontcg.io/v2/cards?q=!id:${cardId}`;

  const response = fetch(url)
    .then((x) => x.json())
    .catch((error) => console.log(error));
  return response;
};

interface IDeckDetailsPage {
  setNavbarTabValue: React.Dispatch<number>;
  navbarTabValue: number;
}


const DeckDetailsPage = ({navbarTabValue, setNavbarTabValue}:IDeckDetailsPage) => {
  let { id } = useParams();

  useEffect(() => {
    if(navbarTabValue === 0 || navbarTabValue === 1){ // TODO // This should be managed with global state. Next release
        setNavbarTabValue(2);
    }
},[navbarTabValue])

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
    isLoading: isLoadingPokemonCards,
    error: isGetPokemonCardsError,
    data: pokemonCards,
  } = useQuery({
    queryKey: [`pokemonCards`, id],
    queryFn: async () => {
      const cards = {} as any; // TODO // CREATE THE CARDS MODEL. It is the one from the pokemon API.
      const fetchedCardIds = [] as string[];
      for (const cardId of deck.Cards) { // We don't use Promise.all because the pokemon api thorttles us.
        if (fetchedCardIds.includes(cardId)) {
          continue;
        }
        const response = await fetchPokemonCardFromApi(cardId);
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

  if(isGetPokemonCardsError) {
    return(
      <ErrorPage />
    )
  }

  return (
    <>
    <Grid container spacing={4} sx={{margin:'10px'}}>
      {pokemonCards &&
        Object.keys(pokemonCards).length > 0 &&
        deck.Cards.map((cardId, index) => {
          return (
            <Grid xs={4} item={true} key={`${index}-${cardId}`}>
              <PokemonCard pokemonCard={pokemonCards[cardId]} />
            </Grid>
          );
        })}
    </Grid>
      {isLoadingPokemonCards && (
        <LoadingPage />
      )}
    </>
  );
};

export default DeckDetailsPage;
