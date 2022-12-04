import React, { useState, useEffect, useMemo } from "react";
import BookList from "./components/BookList";
import StyledNavbar from "./components/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingPage from "./components/LoadingPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";

const Page = () => {
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
    <div style={{ margin: "auto", width: "93%" }}>
      <StyledNavbar />
      <Grid container spacing={2}>
        <Grid xs={24} item={true}>
          <Button variant="contained" style={{ width: "100%" }}>
            Contained
          </Button>
        </Grid>
      </Grid>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default Page;
