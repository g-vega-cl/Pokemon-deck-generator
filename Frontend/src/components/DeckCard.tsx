import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IDeckCard } from "../models/pokemon";

export interface IComponentDeckCard {
    deckCard: IDeckCard;
    setNavbarTabValue: React.Dispatch<number>;
}

export interface IComponentDeckCardCard {
    deckCard: IDeckCard;
    handleClick: () => void;
}

export const DeckCardCard = ({deckCard, handleClick}: IComponentDeckCardCard) => {
    return (
        <Card sx={{ height: "100%" }} data-testid="DeckCard-CardTag">
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
}

const DeckCard = ({ deckCard, setNavbarTabValue }: IComponentDeckCard) => {
    const navigate = useNavigate();
    const handleClick = () => {
        setNavbarTabValue(2);
        navigate(`/decks/${deckCard.Id}`);
    }
  
    return (
        <DeckCardCard deckCard={deckCard} handleClick={handleClick}/>
    );
};

export default DeckCard;
