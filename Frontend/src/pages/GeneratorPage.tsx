import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import pikachuYellow from '../images/pikachu-yellow-wallpaper.png';
import DeckTypeSelect, { PokemonTypes } from "../components/DeckTypeSelect.tsx";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage.tsx";
import ErrorPage from "../components/ErrorPage.tsx";


const GeneratorPage = () => {
  const [deckName, setDeckName] = useState("");
  const [deckType, setDeckType] = useState(PokemonTypes.FIRE);
  const [isGeneratingDeck, setIsGeneratingDeck] = useState(false);
  const [generatingDeckError, setGeneratingDeckError] = useState(false);
  const navigate = useNavigate();

  const handleGenerateDeck = async () => {
    setIsGeneratingDeck(true);
    try {
      const response = await axios.get(`http://localhost:8000/generate?type=${deckType}&name=${deckName}`)
      const deck = response.data;
      navigate(`/decks/${deck.Id}`);
    } catch (error) {
      setIsGeneratingDeck(false);
      setGeneratingDeckError(true);
    }
  }

  return (
    <div style={{ margin: "auto", height:"100vh", backgroundImage:`url(${pikachuYellow})`, backgroundSize:'cover', backgroundColor:"#efd64b"}}>
      <Grid container spacing={2} style={{backgroundColor:"#efd64b", margin:'auto', width:'50%'}}>
        <Grid xs={24} item={true}>
          <TextField id="deck-name-outlined-basic" label="Type the name of your deck" variant="outlined" value={deckName} onChange={(e) => setDeckName(e.target.value)} style={{marginBottom:'20px', width:'100%'}}/>
          <DeckTypeSelect deckType={deckType} setDeckType={setDeckType}/>
          <Button variant="contained" style={{ width: "100%", marginTop:'30px', height:'50px' }} onClick={handleGenerateDeck}>
            Generate deck
          </Button>
          {isGeneratingDeck && <LoadingPage />} 
          {generatingDeckError && <ErrorPage />}
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneratorPage;
