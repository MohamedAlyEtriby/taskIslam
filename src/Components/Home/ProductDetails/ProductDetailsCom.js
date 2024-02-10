import { Grid } from "@mui/material";
import React from "react";
import "./ProductDetails.css";
import Title from "../../../ReusedCompnents/Title";

import ProductDetailsUp from "./ProductDetailsUp";
const ProductDetailsCom = ({
  data,
  sendor,
  setsendor,
  loadindex,
  mydata,
  setmydata,
  setloadindex,
  id,
}) => {
  return (
    <>
      <div
        style={{
          border: "2px solid blue",
          padding: "2rem",
          borderRadius: "1.2rem",
        }}
      >
        <Title title="PRODUCT DETAILS" />
        <Grid container spacing={2} style={{ marginTop: "2rem" }}>
          <ProductDetailsUp
            data={data}
            setsendor={setsendor}
            sendor={sendor}
            loadindex={loadindex}
            setloadindex={setloadindex}
            mydata={mydata}
            setmydata={setmydata}
            id={id}
          />
        </Grid>
      </div>
    </>
  );
};

export default ProductDetailsCom;
