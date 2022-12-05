import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard.tsx";
import pikachuWorking from "../images/pikachu-mailman-work.gif";
import pikachuBall from "../images/pikachu-pokeball-loop.gif";

const fetchPokemonCardFromApi = async (cardId) => {
  const url = `https://api.pokemontcg.io/v2/cards?q=!id:${cardId}`;

  const response = fetch(url)
    .then((x) => x.json())
    .catch((error) => console.log(error));
  return response;
};

interface IDeckDetailsPage {
  navbarTabValue: number;
}


const DeckDetailsPage = ({navbarTabValue}: IDeckDetailsPage) => {
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

  if(isGetDeckCardsError) {
    return(
      <div style={{margin:'20px', width:'70vw', height:'500px'}}>
        <Typography gutterBottom variant="body1" component="div">
          There has been an error fetching your data. Please try again later.
        </Typography>
        <img src={pikachuBall} />
      </div>
    )
  }

  return (
    <>
    <Grid container spacing={4} sx={{margin:'10px'}}>
      {deckCards &&
        Object.keys(deckCards).length > 0 &&
        deck.Cards.map((cardId, index) => {
          return (
            <Grid xs={4} item={true} key={`${index}-${cardId}`}>
              <PokemonCard pokemonCard={deckCards[cardId]} />
            </Grid>
          );
        })}
    </Grid>
      {isLoadingDeckCards && (
        <div style={{margin:'20px', width:'70vw', height:'500px'}}>
          <Typography gutterBottom variant="body1" component="div">
            Pikachu is trying his best to fetch your cards. Please wait.
          </Typography>
          <img src={pikachuWorking} />
        </div>
      )}
    </>
  );
};

export default DeckDetailsPage;
