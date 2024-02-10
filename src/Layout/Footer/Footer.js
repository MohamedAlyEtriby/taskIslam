import React from "react";
import "./Footer.css";
import { Grid } from "@mui/material";
const Footer = () => {
  return (
    <Grid container spacing={2} className="footer flex-cen">
      <Grid item xs={12} sm={6} className="row-cont  " md={4}>
        <div>
          {" "}
          <img src="/assets/sehaimg.png" alt="" />
          <h3
            style={{
              textTransform: "uppercase",
              width: "22.4rem",
              fontSize: "1.7rem",
              color: "#342876",
            }}
          >
            Health House is the perfect place, For more quality products.
          </h3>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3} className="row-cont">
        <ul>
          <li>PRIVACY AND POLICY</li>
          <li>Payment policy</li>
          <li>Shipping policy</li>
          <li>Exchange and return policy</li>
        </ul>
      </Grid>
      <Grid item xs={12} md={2} sm={6} className="row-cont ">
        <ul>
          <li>profile</li>
          <li>Favorite</li>
        </ul>
      </Grid>
      <Grid item xs={12} md={3} sm={6} className="row-cont ">
        <ul>
          {" "}
          <li>who are we</li>
          <li>Terms and Conditions</li>
        </ul>
      </Grid>
      <div style={{ width: "100%" }}>
        <hr style={{ width: "100%" }} />
      </div>
    </Grid>
  );
};

export default Footer;
