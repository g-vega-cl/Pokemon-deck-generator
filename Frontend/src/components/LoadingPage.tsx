import Typography from "@mui/material/Typography";
import React from "react";
import pikachuWorking from "../images/pikachu-mailman-work.gif";

const LoadingPage = () => {
    return(
  <div style={{ margin: "20px" }}>
    <Typography gutterBottom variant="body1" component="div">
      Pikachu is trying his best to fetch your cards. Please wait.
    </Typography>
    <img src={pikachuWorking} width={300} />
  </div>);
};

export default LoadingPage;