import { Button, Container, Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import "./Cart.css";
import Title from "../../ReusedCompnents/Title";
import CardProductCheck from "../../Components/CartProductCheck.js/CardProductCheck";
import UseFetch from "../../UseFetch";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../BaseUrl";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart_id } = useSelector((state) => state.auth);
  const [mydata, setmydata] = React.useState({
    quantity: 0,
    product_id: "0",
    cart_id: cart_id,
  });
  const [sendor, setsendor] = React.useState(false);

  const [data3, setData] = useState(null);
  const sendPostRequest = async () => {
    try {
      const response = await axios.post(
        `https://sehahome.com/api/checkout/cart/add/${mydata.product_id}`,
        mydata
      );
      setData(response.data);
      getRequest();
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  const getRequest = async () => {
    try {
      const response = await axios.get(
        baseurl + `/checkout/cart?cart_id=${cart_id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  React.useEffect(() => {
    // Trigger the post request when mydata changes
    if (mydata.product_id != 0) sendPostRequest();
  }, [sendor]);
  useEffect(() => {
    getRequest();
  }, []);
  const columns = [
    {
      name: "Product Name",
      selector: (row) => (
        <div className="product-info flex-cen">
          <div
            className="dele-icon"
            onClick={() => {
              axios
                .get(
                  baseurl +
                    `/checkout/cart/remove-item/${row.id}?cart_id=${cart_id}`
                )
                .then((res) => {
                  setData(res.data);
                  toast.success("Item Removed ", {
                    position: "top-left",
                  });
                })
                .catch(() => {
                  toast.error("something went wrong ", {
                    position: "top-left",
                  });
                });
            }}
          >
            <CloseIcon />
          </div>
          <img
            src={row?.product?.base_image.medium_image_url}
            alt={row.name}
            className="product-image"
            style={{ maxHeight: "6rem" }}
          />
          <span
            style={{
              maxWidth: "9rem",
              textOverflow: "ellipsis",
              wordWrap: "break-word",
            }}
          >
            {row.name}
          </span>
        </div>
      ),
      width: "400px",
    },
    {
      name: "Quantity",
      selector: (row) => (
        <div
          className="flex-bet calc"
          style={{
            width: "100%",
            height: "2.5rem",
          }}
        >
          <Button
            className="subCart"
            onClick={() => {
              setmydata((prevData) => ({
                ...prevData,
                quantity: -1,
                product_id: row.additional.product_id,
              }));
              setsendor(!sendor);
            }}
          >
            <hr />
          </Button>
          <Button className="quanCart">{row.quantity}</Button>
          <Button
            className="addCart"
            onClick={(e) => {
              setmydata((prevData) => ({
                ...prevData,
                quantity: 1,
                product_id: row.additional.product_id,
              }));
              setsendor(!sendor);
            }}
          >
            <span>+</span>
          </Button>
        </div>
      ),
      width: "300px",
    },
    {
      name: "Product Price",
      selector: (row) => <div style={{ color: "#342876" }}>{row.price}</div>,
    },

    {
      name: "Total",
      selector: (row) => <div style={{ color: "#342876" }}>{row.total}</div>,
    },
  ];

  const data = [
    {
      id: 1,
      image: "/assets/bottle.png",
      title: "NUNU STERILIZER 100ML",
      quant: "",
      price: "10.SAR",
      tot: "10.SAR",
    },
  ];
  return (
    <Container maxWidth="lg">
      <Title title="SHOPPING CART" />
      <DataTable
        columns={columns}
        data={data3 !== null ? data3?.data?.items : []}
        className="mytable"
        style={{ marginBottom: "4rem" }}
      />
      <Grid container spacing={2}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          {data3?.data !== null ? (
            <CardProductCheck price={data3?.data.sub_total} />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
