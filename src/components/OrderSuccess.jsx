import React, { Component, useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink } from "react-router-dom";
import {
  Container,
  TextField,
  withStyles,
  Alert,
  LinearProgress,
} from "@material-ui/core/";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import { Button } from "reactstrap";

const OrderSuccess = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    let link = window.location.href.split("orderSuccess");
    setUrl(link[0]);
  }, []);
  const handleShare = async () => {
    console.log("clciked");
    try {
      const canvas = document.createElement("canvas");
      const dataUrl = canvas.toDataURL();
      const blob = await (await fetch(dataUrl)).blob();
      const shareData = {
        text:
          "Hello there! I have delicious Pizza  from Pizzeria! Try now from here  -" +
          url,
      };
      navigator.share(shareData).then(() => {
        console.log("Shared successfully");
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <div style={webStyle.itemsContainer}>
        <div className="m-2 text-center">
          <CheckCircleOutlinedIcon
            style={{
              marginTop: "14px",
              color: "blue",
              height: "100px",
              width: "100px",
            }}
          />
          <h3>Good Food is Always Cooking</h3>
          <p style={{ color: "grey" }}>
            Your order is confirmed, will be develivered shortly.
          </p>

          <Button
            className="m-2"
            color="primary"
            outline
            onClick={() => handleShare()}
          >
            SHARE
          </Button>
        </div>

        <div style={{ margin: "10px auto" }}>
          <LinearProgress />
        </div>
      </div>
    </Container>
  );
};
const webStyle = {
  itemsContainer: {
    padding: "20px",
    borderRadius: "9px",
    background: "white",
    marginBottom: "30px",
    marginTop: "15px",
    boxShadow: "1px 1px 15px 0px grey",
  },
};
export default OrderSuccess;
