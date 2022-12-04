import React, {useState, useEffect, useMemo} from "react";
import BookList from "./components/BookList";
import StyledNavbar from "./components/Navbar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingPage from "./components/LoadingPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import Grid from '@mui/material/Grid'; // Grid version 1


const Page = () => {
  const [username, setUsername] = useState("Test-user");
  const [queryUsername, setQueryUsername] = useState("Test-user"); // This is not good, but time.

  // This should be on it's own file, I'll leave it here if I don't have time.
  const { isLoading: isLoadingPokemon, data: pokemon, isError: pokemonError, refetch: refetchPokemin } = useQuery({queryKey:["poketypes"], queryFn:async () => {
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
    <div style={{ margin: "auto", width: "93%"}}>
      <StyledNavbar />
      <Grid container spacing={2}>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
  <Grid xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
</Grid>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default Page;
