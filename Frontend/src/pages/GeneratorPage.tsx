import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import pikachuYellow from '../images/pikachu-yellow-wallpaper.png';
import DeckTypeSelect, { PokemonTypes } from "../components/DeckTypeSelect.tsx";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

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
      console.log("Getting response", response);
      const deck = response.data;
      console.log("GENERATED DECK", deck);
      navigate(`/decks/${deck.Id}`)
    } catch (error) {
      console.log("ERROR GENERATING DECK", error);
      console.error("ERROR GEN DECK ", error);
      setIsGeneratingDeck(false);
      setGeneratingDeckError(true); // TODO // Add modal where this is turned to false.
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
          {/* TODO, make error and loading components pretty */}
          {isGeneratingDeck && <div> We are generating your deck...</div>} 
          {generatingDeckError && <div> There has been an error while generating your deck</div>}
        </Grid>
      </Grid>
    </div>
  );
};

export default GeneratorPage;
