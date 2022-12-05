import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import OpacityIcon from '@mui/icons-material/Opacity';
import SpaIcon from '@mui/icons-material/Spa';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BoltIcon from '@mui/icons-material/Bolt';

import { Grid } from "@mui/material";

export enum PokemonTypes {
  GRASS = "Grass",
  FIRE = "Fire",
  WATER = "Water",
  LIGHTNING = "Lightning",
  PSYCHIC = "Psychic",
  FIGHTING = "Fighting",
}

interface ITypeMenuItem {
  type: string;
  children: React.ReactNode;
}

const TypeMenuGrid = ({type, children}: ITypeMenuItem) => {
  return (
      <Grid container>
        <Grid xs={1.5} item={true}>
          {type}
        </Grid>
        <Grid xs={10.5} item={true}>
          {children}
        </Grid>
      </Grid>
  );
};

const DeckTypeSelect = () => {
  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="deck-type-simple-select-label">
          Select deck type
        </InputLabel>
        <Select
          labelId="deck-type-simple-select-label"
          id="deck-type-simple-select"
          value={type}
          label="Select deck type"
          onChange={handleChange}
        >
          <MenuItem value={PokemonTypes.FIRE}>
            <TypeMenuGrid type={PokemonTypes.FIRE}> <LocalFireDepartmentIcon sx={{ height: 25, color: 'red' }} /> </TypeMenuGrid>
          </MenuItem>
          
          <MenuItem value={PokemonTypes.FIGHTING}>
            <TypeMenuGrid type={PokemonTypes.FIGHTING}> <SportsMmaIcon sx={{ height: 25, color: 'brown' }} /> </TypeMenuGrid>
          </MenuItem>

          <MenuItem value={PokemonTypes.GRASS}>
            <TypeMenuGrid type={PokemonTypes.GRASS}> <SpaIcon sx={{ height: 25, color: 'green' }} /> </TypeMenuGrid>
          </MenuItem>

          <MenuItem value={PokemonTypes.PSYCHIC}>
            <TypeMenuGrid type={PokemonTypes.PSYCHIC}> <VisibilityIcon sx={{ height: 25, color: 'purple' }} /> </TypeMenuGrid>
          </MenuItem>

          <MenuItem value={PokemonTypes.WATER}>
            <TypeMenuGrid type={PokemonTypes.WATER}> <OpacityIcon sx={{ height: 25, color: 'blue' }} /> </TypeMenuGrid>
          </MenuItem>

          <MenuItem value={PokemonTypes.LIGHTNING}>
            <TypeMenuGrid type={PokemonTypes.LIGHTNING}> <BoltIcon sx={{ height: 25, color:'#efd64b' }} /> </TypeMenuGrid>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DeckTypeSelect;
