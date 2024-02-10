import { Button, Grid } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Title from "../../../ReusedCompnents/Title";
import { FaStar } from "react-icons/fa";
import ButtonUsed from "../../../ReusedCompnents/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../../../Redux/Reducers/Reducers";
import { baseurl } from "../../../BaseUrl";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../ReusedCompnents/Loading";

const ProductDetailsUp = ({
  data,
  sendor,
  setsendor,
  setmydata,
  loadindex,
  mydata,
  setloadindex,
  id,
}) => {
  const [itemquan, setitemquan] = React.useState(0);
  const dispatch = useDispatch();
  const { cart_id } = useSelector((state) => state.auth);
  const [wantDelete, setWantDelete] = React.useState(0);

  const sendPostRequest = async () => {
    try {
      const response = await axios.post(
        `https://sehahome.com/api/checkout/cart/add/${mydata.product_id}`,
        mydata
      );
      const foundItem = response?.data.data.items.find((item) => {
        // Check if the additional object exists and its product_id matches the itemId
        return item.additional && item.additional.product_id === id;
      });
      setitemquan(foundItem.quantity);
      setWantDelete(foundItem.id);

      setloadindex(2);
      if (cart_id === null) {
        dispatch(AddCart(response.data.data.id));
        setmydata((prevData) => ({
          ...prevData,
          cart_id: response.data.data.id,
        }));
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      setloadindex(0);
      toast.error("Something went wrong!", {
        position: "top-left",
      });
    }
  };
  React.useEffect(() => {
    // Trigger the post request when mydata changes
    if (mydata.product_id != 0) sendPostRequest();
  }, [sendor]);
  return (
    <>
      {data !== null ? (
        <>
          <Grid item xs={6} md={2} sm={2} className="flex-col">
            <div>
              <LazyLoadImage
                alt=""
                height={100}
                src={data?.data.base_image.small_image_url}
                width={100}
                className="Image-Details"
              />
            </div>
            <div>
              <LazyLoadImage
                alt=""
                height={100}
                src={data?.data.base_image.small_image_url}
                width={100}
                className="Image-Details"
              />
            </div>
            <div>
              <LazyLoadImage
                alt=""
                height={100}
                src={data?.data.base_image.small_image_url}
                width={100}
                className="Image-Details"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4} sm={4} className="flex-cen">
            <LazyLoadImage
              alt=""
              height={"400px"}
              src={data?.data.base_image.large_image_url}
              width={"100%"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4.5}
            sm={6}
            className="flex-col-start"
            style={{ fontSize: "1.6rem", fontWeight: "500" }}
          >
            <div>
              <Title title={data?.data.name} />
            </div>
            <div>
              <p style={{ color: "#565656", fontSize: "1.1rem" }}></p>
            </div>
            <div className="flex-bet">
              <span>
                Price:{" "}
                <span style={{ color: "#342876", fontWeight: "700" }}>
                  {" "}
                  {data?.data.price} SAR
                </span>
              </span>
              <span>
                4.8 <FaStar color="#F4B718" />
              </span>
            </div>
            <div className="flex-bet">
              <div>
                {loadindex !== 2 ? (
                  <ButtonUsed
                    setsendor={setsendor}
                    sendor={sendor}
                    loadindex={loadindex}
                    mydata={mydata}
                    setmydata={setmydata}
                    setloadindex={setloadindex}
                    item_id={id}
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
                          product_id: id,
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
                          product_id: id,
                        }));
                        setsendor(!sendor);
                      }}
                    >
                      <span>+</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-cen">
              <Button
                style={{
                  width: "100%",
                  background: "#342876",
                  color: "white",
                  fontSize: "1.6rem",
                  padding: "5px",
                }}
              >
                {" "}
                <Link
                  to="/Cart"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Buy now
                </Link>
              </Button>
              <span>
                <IoAddCircleSharp size={38} />
              </span>
            </div>
          </Grid>
        </>
      ) : (
        <div style={{ width: "100%" }} className="flex-cen">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ProductDetailsUp;
