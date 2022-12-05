import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeckCard = ({ deckCard, setNavbarTabValue }) => { // TODO // Add deck card interface
    const navigate = useNavigate();
    const handleClick = () => {
        setNavbarTabValue(2);
        navigate(`/decks/${deckCard.Id}`);
    }
  
    return (
        <Card sx={{ height: "100%" }}>
        <CardActionArea
            onClick={handleClick}
        >
            <CardMedia
            component="img"
            height="100%" // Make responsive
            width="100%"
            image={deckCard.Image}
            alt={deckCard.Name}
            />
            <CardContent sx={{ height: 150 }}>
            <Typography gutterBottom variant="subtitle1" component="div">
                {deckCard.Name || "Unnamed"}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
                {deckCard.Type}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
};

export default DeckCard;
