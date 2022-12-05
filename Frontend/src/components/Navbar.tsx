import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" style={{backgroundColor: "whitesmoke", paddingTop:'10px'}}>
      <LinkTab label="Generate deck" href="/" />
      <LinkTab label="Deck List" href="/deck/list" />
    </Tabs>
  );
}

export default Navbar;
