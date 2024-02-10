import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const ButtonUsed = ({
  setIndexC,
  item_id,
  loadindex,
  setmydata,
  setsendor,
  sendor,
  setloadindex,
}) => {

  return (
    <Button
      style={{
        width: "100%",
        background: "#342876",
        color: "white",
        fontSize: "1.6rem",
        padding: "5px",
      }}
      onClick={() => {
        setmydata((prevData) => ({
          ...prevData,
          quantity: 1,
          product_id: item_id,
        }));
        setsendor(!sendor);
        setloadindex(item_id);
      }}
    >
      {loadindex === item_id ? (
        <>
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="white"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </>
      ) : (
        <>Add</>
      )}
    </Button>
  );
};

export default ButtonUsed;
