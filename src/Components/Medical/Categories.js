import React, { useEffect, useState } from "react";
import UseFetch from "../../UseFetch";
import "./Categories.css";
import { Container, Grid } from "@mui/material";
import MediaCard from "../../ReusedCompnents/Card";
import LoadingCard from "../../ReusedCompnents/Skeleton";
import axios from "axios";
import { baseurl } from "../../BaseUrl";
const Categories = () => {
  const categories = UseFetch("/descendant-categories?parent_id=1");
  const [catdata, setCatdata] = useState(null);
  const [active, setactive] = useState(0);
  const [indexC, setIndexC] = useState(0);
  useEffect(() => {
    if (active !== 0) {
      axios
        .get(baseurl + `/products?category_id=${active}`)
        .then((response) => setCatdata(response.data))
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [active]);
  return (
    <Container maxWidth="lg">
      <div
        className="flex-start"
        style={{
          margin: "auto",
          flexWrap: "wrap",
          minHeight: `${categories ? "50vh" : "20vh"}`,
        }}
      >
        {categories
          ? categories.categories.map((item, index) => (
              <div
                key={item.id}
                style={{
                  width: "25%",
                  textAlign: "center",
                }}
                className="category flex-cen"
                onClick={() => {
                  setactive(item.id);
                }}
              >
                <div>
                  {" "}
                  <div
                    className={`${
                      active === (active === 0 ? index : item.id)
                        ? "active"
                        : "notactive"
                    }`}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{ width: "25%", textAlign: "center" }}>
                <LoadingCard height={50} width={"150px"} />
              </div>
            ))}
      </div>
      {active === 0 ? (
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {categories?.default_products
            ? categories.default_products.map((def) => (
                <Grid key={def.id} item xs={12} md={4} sm={6}>
                  <MediaCard
                    imag={def.base_image.large_image_url}
                    price={def.price}
                    item_id={def.id}
                    indexC={indexC}
                    setIndexC={setIndexC}
                    name={def.name}
                  />
                </Grid>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <Grid key={index} item xs={12} md={4} sm={6}>
                  <LoadingCard height={400} width={"100%"} />
                </Grid>
              ))}
        </Grid>
      ) : (
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {catdata?.data &&
            catdata.data.map((def) => (
              <Grid key={def.id} item xs={12} md={4} sm={6}>
                <MediaCard
                  imag={def.base_image.large_image_url}
                  price={def.price}
                  item_id={def.id}
                  setIndexC={setIndexC}
                  indexC={indexC}
                  name={def.name}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default Categories;
