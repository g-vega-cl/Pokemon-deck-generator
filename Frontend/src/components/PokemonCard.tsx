import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const PokemonCard = ({pokemonCard}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%" // Make responsive
          width="100%"
          image={pokemonCard.images.small}
          alt={pokemonCard.name}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {pokemonCard.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokemonCard;