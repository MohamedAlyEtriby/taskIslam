import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Card.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
import ButtonUsed from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../Redux/Reducers/Reducers.jsx";
import { baseurl } from "../BaseUrl.js";
import { toast } from "react-toastify";

export default function MediaCard({
  price,
  imag,
  description,
  item_id,
  name,
  setIndexC,
  indexC,
}) {
  const { cart_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sendor, setsendor] = React.useState(false);
  const [loadindex, setloadindex] = React.useState(0);
  const [mydata, setmydata] = React.useState({
    quantity: 0,
    product_id: "0",
    cart_id: cart_id,
  });
  console.log(cart_id);
  const [itemquan, setitemquan] = React.useState(0);
  const [wantDelete, setWantDelete] = React.useState(0);
  const sendPostRequest = async () => {
    console.log(mydata);

    try {
      const response = await axios.post(
        `https://sehahome.com/api/checkout/cart/add/${mydata.product_id}`,
        mydata
      );
      if (response?.data.data) {
        const foundItem = response?.data.data.items.find((item) => {
          // Check if the additional object exists and its product_id matches the itemId
          return item.additional && item.additional.product_id === item_id;
        });
        console.log(response);
        setitemquan(foundItem.quantity);
        setWantDelete(foundItem.id);

        setIndexC(item_id);
        if (cart_id === null) {
          dispatch(AddCart(response.data.data.id));
          setmydata((prevData) => ({
            ...prevData,
            cart_id: response.data.data.id,
          }));
        }
      }
      setloadindex(0);
    } catch (error) {
      setloadindex(0);
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-left",
      });
    }
  };
  React.useEffect(() => {
    // Trigger the post request when mydata changes
    if (mydata.product_id != 0) sendPostRequest();
  }, [sendor]);
  console.log(mydata.product_id);
  return (
    <Card
      sx={{
        maxWidth: 445,
        minHeight: "600px",
        textAlign: "left",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to={`/ProductDetails/${item_id}`}>
        <div
          onClick={() => {
            setloadindex(0);
          }}
        >
          <CardMedia
            sx={{ minHeight: 350 }}
            image={imag}
            title="green iguana"
            style={{ boxShadow: "5px 5px 5px black" }}
          />
        </div>
      </Link>
      <CardContent className="flex-bet">
        <Typography
          component="div"
          style={{ color: "#342876", fontWeight: "700" }}
        >
          <span>{(+price).toFixed(2)}</span> SAR
        </Typography>
        <Typography
          variant="h6"
          component="div"
          style={{ maxWidth: "14rem", textAlign: "right" }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="#565656">
          Lizards are a widespread group of squamate reptiles,
        </Typography>
      </CardContent>
      <CardActions>
        {indexC !== item_id ? (
          <ButtonUsed
            setIndexC={setIndexC}
            item_id={item_id}
            setmydata={setmydata}
            mydata={mydata}
            setsendor={setsendor}
            sendor={sendor}
            loadindex={loadindex}
            setloadindex={setloadindex}
          />
        ) : (
          <div
            className="flex-bet calc"
            style={{
              border: "1px solid  #342876",
              width: "100%",
              height: "3.5rem",
              borderRadius: "1.3rem",
            }}
          >
            <Button
              className="del"
              onClick={() => {
                axios
                  .get(
                    baseurl +
                      `/checkout/cart/remove-item/${wantDelete}?cart_id=${cart_id}`
                  )
                  .then((res) => {
                    setitemquan(0);
                  })
                  .catch(() => {});
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize={"30"} />
            </Button>
            <Button
              className="sub"
              onClick={(e) => {
                setmydata((prevData) => ({
                  ...prevData,
                  quantity: -1,
                  product_id: indexC,
                }));
                setsendor(!sendor);
              }}
            >
              <hr />
            </Button>
            <Button className="quan">{itemquan}</Button>
            <Button
              className="add1"
              onClick={(e) => {
                setmydata((prevData) => ({
                  ...prevData,
                  quantity: 1,
                  product_id: indexC,
                }));
                setsendor(!sendor);
              }}
            >
              <span>+</span>
            </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
