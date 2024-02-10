import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../../UseFetch";
import ProductDetailsCom from "../../Components/Home/ProductDetails/ProductDetailsCom";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const data = UseFetch(`/products/${id}`);
  const [sendor, setsendor] = React.useState(false);
  const [loadindex, setloadindex] = React.useState(0);
  const { cart_id } = useSelector((state) => state.auth);

  const [mydata, setmydata] = React.useState({
    quantity: 0,
    product_id: "0",
    cart_id: cart_id,
  });
  return (
    <Container maxWidth="" style={{ padding: "3rem" }}>
      <ProductDetailsCom
        data={data}
        setsendor={setsendor}
        sendor={sendor}
        loadindex={loadindex}
        setloadindex={setloadindex}
        mydata={mydata}
        setmydata={setmydata}
        id={id}
      />
    </Container>
  );
};

export default ProductDetailsPage;
