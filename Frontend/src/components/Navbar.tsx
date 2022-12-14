import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavigateFunction, useNavigate } from "react-router-dom";

interface LinkTabProps {
  label?: string;
  href: string;
}

const LinkTab = (props: LinkTabProps) => { // TODO // standarize the way the children props are used.
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate(props.href || '');
      }}
      {...props}
    />
  );
}

interface INavbar {
  navbarTabValue: number;
  setNavbarTabValue: React.Dispatch<number>;
}

const Navbar = ({navbarTabValue, setNavbarTabValue} :INavbar) => {
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setNavbarTabValue(newValue);
  };
  return (
    <Tabs value={navbarTabValue} onChange={handleChange} aria-label="nav tabs example" style={{backgroundColor: "whitesmoke", paddingTop:'10px'}}>
      <LinkTab label="Generate deck" href="/" />
      <LinkTab label="Deck List" href="/decks/list"/>
      <LinkTab label="Deck details" href="/decks/list" />
    </Tabs>
  );
}

export default Navbar;
