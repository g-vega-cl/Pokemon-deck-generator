import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeckCard from "../components/DeckCard.tsx";
import DeckTypeSelect from "../components/DeckTypeSelect.tsx";
import PokemonCard from "../components/PokemonCard.tsx";


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
    
    // TODO // FILTER BY TYPE
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

    return (
        <>
        <div style={{width:"80%", marginLeft:'5px', marginTop:'20px', marginBottom:'20px' }}>
            <DeckTypeSelect deckType={deckType} setDeckType={setDeckType} allowAny={true}/>
        </div>
        <Grid container spacing={3}>
        {deckList &&
            deckList.length > 0 &&
            deckList.map((card, index) => {
                if(deckType === card.Type || deckType === "Any"){
                    return (
                        <Grid xs={3} item={true} key={`${index}-${card.Id}`}>
                            <DeckCard deckCard={card} setNavbarTabValue={setNavbarTabValue}/>
                        </Grid>
                    );
                }
            })}
        </Grid>
        </>
    );
};

export default DeckListPage;
