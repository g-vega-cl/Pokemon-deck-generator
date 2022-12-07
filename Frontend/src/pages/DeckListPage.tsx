import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeckCard from "../components/DeckCard.tsx";
import DeckTypeSelect from "../components/DeckTypeSelect.tsx";
import ErrorPage from "../components/ErrorPage.tsx";
import LoadingPage from "../components/LoadingPage.tsx";
import { IDeckCard } from "../models/pokemon";


interface IDeckListPage {
  setNavbarTabValue: React.Dispatch<number>;
  navbarTabValue: number;
}

const DeckListPage = ({ navbarTabValue, setNavbarTabValue }: IDeckListPage) => {
    const [deckType, setDeckType] = useState("Any");

    useEffect(() => {
        if(navbarTabValue === 2){
            setNavbarTabValue(1);
            alert("Select a deck to inspect"); //Alert is bad practice. Replace with a modal // TODO
        }
        if(navbarTabValue === 1){
            setNavbarTabValue(1);
        }
    },[navbarTabValue])
    
    const {
        isLoading: isLoadingDeckList,
        data: deckList,
        isError: isGetDeckListError,
    } = useQuery({
        queryKey: [`deck list`],
        queryFn: () => {
        return axios
            .get(`http://localhost:8000/decklist`)
            .then((res) => res.data);
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    });

    if(isGetDeckListError){
        return(
            <ErrorPage />
        )
    }

    return (
        <>
        <div style={{width:"80%", marginLeft:'5px', marginTop:'20px', marginBottom:'20px' }}>
            <DeckTypeSelect deckType={deckType} setDeckType={setDeckType} allowAny={true}/>
        </div>
        <Grid container spacing={3}>
        {deckList &&
            deckList.length > 0 &&
            deckList.map((deckCard: IDeckCard, index) => {
                if(deckType === deckCard.Type || deckType === "Any"){
                    return (
                        <Grid xs={3} item={true} key={`${index}-${deckCard.Id}`}>
                            <DeckCard deckCard={deckCard} setNavbarTabValue={setNavbarTabValue}/>
                        </Grid>
                    );
                }
            })}
        </Grid>
        {isLoadingDeckList && (
            <LoadingPage />
        )}
        </>
    );
};

export default DeckListPage;
