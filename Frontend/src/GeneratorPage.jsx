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
import pikachuRepeat from './images/pikachu-background-navbar.png';
import sideBackground from './images/pokemon-sides-wallpaper.jpeg';
import pikachuYellow from './images/pikachu-yellow-wallpaper.png';
import DeckTypeSelect from "./components/DeckTypeSelect.tsx";

const GeneratorPage = () => {
  const [username, setUsername] = useState("Test-user");
  const [queryUsername, setQueryUsername] = useState("Test-user"); // This is not good, but time.

  // This should be on it's own file, I'll leave it here if I don't have time.
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
        .then((res) => res.data);
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
          <DeckTypeSelect />
          <Button variant="contained" style={{ width: "100%", marginTop:'30px', height:'50px' }}>
            Generate deck
          </Button>
        </Grid>
      </Grid>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default GeneratorPage;
