import React, { useState, useEffect, useMemo } from "react";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingPage from "./components/LoadingPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
import pikachuYellow from './images/pikachu-yellow-wallpaper.png';
import DeckTypeSelect from "./components/DeckTypeSelect.tsx";
import TextField from '@mui/material/TextField';

const GeneratorPage = () => {
  const [deckName, setDeckName] = useState("");
  const [queryUsername, setQueryUsername] = useState("Test-user"); // This is not good, but time.
  const [enableGenerateDeckQuery, setEnableGenerateDeckQuery] = useState("Test-user"); // This is not good, but time.

  // If this is loading, then get to another site, once it's done, run another function that sends us to the deck seeing page
  const {
    isLoading: isLoadingPokemon,
    data: pokemon,
    isError: pokemonError,
    refetch: refetchPokemin,
  } = useQuery({
    queryKey: ["poketypes"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:8000/decklist`)
        .then((res) => res.data)
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // if (isLoadingAllBooks || isLoadingUserBooks) return <LoadingPage />;

  // if (allBooksFetchingError || userBooksFetchingError) return <ErrorPage errorMessage = {allBooksFetchingError}/>

  console.log("pokemon", pokemon, " pokemonError", pokemonError);

  return (
    <div style={{ margin: "auto", overflowX:"hidden", height:"100vh", backgroundImage:`url(${pikachuYellow})`, backgroundSize:'cover'}}>
      <Navbar />
      <Grid container spacing={2} style={{backgroundColor:"#efd64b", margin:'auto', width:'50%'}}>
        <Grid xs={24} item={true}>
          <TextField id="deck-name-outlined-basic" label="Type the name of your deck" variant="outlined" value={deckName} onChange={(e) => setDeckName(e.target.value)} style={{marginBottom:'20px', width:'100%'}}/>
          <DeckTypeSelect />
          <Button variant="contained" style={{ width: "100%", marginTop:'30px', height:'50px' }} >
            Generate deck
          </Button>
        </Grid>
      </Grid>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default GeneratorPage;
