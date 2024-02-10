import React from "react";
import "./CardProductCheck.css";
import { Button } from "@mui/material";

const CardProductCheck = ({ price }) => {
  return (
    <div className="cardcheck">
      <div className="detailsinfo">
        <p style={{ color: "#342876", fontWeight: "600" }}>Title</p>
        <div className="flex-bet infor">
          <div>Sub-Total</div>
          <div>{price}</div>
        </div>
        <div className="flex-bet infor">
          <div>VAT</div>
          <div>2.0 SAR</div>
        </div>
        <div className="flex-bet infor">
          <div>Total</div>
          <div style={{ color: "#342876" }}>2.0 SAR</div>
        </div>
      </div>
      <div>
        <div>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            className="checkout"
          >
            Checkout
          </Button>
        </div>
        <div>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            className="shopping"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardProductCheck;
