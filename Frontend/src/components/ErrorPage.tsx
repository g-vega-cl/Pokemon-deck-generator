import Typography from "@mui/material/Typography";
import React from "react";
import pikachuBall from "../images/pikachu-pokeball-loop.gif";

const ErrorPage = () => {
  return (
    <div style={{ margin: "20px", width: "70vw", height: "500px" }}>
      <Typography gutterBottom variant="body1" component="div">
        There has been an error fetching your data. Please try again later.
      </Typography>
      <img src={pikachuBall} />
    </div>
  );
};

export default ErrorPage;
