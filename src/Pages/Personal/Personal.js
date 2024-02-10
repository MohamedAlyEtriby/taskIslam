import React, { useState } from "react";
import UseFetch from "../../UseFetch";
import HeaderPhoto from "../../ReusedCompnents/HeaderPhoto";
import { Container, Grid } from "@mui/material";
import LoadingCard from "../../ReusedCompnents/Skeleton";
import MediaCard from "../../ReusedCompnents/Card";

const Personal = () => {
  const categories = UseFetch("/descendant-categories?parent_id=1");
  const [indexC, setIndexC] = useState(-3);

  return (
    <div>
      <HeaderPhoto imgscr="Homeimgg.png" />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {categories?.default_products
            ? categories.default_products.map((def) => (
                <Grid key={def.id} item xs={12} md={4} sm={6}>
                  <MediaCard
                    imag={def.base_image.large_image_url}
                    price={def.price}
                    item_id={def.id}
                    setIndexC={setIndexC}
                indexC={indexC}
                  />
                </Grid>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <Grid key={index} item xs={12} md={4} sm={6}>
                  <LoadingCard height={400} width={"100%"} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Personal;
